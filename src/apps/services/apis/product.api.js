import { create, update, remove, get } from "./https";

const pathUrl = "/products/";

export const getProducts = async () => {
  const result = await get(pathUrl);
  //   console.log(result.data.products);
  return result.data.products;
};

export const getProductsById = async (id) => {
  const result = await get(`/products/${id}`);
  //   console.log(result);
  return result.data;
};

export const getProductsByCateName = async (name) => {
  const result = await get(`/products/category/${name}`);
  //   console.log(result);
  return result.data;
};
