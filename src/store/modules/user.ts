import { ActionTree, MutationTree, GetterTree, Module } from "vuex";

type RootState = {
  version: string;
};

interface UserState {
  user: string;
}

const state: UserState = {
  user: "",
};

const mutations: MutationTree<UserState> = {
  setUser(state, user: string) {
    state.user = user;
  },
  resetState(state) {
    Object.assign(state, initialState());
  },
};

function initialState(): UserState {
  return {
    user: "",
  };
}

const actions: ActionTree<UserState, RootState> = {
  setUser({ commit }, user: string) {
    commit("setUser", user);
  },
};

const getters: GetterTree<UserState, RootState> = {
  isLogin: (state): boolean => {
    return Boolean(state.user.trim());
  },
};

export const UserModule: Module<UserState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
