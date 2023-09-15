import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ecommerceht.onrender.com/v1/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle error
    return Promise.reject(error);
  }
);

const get = (url, config) => {
  return axiosInstance.get(url, config);
};

const create = (url, data, config) => {
  return axiosInstance.post(url, data, config);
};

const update = (url, data, config) => {
  return axiosInstance.put(url, data, config);
};

const remove = (url, config) => {
  return axiosInstance.delete(url, config);
};

const updateMany = (url, data, config) => {
  return axiosInstance.patch(url, data, config);
};

export { get, create, update, remove, updateMany };
