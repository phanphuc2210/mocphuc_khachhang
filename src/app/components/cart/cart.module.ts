import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { CustomFormInputComponent } from 'src/app/commons/custom-form-input/custom-form-input.component';
import { ValidateInputComponent } from 'src/app/commons/validate-input/validate-input.component';
import { CommonsModule } from 'src/app/commons/commons.module';


const routes: Routes = [
  { path: '', component: CartComponent },
  { path: 'payment', component: PaymentComponent}
];

@NgModule({
  declarations: [
    CartComponent,
    PaymentComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonsModule,
    RouterModule.forChild(routes)
  ]
})
export class CartModule { }
