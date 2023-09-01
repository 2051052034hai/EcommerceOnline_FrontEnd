import { get } from "./https";

const pathUrl = "/subcategories/product/";

export const getProductBySubId = async (id, minPrice, maxPrice, sort) => {
  let url = `${pathUrl}${id}?`;

  if (minPrice !== undefined && maxPrice !== undefined) {
    url += `price>${minPrice}&price<${maxPrice}&`;
  }
  if (sort !== undefined) {
    url += `sort=${sort}`;
  }
  const result = await get(url);
  return result.data.data;
};
