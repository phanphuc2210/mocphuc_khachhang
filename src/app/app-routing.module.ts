import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { DetailComponent } from './components/detail/detail.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { SearchComponent } from './components/search/search.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'product/:id', component: DetailComponent},
  {path: 'product', component: ProductsComponent},
  {path: 'search', component: SearchComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'user-detail', component: UserDetailComponent, canActivate: [AuthGuard]},
  {
    path: 'cart', 
    loadChildren: () => 
      import('./components/cart/cart.module').then(m => m.CartModule),
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  { 
    path: 'invoice',
    loadChildren: () => 
      import('./components/invoice/invoice.module').then(m => m.InvoiceModule),
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
