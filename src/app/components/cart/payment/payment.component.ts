import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { debounceTime, fromEvent, map, Observable } from 'rxjs';
import { ProductInCart } from 'src/app/models/cart.model';
import { Order_Detail, Payment } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import * as CartSelectors from 'src/app/store/cartStore/cart.selectors';
import * as CartActions from 'src/app/store/cartStore/cart.action';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import { Voucher } from 'src/app/models/voucher.model';
import { VoucherService } from 'src/app/services/voucher.service';
import { PaymentMethod } from 'src/app/models/paymentMethod.model';
import { PaymentMethodService } from 'src/app/services/payment-method.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @ViewChild('modalEl', {
    read: ElementRef,
    static: true,
  })
  modalEl!: ElementRef<HTMLDivElement>;

  paymentMethods!: PaymentMethod[];
  methodName = '';
  voucherList!: Voucher[];
  voucherAllList!: Voucher[];
  userId: number;
  discount: number = 0;
  amount: number = 0;
  invalidVoucher: boolean = false;
  isSoldOutVoucher: boolean = false;

  cart$: Observable<ProductInCart[]>;
  count$: Observable<number>;
  totalPrice$: Observable<number>;
  user!: User;
  paymentForm = this.fb.group({
    name: ['', Validators.required],
    phone: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/i),
      ]),
    ],
    address: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    payment_method: [1, Validators.required],
    code: [''],
  });
  order_details!: Order_Detail[];

  // Flowbite config
  titileModal = 'Thêm mới';
  modal!: ModalInterface;

  modalOptions: ModalOptions = {
    placement: 'center',
    backdrop: 'dynamic',
    backdropClasses:
      'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  };

  constructor(
    private store: Store,
    private authService: AuthService,
    private fb: FormBuilder,
    private cartService: CartService,
    private voucherService: VoucherService,
    private paymentMethodService: PaymentMethodService,
    private paymentService: PaymentService,
    private router: Router
  ) {
    this.userId = this.authService.loginSubject.getValue()? this.authService.userSubject.getValue().id : null;
    this.cart$ = store.pipe(select(CartSelectors.GroupedCartSelector));
    this.count$ = store.pipe(select(CartSelectors.countProductSelector));
    this.totalPrice$ = store.pipe(select(CartSelectors.totalPriceSelector));

    this.paymentForm.controls['code'].valueChanges
      .pipe(debounceTime(1000))
      .subscribe((res) => {
        this.changeCode();
      });
  }

  ngOnInit(): void {
    if(this.authService.loginSubject.getValue()) {
      this.authService
      .getUser(this.authService.userSubject.value.id)
      .subscribe((res) => {
        this.user = res;
        this.paymentForm.controls['name'].setValue(
          this.user.lastname + ' ' + this.user.firstname
        );
        this.paymentForm.controls['phone'].setValue(this.user.phone);
        this.paymentForm.controls['address'].setValue(this.user.address);
        this.paymentForm.controls['email'].setValue(this.user.email);
        this.paymentForm.controls['payment_method'].setValue(1);
      });

      this.voucherService.getVoucherByUserId(this.userId).subscribe((res) => {
        this.voucherList = res;
      });
      this.voucherService.getVoucher(this.userId).subscribe((res) => {
        this.voucherAllList = res;
      });
    }

    this.cart$
      .pipe(
        map((res) => {
          let orderDetails: Order_Detail[] = [];
          res.forEach((o) => {
            orderDetails.push({
              productId: o.product.id!,
              productType: o.product.typeId,
              name: o.product.name,
              image: o.product.image[0],
              price: o.product.price,
              quantity: o.count,
            });
          });
          return orderDetails;
        })
      )
      .subscribe((res) => {
        this.order_details = res;
      });

    this.paymentMethodService.getList().subscribe((res) => {
      this.paymentMethods = res;
      this.methodName = res[0].name;
    });

    this.totalPrice$.subscribe((res) => {
      this.amount = res;
    });

    // Thiết lập hộp thoại cập nhật trạng thái
    this.modal = new Modal(this.modalEl.nativeElement, this.modalOptions);
  }

  public checkCheckBoxvalue(method: PaymentMethod) {
    this.paymentForm.controls['payment_method'].setValue(method.id!);
    this.methodName = method.name;
  }

  public payment() {
    const data: Payment = {
      order: {
        userId: this.userId? this.userId : 0,
        name: this.paymentForm.controls['name'].value!,
        address: this.paymentForm.controls['address'].value!,
        phone: this.paymentForm.controls['phone'].value!,
        email: this.paymentForm.controls['email'].value!,
        payment_method: this.paymentForm.controls['payment_method'].value!,
        discount: this.discount,
        code: this.paymentForm.controls['code'].value!,
        amount: this.amount - this.discount,
      },
      order_details: this.order_details,
    };

    if (this.methodName === 'VNPAY') {
      this.cartService.payment(data).subscribe({
        next: (res) => {
          const dataVNPay: Payment = {
            ...data,
            order: {
              ...data.order,
              id: res.orderId
            }
          }
          this.store.dispatch(CartActions.clearCart());
          this.paymentService.vnpayPayment(dataVNPay).subscribe((res) => {
            window.location.assign(res.url);
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
      return;
    }

    this.cartService.payment(data).subscribe({
      next: (res) => {
        const orderId = res.orderId;
        this.store.dispatch(CartActions.clearCart());
        Swal.fire({
          background: '#000',
          icon: 'success',
          title: '<p class="text-xl text-slate-300">' + res.message + '</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#246224',
        });
        this.router.navigate(['/invoice/' + orderId]);
      },
      error: (err) => {
        console.log(err.error.message);
        Swal.fire({
          background: '#000',
          icon: 'error',
          title:
            '<p class="text-xl text-slate-300">' + err.error.message + '</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#c81e1e',
        });
      },
    });
  }

  showModal() {
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }

  checkCondition(voucher: Voucher): boolean {
    let result: boolean;

    const currentDate = new Date();
    const expirationDate = new Date(voucher.expiration_date);

    if (currentDate > expirationDate) {
      return false;
    }

    let totalPriceByProductType = this.order_details.reduce(
      (total, product) => {
        if (voucher.applicable_productType === product.productType) {
          return total + product.price! * product.quantity;
        } else {
          return total;
        }
      },
      0
    );
    result = totalPriceByProductType >= voucher.bill_from;

    return result;
  }

  apply(voucher: Voucher) {
    this.hideModal();
    this.paymentForm.controls['code'].setValue(voucher.code!);
    this.changeCode();
  }

  changeCode() {
    if (this.paymentForm.controls['code'].value === '') {
      this.paymentForm.controls['code'].setValue('');
      this.discount = 0;
      this.invalidVoucher = false;
    } else {
      let voucherApply = this.voucherAllList.find(
        (voucher) => voucher.code === this.paymentForm.controls['code'].value
      );
      if (voucherApply) {
        if (this.checkCondition(voucherApply)) {
          this.discount = voucherApply?.discount!;
          this.invalidVoucher = false;
        } else {
          this.discount = 0;
          this.invalidVoucher = true;
        }
      } else {
        this.discount = 0;
        this.invalidVoucher = true;
      }
    }
  }
}
