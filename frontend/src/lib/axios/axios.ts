import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { inLocalhost } from "../../utils/localHelper";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: `http://localhost:5050/api/v1`,
});

if (!inLocalhost()) {
  axiosInstance.defaults.withXSRFToken = true;
  axiosInstance.defaults.withCredentials = true;
}

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const userInfo =
    JSON.parse((Cookies.get("userInfo") as string) || "{}") ||
    JSON.parse(localStorage.getItem("userInfo") || "{}");
  const token = userInfo.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  }
  // function (error) {
  //   if (
  //     error.response.status === 401 &&
  //     error.response.data.message == "You are not authenticated"
  //   ) {
  //     window.location.replace("/");
  //   }
  //   return Promise.reject(error);
  // }
);

export default axiosInstance;
