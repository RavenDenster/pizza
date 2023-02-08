export type CartItem = {
    id: string
    title: string
    price: number
    imageUrl: string
    type: string
    size: number
    count: number
}

export interface CartSliceState { // интерфейс всегда типизирует только объекты
    totalPrice: number
    items: CartItem[]
}