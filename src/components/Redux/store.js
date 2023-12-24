import { configureStore } from '@reduxjs/toolkit'
import CardSlice from './Slice/CardSlice'

export const store = configureStore({
  reducer: {
  cart:CardSlice
  }
})