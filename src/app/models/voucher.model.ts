export interface Voucher {
    id?: number
    code?: string
    discount: number
    release_date: string
    expiration_date: string
    applicable_productType: number
    applicable_productTypeName?: string
    bill_from: number
    quantity: number
}