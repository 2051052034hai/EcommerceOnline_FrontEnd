import { createSlice } from "@reduxjs/toolkit";
import Cart from "apps/modules/Cart";

const initialState = {
  products: [],
  count: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    add_cart: (state, action) => {
     
      const { product, quantity } = action.payload;

      
      const productsCopy = [...state.products]; // Create a new array
      console.log("current-product:", state.products);

      let existingId = product.id;
      let existingItem = productsCopy.find((item) => item.id === existingId);

      if (existingItem) {
        let updatedItems = productsCopy.map((item) => {
          return item.id === existingId
            ? { ...item, quantity: item.quantity + quantity }
            : item;
        });
        return { ...state, products: updatedItems };
      } else {
        const newItem = { ...product, quantity: quantity };

        productsCopy.push(newItem); // Add the new item to the copy

        state.products = productsCopy; // Update the state with the copy of the array
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { add_cart } = cartSlice.actions;

export default cartSlice.reducer;
