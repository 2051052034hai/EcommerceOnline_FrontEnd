import { create, update, remove, get } from "./https";

const pathUrl = "/product/";

export const getProductsPage = async (page) => {
  const result = await get(`${pathUrl}?page=${page}&limit=5`);
  return result.data;
};

export const getProductsById = async (id) => {
  const result = await get(`${pathUrl}${id}`);
  return result.data.data;
};

export const getProductsByCateName = async (name) => {
  const result = await get(`/products/category/${name}`);
  //   console.log(result);
  return result.data;
};
