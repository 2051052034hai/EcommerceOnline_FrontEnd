import { get } from "./https";

const pathUrl = "/product/";

export const getProductsPage = async (page, pageSize) => {
  const result = await get(`${pathUrl}?page=${page}&limit=${pageSize}`);
  return result.data;
};

export const getProductsById = async (id) => {
  const result = await get(`${pathUrl}${id}?populate=subcategory,shop`);
  return result.data.data;
};

export const getTopSaleProduct = async () => {
  const result = await get("/products/topsale");
  return result.data;
};
