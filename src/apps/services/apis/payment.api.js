import { get } from "./https";

const pathUrl = "/payment/config";

export const getPaymentConfig = async () => {
  const result = await get(pathUrl);
  return result.data.data;
};
