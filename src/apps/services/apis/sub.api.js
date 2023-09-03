import { get } from "./https";

const pathUrl = "/subcategories/product/";

export const getProductBySubId = async (id, minPrice, maxPrice, sort, page, pageSize) => {
  let url = `${pathUrl}${id}?`;

  if (page !== undefined && pageSize !== undefined) {
    url += `page=${page}&limit=${pageSize}&`;
  }

  if (minPrice !== undefined && maxPrice !== undefined) {
    url += `price>${minPrice}&price<${maxPrice}&`;
  }
  if (sort !== undefined) {
    url += `sort=${sort}&`;
  }

 
  const result = await get(url);

  return result.data.data;
};
