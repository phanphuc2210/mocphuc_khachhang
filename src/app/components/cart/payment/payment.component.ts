import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
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

  voucherList!: Voucher[]
  userId: number
  discount: number = 0
  invalidVoucher: boolean = false

  cart$: Observable<ProductInCart[]>;
  count$: Observable<number>;
  totalPrice$: Observable<number>;
  user!: User;
  paymentForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.compose([
      Validators.required, Validators.pattern(/^[0-9]{10}$/i)
    ])],
    address: ['', Validators.required],
    email: ['', Validators.compose([
      Validators.required, Validators.email
    ])],
    payment_method: ['', Validators.required],
    code: ['']
  });
  order_details!: Order_Detail[]

  // Flowbite config
  titileModal = 'Thêm mới'
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
    private router: Router
  ) {
    this.userId = this.authService.userSubject.getValue().id
    this.cart$ = store.pipe(select(CartSelectors.GroupedCartSelector));
    this.count$ = store.pipe(select(CartSelectors.countProductSelector));
    this.totalPrice$ = store.pipe(select(CartSelectors.totalPriceSelector));
  }

  ngOnInit(): void {
    this.authService
      .getUser(this.authService.userSubject.value.id)
      .subscribe((res) => {
        this.user = res;
        this.paymentForm.controls['name'].setValue(this.user.lastname + ' ' + this.user.firstname)
        this.paymentForm.controls['phone'].setValue(this.user.phone)
        this.paymentForm.controls['address'].setValue(this.user.address)
        this.paymentForm.controls['email'].setValue(this.user.email)
        this.paymentForm.controls['payment_method'].setValue('cod')
      });

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
      this.order_details = res
    });

    this.voucherService.getVoucherByUserId(this.userId).subscribe(res => {
      this.voucherList = res
    })

    // Thiết lập hộp thoại cập nhật trạng thái
    this.modal = new Modal(this.modalEl.nativeElement, this.modalOptions);
  }

  public checkCheckBoxvalue(event: any) {
    console.log(event.target.value);
    this.paymentForm.controls['payment_method'].setValue(event.target.value);
    console.log(this.paymentForm.value);
  }

  public payment() {
    const data: Payment = {
      order: {
        userId: this.user.id!,
        name: this.paymentForm.controls['name'].value!,
        address: this.paymentForm.controls['address'].value!,
        phone: this.paymentForm.controls['phone'].value!,
        email: this.paymentForm.controls['email'].value!,
        payment_method: this.paymentForm.controls['payment_method'].value!,
        discount: this.discount
      },
      order_details: this.order_details,
    };

    this.cartService.payment(data).subscribe(
      (res) => {
        console.log('Payment:', res);
        const orderId = res.orderId
        this.store.dispatch(CartActions.clearCart())
        // send mail
        this.cartService.sendMail({ ...data ,order: {...data.order, id: orderId} }).subscribe(
          res => {
            console.log('Mail:', res)
          },
          err => {
            console.log('Mail:', err.error.message)
          }
        )
        Swal.fire({
          background: '#000',
          icon: 'success',
          title: '<p class="text-xl text-slate-300">'+ res.message +'</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#246224',
        })
        this.router.navigate(['/invoice/' + orderId])
      },
      (err) => {
        console.log(err.error.message)
        Swal.fire({
          background: '#000',
          icon: 'error',
          title: '<p class="text-xl text-slate-300">'+ err.error.message +'</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#c81e1e',
        })
      }
    );
  }

  showModal() {
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }

  checkCondition(voucher: Voucher): boolean {
    let result: boolean;
    let totalPriceByProductType = this.order_details.reduce((total, product) => {
      if(voucher.applicable_productType === product.productType) {
        return total + product.price!;
      }
      return total;
    }, 0)
    result = totalPriceByProductType >= voucher.bill_from;

    return result;
  }

  apply(voucher: Voucher) {
    this.hideModal();
    this.paymentForm.controls['code'].setValue(voucher.code!);
    this.changeCode();
  }

  changeCode() {
    let voucherApply = 
      this.voucherList.find(voucher => voucher.code === this.paymentForm.controls['code'].value)
    if(this.checkCondition(voucherApply!)) {
      this.discount = voucherApply?.discount!
      this.invalidVoucher = false
    } else {
      this.discount = 0
      this.invalidVoucher = true
    }
  }
}
