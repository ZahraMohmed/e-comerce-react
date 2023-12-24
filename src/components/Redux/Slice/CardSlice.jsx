import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
  cartItem: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const CardSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItem.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;
      if (!existingItem) {
        state.cartItem.push({
          id: newItem.id,
          productName: newItem.productName,
          price: newItem.price,
          imgUrl: newItem.imgUrl,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(existingItem.Price);
      }
      state.totalAmount = state.cartItem.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),0
      );

      toast.success("Product Added Successfully");
    },
    deleteItem : (state , action) => {
      const id = action.payload;
      const existingItem = state.cartItem.find((item) => item.id === id);
      if (existingItem) {
        state.cartItem = state.cartItem.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
        state.totalAmount = state.cartItem.reduce(
          (total, item) => total + Number(item.price) * Number(item.quantity),0
        );
      }
    },
  
  },
});

export const cartAction = CardSlice.actions;

export default CardSlice.reducer;
