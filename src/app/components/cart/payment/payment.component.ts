import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  cart$: Observable<ProductInCart[]>;
  count$: Observable<number>;
  totalPrice$: Observable<number>;
  user!: User;
  paymentForm!: FormGroup;
  order_details!: Order_Detail[]

  constructor(
    private store: Store,
    private authService: AuthService,
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {
    this.cart$ = store.pipe(select(CartSelectors.GroupedCartSelector));
    this.count$ = store.pipe(select(CartSelectors.countProductSelector));
    this.totalPrice$ = store.pipe(select(CartSelectors.totalPriceSelector));
  }

  ngOnInit(): void {
    this.authService
      .getUser(this.authService.userSubject.value.id)
      .subscribe((res) => {
        this.user = res.result[0];
        this.paymentForm = this.fb.group({
          name: [
            this.user.lastname + ' ' + this.user.firstname,
            Validators.required,
          ],
          phone: [this.user.phone, Validators.compose([
            Validators.required, Validators.pattern(/^[0-9]{10}$/i)
          ])],
          address: [this.user.address, Validators.required],
          email: [this.user.email],
          payment_method: ['cod', Validators.required],
        });
      });

      this.cart$
      .pipe(
        map((res) => {
          let orderDetails: Order_Detail[] = [];
          res.forEach((o) => {
            orderDetails.push({ 
              productId: o.product.id!, 
              name: o.product.name,
              image: o.product.image,
              price: o.product.price,
              quantity: o.count 
            });
          });
          return orderDetails;
        })
      )
      .subscribe((res) => {
        this.order_details = res
      });
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
        name: this.paymentForm.controls['name'].value,
        address: this.paymentForm.controls['address'].value,
        phone: this.paymentForm.controls['phone'].value,
        email: this.paymentForm.controls['email'].value,
        payment_method: this.paymentForm.controls['payment_method'].value,
      },
      order_details: this.order_details,
    };

    this.cartService.payment(data).subscribe(
      (res) => {
        console.log('Payment:', res);
        if(res.result) {
          const orderId = res.result.orderId
          this.store.dispatch(CartActions.clearCart())
          // send mail
          this.cartService.sendMail({ ...data ,order: {...data.order, id: orderId} }).subscribe(res => {
            console.log('Mail:', res)
          })
          Swal.fire({
            background: '#000',
            icon: 'success',
            title: '<p class="text-xl text-slate-300">Thanh toán thành công!</p>',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#246224',
          })
          this.router.navigate(['/invoice/' + orderId])
        }
      },
      (error) => {
        Swal.fire({
          background: '#000',
          icon: 'error',
          title: '<p class="text-xl text-slate-300">Thanh toán thất bại!</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#c81e1e',
        })
      }
    );
  }
}
