import { get } from "./https";

const pathUrl = "/categories/";

export const getCategory = async () => {
  const result = await get(`${pathUrl}?populate=subcategories`);
  return result.data.data;
};
