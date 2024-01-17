import { ActionTree, MutationTree, GetterTree, Module } from "vuex";
import aspida from "@aspida/axios";
import api from "../../../api/$api";
import AxiosInstance from "../../lib/axios";

import { PostResponse, Qualification } from "../../types";

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
  async fetchqualifications({ commit }) {
    try {
      const client = api(aspida(AxiosInstance));
      const response = await client.v1.qualifications.get();

      if (response.status === 200 && response.body) {
        commit("setQualifications", response.body);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error fetching qualifications: ", error);
    }
  },
  async addQualification({ commit }, newQualification) {
    try {
      const csrfToken = localStorage.getItem("CsrfAccessToken");
      console.log(csrfToken);
      const client = api(aspida(AxiosInstance));
      const headers = {
        "X-CSRF-TOKEN": csrfToken,
      };
      const response = await client.v1.qualifications.post({
        body: newQualification,
        config: { headers },
      });
      if (response.status === 201) {
        const newQualificationResponse: PostResponse = response.body;
        const addedQualification: Qualification = {
          id: newQualificationResponse.id,
          ...newQualification,
        };
        commit("addQualification", addedQualification);
      } else {
        throw new Error("Failed to add new Qualification");
      }
    } catch (error) {
      console.log(error);
      console.error("Error adding new Qualification: ", error);
    }
  },
  async deleteQualification({ commit }, qualificationId: number) {
    try {
      const csrfToken = localStorage.getItem("CsrfAccessToken");
      const client = api(aspida(AxiosInstance));
      const headers = {
        "X-CSRF-TOKEN": csrfToken,
      };
      const response = await client.v1.qualifications
        ._qualificationId(qualificationId)
        .delete({
          config: { headers },
        });
      if (response.status === 200) {
        commit("removeQualification", qualificationId);
      } else {
        throw new Error("Failed to delete qualification");
      }
    } catch (error) {
      console.error("Error deleting qualification: ", error);
    }
  },
};
const getters: GetterTree<QualificationState, RootState> = {
  getDrivers: (state: QualificationState) => {
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
