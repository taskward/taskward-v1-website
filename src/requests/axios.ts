import axios from "axios";

export const axiosService = axios.create({
  baseURL: import.meta.env.VITE_BRUCE_WORLD_API_BASE_URL,
  withCredentials: false,
  timeout: 10000,
});
