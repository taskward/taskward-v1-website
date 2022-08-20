import axios from "axios";
import { i18n } from "@i18n";

const axiosService = axios.create({
  baseURL: import.meta.env.VITE_BRUCE_WORLD_BASE_URL,
  withCredentials: false,
  timeout: 10000,
  headers: {
    accept: "application/json; charset=utf-8",
  },
});

axiosService.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.message === "timeout of 10000ms exceeded") {
      console.error(i18n.t("request:RESPONSE.ERROR.TIMEOUT"));
    } else if (error.response.status === 404) {
      console.error("404: " + error.message);
    } else {
      console.error(error.message);
    }
    return Promise.reject(error);
  }
);

export { axiosService };
