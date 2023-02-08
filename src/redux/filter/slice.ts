import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FilterSliceState, Sort, SortPropertyEnum } from "./types"



const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: SortPropertyEnum.RATING_DESC, 
    },
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
            if(state.categoryId !== 0) {
                state.currentPage = 1
            }
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setFillters(state, action: PayloadAction<FilterSliceState>) {
            state.currentPage = Number(action.payload.currentPage)
            state.sort = action.payload.sort
            state.categoryId = Number(action.payload.categoryId)
        },
    }
})



export const { setCategoryId, setSort, setCurrentPage, setFillters, setSearchValue } = filterSlice.actions // actions это filterSlice

export default filterSlice.reducer