import { create } from "./https";

const pathUrl = "/user/login";

export const handleLoginUser = async (user) => {
  const result = await create(pathUrl, user);
  return result.data;
};

export const handleLoginSocial= async (user) => {
  const result = await create("/user/login-gg", user);
  return result.data;
};
