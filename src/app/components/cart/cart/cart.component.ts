import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductInCart } from 'src/app/models/cart.model';
import * as CartSelectors from 'src/app/store/cartStore/cart.selectors';
import * as CartAction from 'src/app/store/cartStore/cart.action';
import { Product } from 'src/app/models/product.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart$: Observable<ProductInCart[]>
  count$: Observable<number>
  totalPrice$: Observable<number>

  constructor(private store: Store) {
    this.cart$ = store.pipe(select(CartSelectors.GroupedCartSelector))
    this.count$ = store.pipe(select(CartSelectors.countProductSelector))
    this.totalPrice$ = store.pipe(select(CartSelectors.totalPriceSelector))
  }

  ngOnInit(): void {
  }

  public clearCart() {
    Swal.fire({
      icon: 'warning',
      title: '<p class="text-xl text-slate-300">Bạn thật sự muốn xóa giỏ hàng?</p>',
      background: '#000',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa',
      confirmButtonColor: '#c81e1e',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.store.dispatch(CartAction.clearCart())
      }
    })
  }

  public increase(product: Product) {
    this.store.dispatch(CartAction.addProduct({product}))
  }

  public decrease(product: Product) {
    this.store.dispatch(CartAction.decreaseProduct({product}))
  }

  public removeProduct(product: Product) {
    Swal.fire({
      icon: 'warning',
      title: '<p class="text-xl text-slate-300">Bạn muốn xóa sản phẩm này khỏi giỏ hàng?</p>',
      background: '#000',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa',
      confirmButtonColor: '#c81e1e',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.store.dispatch(CartAction.removeProduct({product}))
      }
    })
  }
}
