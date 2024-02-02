import { ActionTree, MutationTree, GetterTree, Module } from "vuex";
import { createApiClient, getAuthHeaders } from "../../lib/apiHelpers";

import { PostResponse, Restriction } from "../../types";

type RootState = {
  version: string;
};

interface RestrictionState {
  restrictions: Restriction[];
}

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
  async fetcRrestrictions({ commit }) {
    try {
      const client = createApiClient();
      const response = await client.v1.restrictions.get();

      if (response.status === 200 && response.body) {
        commit("setRestrictions", response.body);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error fetching restrictions: ", error);
    }
  },
  async addRestriction({ commit }, newRestriction) {
    try {
      const client = createApiClient();
      const headers = getAuthHeaders();
      const response = await client.v1.restrictions.post({
        body: newRestriction,
        config: { headers },
      });
      if (response.status === 201) {
        const newRestrictionResponse: PostResponse = response.body;
        const addedRestriction: Restriction = {
          id: newRestrictionResponse.id,
          ...newRestriction,
        };
        commit("addRestriction", addedRestriction);
      } else {
        throw new Error("Failed to add new Restriction");
      }
    } catch (error) {
      console.log(error);
      console.error("Error adding new Restriction: ", error);
    }
  },
  async deleteRestriction({ commit }, RestrictionId: number) {
    try {
      const client = createApiClient();
      const headers = getAuthHeaders();
      const response = await client.v1.restrictions
        ._restrictionId(RestrictionId)
        .delete({
          config: { headers },
        });
      if (response.status === 200) {
        commit("removeRestriction", RestrictionId);
      } else {
        throw new Error("Failed to delete Restriction");
      }
    } catch (error) {
      console.error("Error deleting Restriction: ", error);
    }
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
