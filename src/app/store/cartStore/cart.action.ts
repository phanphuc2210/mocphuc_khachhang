import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/models/product.model";

export const getCart = createAction('[Cart] Get Cart', props<{userId: number}>())
export const getCartSuccess = createAction('[Cart] Get Cart success', props<{products: Product[]}>())

export const addProduct = createAction('[Cart] Add Product', props<{product: Product}>())
export const addProductSuccess = createAction('[Cart] Add Product success', props<{product: Product}>())

export const decreaseProduct = createAction('[Cart] Decrease Product', props<{product: Product}>())
export const decreaseProductSuccess = createAction('[Cart] Decrease Product success', props<{product: Product}>())

export const removeProduct = createAction('[Cart] Remove Product', props<{product: Product}>())
export const removeProductSuccess = createAction('[Cart] Remove Product success', props<{product: Product}>())

export const clearCart = createAction('[Cart] Clear Cart')
export const clearCartSuccess = createAction('[Cart] Clear Cart success')