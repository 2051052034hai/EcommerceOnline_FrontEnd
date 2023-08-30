import { get } from "./https";

const pathUrl = "/product/";

export const getProductsPage = async (page) => {
  const result = await get(`${pathUrl}?page=${page}&limit=5`);
  return result.data;
};

export const getProductsById = async (id) => {
  const result = await get(`${pathUrl}${id}`);
  return result.data.data;
};
