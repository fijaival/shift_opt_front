import aspida from "@aspida/axios";
import api from "../../api/$api";
import AxiosInstance from "../lib/axios";

// APIクライアントのインスタンスを生成する関数
export const createApiClient = () => {
  return api(aspida(AxiosInstance));
};

// ヘッダーにCSRFトークンを設定する関数
export const getAuthHeaders = () => {
  const csrfToken = localStorage.getItem("CsrfAccessToken");
  return {
    "X-CSRF-TOKEN": csrfToken,
  };
};
