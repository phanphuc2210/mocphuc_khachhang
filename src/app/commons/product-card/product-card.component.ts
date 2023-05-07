import { Component, Input, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import * as CartAction from 'src/app/store/cartStore/cart.action';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;

  constructor() {}

  ngOnInit(): void {}

  // Làm chức năng mua hàng cho khách lữ hành thì từ từ sửa lại
  // public buyProduct() {
  //   this.store.dispatch(CartAction.addProduct({ product: this.product }));
  //   this.router.navigate(['/cart']);
  // }
}
