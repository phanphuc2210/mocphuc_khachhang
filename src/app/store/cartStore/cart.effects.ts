import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, mergeMap } from "rxjs";
import { Cart } from "src/app/models/cart.model";
import { AuthService } from "src/app/services/auth.service";
import { CartService } from "src/app/services/cart.service";
import * as CartActions from "src/app/store/cartStore/cart.action";

@Injectable()
export class CartEffects {
    getCart$ = createEffect(() => 
        this.actions$.pipe(
            ofType(CartActions.getCart),
            mergeMap((action) => {
                return this.cartService.getCart(action.userId).pipe(
                    map((res) => {
                        console.log("products:", res.result)
                        return CartActions.getCartSuccess({products: res.result})
                    })
                )
            })
        )
    )

    addProduct$ = createEffect(() => 
        this.actions$.pipe(
            ofType(CartActions.addProduct),
            exhaustMap((action) => {
                let data: Cart = {
                    userId: this.authService.userSubject.value.id,
                    productId: action.product.id!
                }
                return this.cartService.addProduct(data).pipe(
                    map(() => {
                        return CartActions.addProductSuccess({product: action.product})
                    })
                )
            })
        )
    )

    decreaseProduct$ = createEffect(() => 
        this.actions$.pipe(
            ofType(CartActions.decreaseProduct),
            exhaustMap((action) => {
                let data: Cart = {
                    userId: this.authService.userSubject.value.id,
                    productId: action.product.id!
                }
                return this.cartService.decreaseProduct(data).pipe(
                    map(() => {
                        return CartActions.decreaseProductSuccess({product: action.product})
                    })
                )
            })
        )
    )

    removeProduct$ = createEffect(() => 
        this.actions$.pipe(
            ofType(CartActions.removeProduct),
            exhaustMap((action) => {
                let data: Cart = {
                    userId: this.authService.userSubject.value.id,
                    productId: action.product.id!
                }
                return this.cartService.removeProduct(data).pipe(
                    map(() => {
                        return CartActions.removeProductSuccess({product: action.product})
                    })
                )
            })
        )
    )

    clearCart$ = createEffect(() => 
        this.actions$.pipe(
            ofType(CartActions.clearCart),
            exhaustMap(() => {
                return this.cartService.clearCart(this.authService.userSubject.value.id).pipe(
                    map(() => {
                        return CartActions.clearCartSuccess()
                    })
                )
            })
        )
    )

    constructor(private actions$: Actions, private cartService: CartService, private authService: AuthService) {}
}