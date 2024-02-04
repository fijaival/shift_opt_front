import { ActionTree, MutationTree, GetterTree, Module } from "vuex";
import axiosInstance from "../../api/axios";
import { AxiosError } from "axios";

import aspida from "@aspida/axios";
import api from "../../../api/$api";
import { RootState, Login, UserState } from "../types/index";

const state: UserState = {
  user: "",
  msg: "",
};

const mutations: MutationTree<UserState> = {
  setUser(state, user: string) {
    state.user = user;
  },
  resetState(state) {
    Object.assign(state, initialState());
  },
  setMsg(state, msg: string) {
    state.msg = msg;
  },
};

function initialState(): UserState {
  return {
    user: "",
    msg: "",
  };
}

const actions: ActionTree<UserState, RootState> = {
  setUser({ commit }, user: string) {
    commit("setUser", user);
  },
  async login({ commit }, requestBody: Login) {
    try {
      const client = api(aspida(axiosInstance));
      const response = await client.v1.auth.login.post({ body: requestBody });
      if (response.status === 200 && response.body) {
        const csrfAccessToken = response.headers["x-access-token-csrf"];
        const csrfRefreshToken = response.headers["x-refresh-token-csrf"];

        localStorage.setItem("CsrfAccessToken", csrfAccessToken);
        localStorage.setItem("CsrfRefreshToken", csrfRefreshToken);
        commit("setUser", requestBody.username);
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      const e = error as AxiosError; // errorをAxiosError型にキャスト
      if (e.response && e.response.status === 401) {
        // 401 Unauthorized の場合のメッセージ
        commit("setMsg", "アカウント名またはパスワードが間違っています");
      } else {
        // その他のエラーの場合
        commit("setMsg", "ログインに失敗しました");
      }
      console.error(e);
    }
  },
};

const getters: GetterTree<UserState, RootState> = {
  isLogin: (state): boolean => {
    return Boolean(state.user.trim());
  },
  getMsg: (state: UserState) => {
    return state.msg;
  },
};

export const UserModule: Module<UserState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
