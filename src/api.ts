import axios, { AxiosRequestConfig } from "axios";

export const baseURL = process.env.REACT_APP_BASE_URL_ADDRESS;

export const $host = axios.create({
  baseURL,
});

const authInterceptor = (config: AxiosRequestConfig) => {
  config.headers = {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  };
  return config;
};
$host.interceptors.request.use(authInterceptor);

export const URL = $host.defaults.baseURL;
