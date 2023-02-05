import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path: '', component: CartComponent },
  { path: 'payment', component: PaymentComponent}
];

@NgModule({
  declarations: [
    CartComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CartModule { }
