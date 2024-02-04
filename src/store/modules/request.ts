import { ActionTree, MutationTree, GetterTree, Module } from "vuex";

import { PostVacationRecords } from "../../types/axios";
import { VacationRecord, VacationRecords } from "../../types";

import {
  fetchRequests,
  addRequests,
  deleteRequest,
} from "../../api/requestsApi";

import { RootState, RequestState } from "../types";

const state: RequestState = {
  requests: [],
};

const mutations: MutationTree<RequestState> = {
  setRequests: (state, requests: VacationRecords) =>
    (state.requests = requests),
  addRequest: (state, newRequest: VacationRecord) => {
    state.requests.push(newRequest);
  },
  removeRequest: (state, id: number) =>
    (state.requests = state.requests.filter((requests) => requests.id !== id)),
};

const actions: ActionTree<RequestState, RootState> = {
  async loadRequests(
    { commit },
    { year, month }: { year: number; month: number }
  ) {
    await fetchRequests(year, month)
      .then((response) => {
        commit("setRequests", response.body);
      })
      .catch((error) => console.error("Error fetching requests: ", error));
  },

  async createRequest(_, newRequests: PostVacationRecords) {
    await addRequests(newRequests)
      .then()
      .catch((error) => console.error("Error adding new request: ", error));
  },

  async removeRequest({ commit }, requestId: number) {
    await deleteRequest(requestId)
      .then(() => {
        commit("removeRequest", requestId);
      })
      .catch((error) => console.error("Error removing request: ", error));
  },
};

const getters: GetterTree<RequestState, RootState> = {
  getRequests: (state: RequestState) => {
    return state.requests;
  },
};

export const RequestModule: Module<RequestState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
