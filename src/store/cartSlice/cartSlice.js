import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  count: 0,
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    add_cart: (state, action) => {
      const { _id, quantity, price } = action.payload;

      // Tạo một bản sao của mảng products
      const productsCopy = [...state.products];

      // Tìm sản phẩm đã tồn tại trong mảng
      const existingProduct = productsCopy.find(
        (product) => product._id === _id
      );

      if (existingProduct) {
        // Cập nhật số lượng nếu sản phẩm đã tồn tại
        existingProduct.quantity += quantity;
      } else {
        // Thêm sản phẩm vào mảng nếu chưa tồn tại
        productsCopy.push(action.payload);
        state.count += 1;
      }

      // Cập nhật state.products bằng bản sao mới
      state.products = productsCopy;
      state.total += price * quantity; // Cập nhật tổng tiền
    },
    decrease_cart: (state, action) => {
      const { _id } = action.payload;

      const existingProduct = state.products.find(
        (product) => product._id === _id
      );

      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
          state.total -= existingProduct.price; // Giảm tổng tiền
        } else {
          // Xoá sản phẩm khỏi giỏ hàng nếu số lượng là 1
          state.products = state.products.filter(
            (product) => product._id !== _id
          );
          state.count -= 1;
          state.total -= existingProduct.price; // Giảm tổng tiền
        }
      }
    },
    increase_cart: (state, action) => {
      const { _id } = action.payload;

      const existingProduct = state.products.find(
        (product) => product._id === _id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
        state.total += existingProduct.price; // Tăng tổng tiền
      }
    },
    remove_product: (state, action) => {
      const { _id } = action.payload;
      const removedProduct = state.products.find(
        (product) => product._id === _id
      );

      if (_id) {
        state.products = state.products.filter(
          (product) => product._id !== _id
        );
        state.count -= 1;
        state.total -= removedProduct.price * removedProduct.quantity;
      }
    },
  },
});

export const { add_cart, decrease_cart, increase_cart, remove_product } =
  cartSlice.actions;

export default cartSlice.reducer;
