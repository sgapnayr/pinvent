import { configureStore } from "@reduxjs/toolkit"
import authReducer from './features/authSlice'
import productReducer from './features/product/productSlice'

export const store = configureStore({
    reducer: {
        authReducer,
        productReducer
    }
})