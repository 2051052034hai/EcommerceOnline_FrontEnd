import { get } from "./https";

const pathUrl = "/subcategories/product/";

export const getProductBySubId = async (id) => {
 
  const result = await get(`${pathUrl}${id}`);
  console.log(result);
  return result.data.data;
};

