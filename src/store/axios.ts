interface Person {
  first_name: string;
  id: number;
  last_name: string;
}

import axios from "axios";
import type { App } from "vue";
import store from "./index.ts";

export default {
  install: (app: App) => {
    const axiosInstance = axios.create({
      baseURL: "http://127.0.0.1:5000/api/v1/",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": store.getters["csrf/getCsrfAccessToken"],
      },
    });
    app.config.globalProperties.$axios = axiosInstance;
  },
};
