import { Product } from "./product.model";

export interface ProductInCart {
    product: Product
    count: number
}

export interface Cart {
    id?: number
    userId: number
    productId: number
}