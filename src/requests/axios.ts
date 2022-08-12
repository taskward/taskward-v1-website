import axios from "axios";

export const axiosRequest = axios.create({
  baseURL: import.meta.env.VITE_WIKI_API_BASE_URL,
  withCredentials: false,
});

// axios.defaults.baseURL = import.meta.env.VITE_WIKI_API_BASE_URL;
