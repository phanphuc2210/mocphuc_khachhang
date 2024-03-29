import { NgModule, isDevMode } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SliderComponent } from './commons/slider/slider.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProductsComponent } from './components/products/products.component';
import { SearchComponent } from './components/search/search.component';
import { DetailComponent } from './components/detail/detail.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { Interceptor } from './interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducerLocalStorage, reducer as cartReducer } from 'src/app/store/cartStore/cart.reducer'

import {registerLocaleData} from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import { CartEffects } from './store/cartStore/cart.effects';
import { ProductCardComponent } from './commons/product-card/product-card.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CommonsModule } from './commons/commons.module';
registerLocaleData(localeVi, 'vi');

import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { VouchersComponent } from './components/vouchers/vouchers.component';
import { UserVoucherComponent } from './components/user-voucher/user-voucher.component';
import { SuccessComponent } from './components/success/success.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ToggleSubmenuDirective } from './directives/toggle-submenu.directive';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ReturnPolicyComponent } from './components/return-policy/return-policy.component';
import { WarrantyPolicyComponent } from './components/warranty-policy/warranty-policy.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { ClickSidebarDirective } from './directives/click-sidebar.directive';
import { ClickSidebarCoverDirective } from './directives/click-sidebar-cover.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SliderComponent,
    AboutComponent,
    ContactComponent,
    ProductsComponent,
    SearchComponent,
    DetailComponent,
    LoginComponent,
    SignupComponent,
    UserDetailComponent,
    ProductCardComponent,
    ChangePasswordComponent,
    VouchersComponent,
    UserVoucherComponent,
    SuccessComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ToggleSubmenuDirective,
    NotfoundComponent,
    ReturnPolicyComponent,
    WarrantyPolicyComponent,
    SidebarComponent,
    ClickSidebarDirective,
    ClickSidebarCoverDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    CommonsModule,
    SweetAlert2Module.forRoot(),
    StoreModule.forRoot(
      {cart: cartReducer},
      {metaReducers: [ metaReducerLocalStorage ]}
    ),
    EffectsModule.forRoot([CartEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode(), autoPause: true, }),
    GalleryModule.withConfig({
      // thumbView: 'contain',
    }),
    LightboxModule,
    NgxStarRatingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
