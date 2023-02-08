
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { Pizza, SearchPizzaParams } from "./types"

//Record<string, string> если все значения одного типа то можно сделать так: указать первым аргументом тип ключа, вторым значения
// у createAsyncThunk можно указать первым в джинериках то, что она возвращает вместо return data as CartItem[], а второй параметрв async вместо async (params:  Record<string, string>, thunkApi)
export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizzasStatus', async (params, thunkApi) => {  // Record<string, string> можно вместо SearchPizzaParams
    const {order, sortBy, category, search, currentPage} = params
    //@ts-ignore
    const {data} = await axios.get<Pizza[]>(`https://63286fab9a053ff9aab7e0f2.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`) // await выполняет then и помещает в переменую  
    //console.log(data)
    return data
    }
)
