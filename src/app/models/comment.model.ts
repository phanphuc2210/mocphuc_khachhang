export interface Comment {
    userId: Number
    productId: Number
    username?: string
    message: string
    star: number
    time?: Date
}