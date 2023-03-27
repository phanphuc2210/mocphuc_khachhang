export interface Order {
    id?: Number
    userId: Number
    name?: String
    order_date?: Date
    address: String
    phone: String
    email?: String
    payment_method: String
    status?: number
    status_name?: string
}

export interface Order_Detail {
    orderId?: number
    productId?: number
    name?: String
    image?:String
    price?:number
    quantity: number
}

export interface Payment {
    order: Order
    order_details: Order_Detail[]
}