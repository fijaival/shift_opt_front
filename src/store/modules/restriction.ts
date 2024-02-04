import { ActionTree, MutationTree, GetterTree, Module } from "vuex";

import { PostResponse, Restriction } from "../../types";
import { RootState, RestrictionState } from "../types";

import {
  fetchRestrictions,
  addRestriction,
  deleteRestriction,
} from "../../api/restrictionsApi";

const state: RestrictionState = {
  restrictions: [],
};

const mutations: MutationTree<RestrictionState> = {
  setRestrictions: (state, restrictions) => (state.restrictions = restrictions),
  addRestriction: (state, newRestriction: Restriction) => {
    state.restrictions.push(newRestriction);
  },
  removeRestriction: (state, id) =>
    (state.restrictions = state.restrictions.filter(
      (restriction) => restriction.id !== id
    )),
};
const actions: ActionTree<RestrictionState, RootState> = {
  async loadRrestrictions({ commit }) {
    fetchRestrictions()
      .then((response) => {
        commit("setRestrictions", response.body);
      })
      .catch((error) => console.error("Error fetching restrictions: ", error));
  },
  async createRestriction({ commit }, newRestriction) {
    await addRestriction(newRestriction)
      .then((response) => {
        const newRestrictionResponse: PostResponse = response.body;
        const addedRestriction: Restriction = {
          id: newRestrictionResponse.id,
          ...newRestriction,
        };
        commit("addRestriction", addedRestriction);
      })
      .catch((error) =>
        console.error("Error adding new restrictions: ", error)
      );
  },

  async removeRestriction({ commit }, restrictionId: number) {
    await deleteRestriction(restrictionId)
      .then(() => {
        commit("removeRestriction", restrictionId);
      })
      .catch((error) => console.error("Error removing restriction: ", error));
  },
};
const getters: GetterTree<RestrictionState, RootState> = {
  getRestrictions: (state: RestrictionState) => {
    return state.restrictions;
  },
};

export const RestrictionModule: Module<RestrictionState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
