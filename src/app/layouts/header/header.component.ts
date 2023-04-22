import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { ProductType } from 'src/app/models/productType.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import * as CartSelectors from 'src/app/store/cartStore/cart.selectors';
import * as CartActions from 'src/app/store/cartStore/cart.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  countProducts$: Observable<number>;
  productTypes!: ProductType[];

  isLogin = this.authService.loginSubject.asObservable();
  user!: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store,
    private productService: ProductService
  ) {
    this.countProducts$ = store.pipe(
      select(CartSelectors.countProductSelector)
    );
  }

  ngOnInit(): void {
    this.authService.userSubject.subscribe((res) => {
      if (res) {
        this.user = res;
      }
    });

    this.productService.getProductTypes().subscribe(res => {
      this.productTypes = res;
    })
  }

  public logOut() {
    this.store.dispatch(CartActions.getCart({userId: 0}));
    this.authService.logOut();
    this.router.navigate(['/']);
  }
}
