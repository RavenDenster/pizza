import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { fetchPizzas } from "./asyncAction"
import { Pizza, PizzaSliceState, SearchPizzaParams, Status } from "./types"


const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,  //loading|success|error
}


const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload      
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.LOADING
            state.items = []
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            //if(action.payload) {
            state.items = action.payload
            state.status = Status.SUCCESS
            //}
        })
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.ERROR
            state.items = []
        })
    }
    //@ignore
    // extraReducers: {
    //     [fetchPizzas.pending]: (state, action) => {
    //         state.status = 'loading'
    //         state.items = []
    //         //console.log('zzzz');
    //     },
    //     [fetchPizzas.fulfilled]: (state, action) => {
    //         state.items = action.payload
    //         state.status = 'success'
    //         //console.log('xxxx');
    //     },
    //     [fetchPizzas.rejected]: (state, action) => {
    //         state.status = 'error'
    //         state.items = []
    //         //console.log('cccc');
    //     },
    // }
})



export const { setItems } = pizzaSlice.actions // actions это filterSlice

export default pizzaSlice.reducer