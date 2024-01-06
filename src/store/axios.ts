import axios, { AxiosInstance, AxiosError } from "axios";
import type { App } from "vue";
import store from ".";

const NO_RETRY_HEADER = "x-no-retry";

export default {
  install: (app: App) => {
    const axiosInstance: AxiosInstance = axios.create({
      baseURL: "http://127.0.0.1:5000/api/",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    async function refreshTokenAndRetryRequest(error: AxiosError) {
      try {
        // トークンリフレッシュのリクエスト
        const refreshResponse = await axiosInstance.post(
          "/v1/auth/refresh",
          {},
          {
            withCredentials: true,
            headers: {
              "X-CSRF-TOKEN": store.getters["csrf/getCsrfRefreshToken"],
              [NO_RETRY_HEADER]: "true", // リトライ防止ヘッダーを設定
            },
          }
        );

        if (refreshResponse.status === 200 && error.config) {
          console.log("Token refreshed successfully");
          const newToken = refreshResponse.headers["x-csrf-token"];
          error.config.headers["X-CSRF-TOKEN"] = newToken;
          error.config.headers[NO_RETRY_HEADER] = "true";
          console.log(axiosInstance.request(error.config));
          return axiosInstance.request(error.config);
        }
      } catch (refreshError) {
        // トークンリフレッシュのエラー処理
        console.log("リフレッシュトークンを取得できませんでした。");
        console.log(Promise.reject(refreshError));
        return Promise.reject(refreshError);
      }
    }

    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        // ここでx-no-retryヘッダーを確認
        if (error.config?.headers[NO_RETRY_HEADER]) {
          console.log("Retry not allowed");
          return Promise.reject(error);
        }

        if (error.config && error.response && error.response.status === 401) {
          console.log("Trying to refresh token");
          return refreshTokenAndRetryRequest(error);
        } else {
          console.log(
            "Error not related to authentication, or retry already attempted"
          );
          console.log(Promise.reject(error));
          return Promise.reject(error);
        }
      }
    );
    app.config.globalProperties.$axios = axiosInstance;
  },
};
