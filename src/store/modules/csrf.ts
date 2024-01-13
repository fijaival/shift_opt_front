// import { ActionTree, MutationTree, GetterTree, Module } from "vuex";
// interface CSRFState {
//   csrfRefreshToken: string;
//   csrfAccessToken: string;
// }

// type RootState = {
//   version: string;
// };
// const state: CSRFState = {
//   csrfRefreshToken: "",
//   csrfAccessToken: "",
// };

// const mutations: MutationTree<CSRFState> = {
//   setCsrfRefreshToken(state, token: string) {
//     state.csrfRefreshToken = token;
//   },
//   setCsrfAccessToken(state, token: string) {
//     state.csrfAccessToken = token;
//   },
//   clearTokens(state) {
//     state.csrfRefreshToken = "";
//     state.csrfAccessToken = "";
//   },
//   resetState(state) {
//     Object.assign(state, initialState());
//   },
// };

// function initialState(): CSRFState {
//   return {
//     csrfRefreshToken: "",
//     csrfAccessToken: "",
//   };
// }

// const actions: ActionTree<CSRFState, RootState> = {
//   saveCsrfRefreshToken({ commit }, token: string) {
//     commit("setCsrfRefreshToken", token);
//   },
//   saveCsrfAccessToken({ commit }, token: string) {
//     commit("setCsrfAccessToken", token);
//   },
//   removeTokens({ commit }) {
//     commit("clearTokens");
//   },
// };

// const getters: GetterTree<CSRFState, RootState> = {
//   getCsrfRefreshToken: (state): string => {
//     return state.csrfRefreshToken;
//   },
//   getCsrfAccessToken: (state): string => {
//     return state.csrfAccessToken;
//   },
// };

// export const CsrfModule: Module<CSRFState, RootState> = {
//   namespaced: true,
//   state,
//   mutations,
//   actions,
//   getters,
// };
