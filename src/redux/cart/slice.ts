import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { calcTotalPrice } from "../../utils/calcTotalPrice"
import { getCartFromLS } from "../../utils/getCartFromLS"
import { RootState } from "../store"
import { CartItem, CartSliceState } from "./types"


const {items, totalPrice} = getCartFromLS() 

const initialState: CartSliceState = {
    totalPrice,
    items,
}

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id) // есть ли уже в массиве такой объект
            
            if(findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload, // это весь изначально добавленый объект
                    count: 1, // это дополнительное поле
                }) 
            }

            state.totalPrice = calcTotalPrice(state.items)
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload)

            if(findItem) {
                findItem.count--
            }
            state.totalPrice = calcTotalPrice(state.items)
        },
        // minusPrice(state, action) {
        //     state.totalPrice = action.payload
        // },
        removeItem(state, action: PayloadAction<string>) {
           state.items = state.items.filter(obj => obj.id !== action.payload)
           state.totalPrice = calcTotalPrice(state.items)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        },
    }
})

export const { addItem, removeItem, minusItem, clearItems } = CartSlice.actions // actions это filterSlice

export default CartSlice.reducer