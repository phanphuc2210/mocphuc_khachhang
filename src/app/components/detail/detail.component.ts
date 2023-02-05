import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import * as CartAction from 'src/app/store/cartStore/cart.action';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  productId: string = '';
  product!: Product;
  quantity: number = 1;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.productService
      .getProductById(this.productId)
      .subscribe((res) => (this.product = res.result[0]));
  }

  public buyProduct(product: Product) {
    for(let i = 0; i < this.quantity; i++) {
      this.store.dispatch(CartAction.addProduct({ product }));
    }
    this.router.navigate(['/cart'])
  }

  public decrease() {
    if(this.quantity > 1) {
      this.quantity -= 1
    }
  }

  public increase() {
    if(this.quantity < this.product.quantity) {
      this.quantity += 1
    }
  }
}
