import { get } from "./https";

const pathUrl = "/shop/";

export const getProductsByShopId = async (id, page, pageSize) => {

  let url = `${pathUrl}${id}?populate=subcategory&`;

  if (page !== undefined && pageSize !== undefined) {
    url += `page=${page}&limit=${pageSize}&`;
  }
  
  const result = await get(url);

  return result.data.data;
};
