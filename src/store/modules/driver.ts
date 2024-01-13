import { ActionTree, MutationTree, GetterTree, Module } from "vuex";
import aspida from "@aspida/axios";
import api from "../../../api/$api";
import AxiosInstance from "../../lib/axios";

import { DriverPostResponse } from "../../types";

type RootState = {
  version: string;
};

interface Driver {
  id: number;
  first_name: string;
  last_name: string;
}

interface DriverState {
  drivers: Driver[];
}

const state: DriverState = {
  drivers: [],
};

const mutations: MutationTree<DriverState> = {
  setDrivers: (state, drivers) => (state.drivers = drivers),
  addDriver: (state, newDriver: Driver) => {
    state.drivers.push(newDriver);
  },
  removeDriver: (state, id) =>
    (state.drivers = state.drivers.filter((driver) => driver.id !== id)),
};

const actions: ActionTree<DriverState, RootState> = {
  async fetchDrivers({ commit }) {
    try {
      const client = api(aspida(AxiosInstance));
      const response = await client.v1.drivers.get();

      if (response.status === 200 && response.body) {
        commit("setDrivers", response.body);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error fetching drivers: ", error);
    }
  },
  async addDriver({ commit }, newDriver) {
    try {
      const csrfToken = localStorage.getItem("CsrfAccessToken");
      console.log(csrfToken);
      const client = api(aspida(AxiosInstance));
      const headers = {
        "X-CSRF-TOKEN": csrfToken,
      };
      const response = await client.v1.drivers.post({
        body: newDriver,
        config: { headers },
      });
      if (response.status === 201) {
        const newDriverResponse: DriverPostResponse = response.body;
        const addedDriver: Driver = {
          id: newDriverResponse.id,
          ...newDriver,
        };
        commit("addDriver", addedDriver);
      } else {
        throw new Error("Failed to add new driver");
      }
    } catch (error) {
      console.log(error);
      console.error("Error adding new driver: ", error);
    }
  },
  async deleteDriver({ commit }, driverId: number) {
    try {
      const csrfToken = localStorage.getItem("CsrfAccessToken");
      const client = api(aspida(AxiosInstance));
      const headers = {
        "X-CSRF-TOKEN": csrfToken,
      };
      const response = await client.v1.drivers._driverId(driverId).delete({
        config: { headers },
      });
      if (response.status === 200) {
        commit("removeDriver", driverId);
      } else {
        throw new Error("Failed to delete driver");
      }
    } catch (error) {
      console.error("Error deleting driver: ", error);
    }
  },
};

const getters: GetterTree<DriverState, RootState> = {
  getDrivers: (state: DriverState) => {
    return state.drivers;
  },
};

export const DriverModule: Module<DriverState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
