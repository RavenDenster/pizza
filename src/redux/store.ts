import {configureStore} from '@reduxjs/toolkit'
import  filter from './filter/slice'
import cart from './cart/slice'
import pizza from './pizza/slice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: { 
        filter,
        cart,
        pizza,
    }
})

export type RootState = ReturnType<typeof store.getState> // просто typeof store.getState возвращает функцию, а не нужный объект типов и ReturnType помогает с этим 

type AppDispatch = typeof store.dispatch // без typeof будет так что мы в type передаём обычный js код а это не коректно
export const useAppDispatch = () => useDispatch<AppDispatch>() // без этого мы не можем делать асинхронные экшины