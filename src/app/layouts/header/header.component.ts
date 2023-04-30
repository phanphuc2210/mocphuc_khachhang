import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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
  currentUrl!: string
  countProducts$: Observable<number>;
  parentTypes!: ProductType[];
  childrenTypes!: ProductType[];

  isLogin = this.authService.loginSubject.asObservable();
  user!: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store,
    private productService: ProductService,
    private sanitizer: DomSanitizer
  ) {
    this.countProducts$ = store.pipe(
      select(CartSelectors.countProductSelector)
    );

    this.productService.getProductTypes().subscribe(res => {
      this.parentTypes = res.filter(type => type.parentId === 0)
      this.childrenTypes = res.filter(type => type.parentId !== 0)

      console.log("Parent:", this.parentTypes)
      console.log("Children:", this.childrenTypes)
    })
  }

  ngOnInit(): void {
    this.currentUrl = this.router.url;
  
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });

    this.authService.userSubject.subscribe((res) => {
      if (res) {
        this.user = res;
      }
    });
  }

  getChildrenTypeByPRId(typeId: number): ProductType[] {
    return this.childrenTypes.filter(type => type.parentId === typeId)
  }

  public logOut() {
    this.store.dispatch(CartActions.getCart({userId: 0}));
    this.authService.logOut();
    this.router.navigate(['/']);
  }
}
