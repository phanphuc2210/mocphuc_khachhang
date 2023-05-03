import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ContactComponent } from './components/contact/contact.component';
import { DetailComponent } from './components/detail/detail.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SearchComponent } from './components/search/search.component';
import { SignupComponent } from './components/signup/signup.component';
import { SuccessComponent } from './components/success/success.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserVoucherComponent } from './components/user-voucher/user-voucher.component';
import { VouchersComponent } from './components/vouchers/vouchers.component';
import { AuthGuard } from './guards/auth.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'product/:slug', component: DetailComponent},
  {path: 'list-product/:slug', component: ProductsComponent},
  // {path: 'product', component: ProductsComponent},
  {path: 'voucher', component: VouchersComponent},
  {path: 'my-voucher', component: UserVoucherComponent, canActivate: [AuthGuard]},
  {path: 'search', component: SearchComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'success', component: SuccessComponent},
  {path: 'user-detail', component: UserDetailComponent, canActivate: [AuthGuard]},
  {path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]},
  {
    path: 'cart', 
    loadChildren: () => 
      import('./components/cart/cart.module').then(m => m.CartModule),
    // canLoad: [AuthGuard],
    // canActivateChild: [AuthGuard]
  },
  { 
    path: 'invoice',
    loadChildren: () => 
      import('./components/invoice/invoice.module').then(m => m.InvoiceModule),
    // canLoad: [AuthGuard],
    // canActivateChild: [AuthGuard]
  },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
