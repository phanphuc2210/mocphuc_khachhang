import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductInCart } from "src/app/models/cart.model";
import { Product } from "src/app/models/product.model";

export const selectFeature = createFeatureSelector<Product[]>('cart')

export const countProductSelector = createSelector(
    selectFeature, 
    (state: Product[]) => state.length
)

export const totalPriceSelector = createSelector(
    selectFeature, 
    (state: Product[]) => {
        let totalPrice = 0
        state.forEach(p => totalPrice += p.price)
        return totalPrice
    }
)

export const GroupedCartSelector = createSelector(
    selectFeature,
    (state: Product[]) => {
        let map: Map<number, ProductInCart> = new Map

        state.forEach(p => {
            if(map.get(p.id!)) {
                (map.get(p.id!) as ProductInCart).count++
            } else {
                map.set(p.id!, { product: p, count: 1 })
            }
        })

        const sortedMap = new Map([...map.entries()].sort())
        return Array.from(sortedMap.values())
    }
)