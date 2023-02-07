export interface Order {
    id?: Number
    userId: Number
    name?: String
    date?: Date
    address: String
    phone: String
    email?: String
    payment_method: String
}

export interface Order_Detail {
    orderId?: Number
    productId?: Number
    name?: String
    image?:String
    price?:number
    quantity: number
}

export interface Payment {
    order: Order
    order_details: Order_Detail[]
}