import axios from "axios";

export const baseURL = import.meta.env.VITE_API_URL;

export const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(async config => {
  config.headers.Authorization = `Bearer ${import.meta.env.VITE_TEMP_TOKEN}`;

  return config;
});
