import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartSlice/cartSlice'

export const store = configureStore({
    reducer: {
           
        cart: cartSlice

    },
})