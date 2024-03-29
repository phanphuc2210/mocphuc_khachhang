export interface Comment {
    userId: Number
    productId: Number
    username?: string
    avatar?: string
    message: string
    image?: string
    star: number
    time?: Date
}

export interface CommentsHome {
    image: string
    image_product: string
    username: string
    star: number
    message: string
    slug: string
}