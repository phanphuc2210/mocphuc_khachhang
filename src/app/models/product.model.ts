import { ProductType } from "./productType.model"

export interface Product {
    id?: number
    name: string
    typeId: number
    quantity: number
    image: string[]
    price: number
    description: string
    type_name?: string
    amountComment?: number
    starTotal?: number
    length: number
    width: number
    height: number
    woodId?: number
    wood: string
    slug?: string
    sold?: number
}