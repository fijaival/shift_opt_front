import aspida from "@aspida/axios";
import api from "../../api/$api";
import AxiosInstance from "./axios";

// APIクライアントのインスタンスを生成する関数
export const createApiClient = () => {
  return api(aspida(AxiosInstance));
};

// ヘッダーにCSRFトークンを設定する関数
export const getAuthHeaders = (): Record<string, string | null> => {
  const csrfToken = localStorage.getItem("CsrfAccessToken");
  return {
    "X-CSRF-TOKEN": csrfToken,
  };
};
