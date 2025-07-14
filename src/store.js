import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

// 1. Создаем асинхронную функцию для загрузки товаров
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await axios.get('https://fakestoreapi.com/products')
        return response.data
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],       // сюда положим товары
        status: 'idle',  // состояние загрузки: idle - ничего не делаем, loading - загружаем, succeeded - загрузили, failed - ошибка
        error: null     // сюда положим ошибку, если она будет
    },
    reducers: {
        // сюда можно добавить обычные действия, если нужно
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading'  // загрузка началась
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'  // загрузка прошла успешно
                state.items = action.payload  // сохраняем товары
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed'  // загрузка завершилась с ошибкой
                state.error = action.error.message
            })
    }
})

const store = configureStore({
    reducer: {
        products: productsSlice.reducer
    }
})

export default store