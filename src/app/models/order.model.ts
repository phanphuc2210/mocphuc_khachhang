export interface Order {
    id?: Number
    userId: Number
    name?: String
    order_date?: Date
    customer_name?: string
    address: String
    phone: String
    email?: String
    payment_method: String
    status?: number
    status_name?: string
    discount?: number
}

export interface Order_Detail {
    orderId?: number
    productId?: number
    productType?: number
    name?: String
    image?:String
    price?:number
    quantity: number
}

export interface Payment {
    order: Order
    order_details: Order_Detail[]
}