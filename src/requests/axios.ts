import axios from "axios";
import { i18n } from "@i18n";
import { LOCAL_STORAGE_TOKEN } from "@utils";

const axiosService = axios.create({
  baseURL: import.meta.env.VITE_BRUCE_WORLD_BASE_URL,
  withCredentials: false,
  timeout: 15000,
  headers: {
    accept: "application/json;charset=utf-8",
  },
});

if (localStorage.getItem(LOCAL_STORAGE_TOKEN)) {
  axiosService.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem(LOCAL_STORAGE_TOKEN);
}

axiosService.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.message === "timeout of 10000ms exceeded") {
      console.error(i18n.t("request:RESPONSE.ERROR.TIMEOUT"));
    } else if (error.response?.status === 401) {
      console.error("401: " + error.message);
    } else if (error.response?.status === 404) {
      console.error("404: " + error.message);
    } else {
      console.error(error.message);
    }
    return Promise.reject(error);
  }
);

export { axiosService };
