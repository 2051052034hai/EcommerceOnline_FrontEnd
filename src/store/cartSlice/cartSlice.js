import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  count: 0,
  totalAfterDiscount: 0,
  totalBeforeDiscount: 0,
  totalDiscount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add_cart: (state, action) => {
      const { _id, quantity, price, discountPercentage } = action.payload;

      const moneyAfterDiscount = price - (price * discountPercentage) / 100;

      const existingProduct = state.products.find(
        (product) => product._id === _id
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.products.push({
          ...action.payload,
          moneyAfterDiscount,
        });
        state.count += 1;
      }

      state.totalBeforeDiscount += quantity * price;
      state.totalAfterDiscount += moneyAfterDiscount * quantity;
      state.totalDiscount += (price - moneyAfterDiscount) * quantity;
    },
    decrease_cart: (state, action) => {
      const { _id } = action.payload;

      const existingProduct = state.products.find(
        (product) => product._id === _id
      );

      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          state.products = state.products.filter(
            (product) => product._id !== _id
          );
          state.count -= 1;
        }

        const moneyAfterDiscount =
          existingProduct.price -
          (existingProduct.price * existingProduct.discountPercentage) / 100;
        state.totalBeforeDiscount -= existingProduct.price;
        state.totalAfterDiscount -= moneyAfterDiscount;
        state.totalDiscount -= existingProduct.price - moneyAfterDiscount;
      }
    },
    increase_cart: (state, action) => {
      const { _id } = action.payload;

      const existingProduct = state.products.find(
        (product) => product._id === _id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;

        const moneyAfterDiscount =
          existingProduct.price -
          (existingProduct.price * existingProduct.discountPercentage) / 100;
        state.totalBeforeDiscount += existingProduct.price;
        state.totalAfterDiscount += moneyAfterDiscount;
        state.totalDiscount += existingProduct.price - moneyAfterDiscount;
      }
    },
    remove_product: (state, action) => {
      const { _id } = action.payload;
      const removedProduct = state.products.find(
        (product) => product._id === _id
      );

      if (removedProduct) {
        state.products = state.products.filter(
          (product) => product._id !== _id
        );
        state.count -= removedProduct.quantity;

        const moneyAfterDiscount =
          removedProduct.price -
          (removedProduct.price * removedProduct.discountPercentage) / 100;
        state.totalBeforeDiscount -= removedProduct.price;
        state.totalAfterDiscount -=
          moneyAfterDiscount * removedProduct.quantity;
        state.totalDiscount +=
          removedProduct.price - moneyAfterDiscount * removedProduct.quantity;
      }
    },
    clear_cart: (state) => {
      state.products = [];
      state.count = 0;
      state.totalAfterDiscount = 0;
      state.totalBeforeDiscount = 0;
      state.totalDiscount = 0;
    },
  },
});

export const {
  add_cart,
  decrease_cart,
  increase_cart,
  remove_product,
  clear_cart,
} = cartSlice.actions;

export default cartSlice.reducer;
