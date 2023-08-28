import { create } from "./https";

const pathUrl = "/user/login";

export const handleLoginUser = async (user) => {
  const result = await create(pathUrl, user);
    console.log(result);
  return result.data;
};
