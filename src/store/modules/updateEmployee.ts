import { ActionTree, MutationTree, GetterTree, Module } from "vuex";
import aspida from "@aspida/axios";
import api from "../../../api/$api";
import AxiosInstance from "../../lib/axios";

import { UpdateEmployee } from "../../types/axios";

type RootState = {
  version: string;
};

interface RestrictionState {
  change: UpdateEmployee;
}

const actions: ActionTree<RestrictionState, RootState> = {
  async updateEmployee({ commit }, change: UpdateEmployee) {
    try {
      const csrfToken = localStorage.getItem("CsrfAccessToken");
      console.log(change);
      const client = api(aspida(AxiosInstance));
      const headers = {
        "X-CSRF-TOKEN": csrfToken,
      };
      for (var i: number = 0; i < change.restrictions.post.length; i++) {
        const response = await client.v1.employees_restrictions.post({
          body: change.restrictions.post[i],
          config: { headers },
        });
        if (response.status != 201) {
          throw new Error("Failed to add new Restriction");
        }
      }
      for (var i: number = 0; i < change.qualifications.post.length; i++) {
        const response = await client.v1.employees_qualifications.post({
          body: change.qualifications.post[i],
          config: { headers },
        });
        if (response.status != 201) {
          throw new Error("Failed to add new Restriction");
        }
      }
      for (var i: number = 0; i < change.dependencies.post.length; i++) {
        const response = await client.v1.dependencies.post({
          body: change.dependencies.post[i],
          config: { headers },
        });
        if (response.status != 201) {
          throw new Error("Failed to add new Restriction");
        }
      }
    } catch (error) {
      console.log(error);
      console.error("Error adding new Restriction: ", error);
    }
  },
};

export const updateEmployeeModule: Module<RestrictionState, RootState> = {
  namespaced: true,

  actions,
};
