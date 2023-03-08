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
  });
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
}
