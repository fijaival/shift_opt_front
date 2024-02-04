import { ActionTree, MutationTree, GetterTree, Module } from "vuex";
import { PostResponse, Qualification } from "../../types";

import {
  fetchQualifications,
  addQualification,
  deleteQualification,
} from "../../api/qualificationsApi";

type RootState = {
  version: string;
};

interface QualificationState {
  qualifications: Qualification[];
}

const state: QualificationState = {
  qualifications: [],
};

const mutations: MutationTree<QualificationState> = {
  setQualifications: (state, qualifications) =>
    (state.qualifications = qualifications),
  addQualification: (state, newQualification: Qualification) => {
    state.qualifications.push(newQualification);
  },
  removeQualification: (state, id) =>
    (state.qualifications = state.qualifications.filter(
      (qualification) => qualification.id !== id
    )),
};
const actions: ActionTree<QualificationState, RootState> = {
  async loadQualifictions({ commit }) {
    fetchQualifications()
      .then((response) => {
        commit("setQualifications", response.body);
      })
      .catch((error) =>
        console.error("Error fetching qualifications: ", error)
      );
  },
  async createQualification({ commit }, newQualification) {
    await addQualification(newQualification)
      .then((response) => {
        const newQualificationResponse: PostResponse = response.body;
        const addedQualification: Qualification = {
          id: newQualificationResponse.id,
          ...newQualification,
        };
        commit("addQualification", addedQualification);
      })
      .catch((error) =>
        console.error("Error adding new Qualification: ", error)
      );
  },

  async removeQualification({ commit }, qualificationId: number) {
    await deleteQualification(qualificationId)
      .then(() => {
        commit("removeQualification", qualificationId);
      })
      .catch((error) => console.error("Error removing qualification: ", error));
  },
};
const getters: GetterTree<QualificationState, RootState> = {
  getQualifications: (state: QualificationState) => {
    return state.qualifications;
  },
};

export const QualificationModule: Module<QualificationState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
