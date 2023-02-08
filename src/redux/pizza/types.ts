export type Pizza = {
    id: string, 
    title: string, 
    price: number, 
    imageUrl: string, 
    sizes: number[], 
    types: number[],
    rating: number,
}

export enum Status { // это как объект только ts ибо его не получится указать как тип
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export interface PizzaSliceState {
    items: Pizza[] 
    status: Status   // status: 'loading' | 'success' | 'error'
}

export type SearchPizzaParams = {
    order: string 
    sortBy: string
    category: string 
    search: string 
    currentPage: string
}