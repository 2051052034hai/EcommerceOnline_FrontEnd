import { get } from "./https";

const pathUrl = "/subcategories";



export const getProductBySubId = async (
  id,
  minPrice,
  maxPrice,
  sort,
  page,
  pageSize
) => {
  let url = `${pathUrl}/product/${id}?`;

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

export const getSubCategories = async () => {

  const result = await get(pathUrl);

  return result.data.data;
};