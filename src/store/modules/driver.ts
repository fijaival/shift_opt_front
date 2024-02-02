import { ActionTree, MutationTree, GetterTree, Module } from "vuex";

import { createApiClient, getAuthHeaders } from "../../lib/apiHelpers";

import { Driver, DriversType, PostResponse } from "../../types";
import { DriverPostBody } from "@/types/axios";

type RootState = {
  version: string;
};

interface DriverState {
  drivers: DriversType;
}

const state: DriverState = {
  drivers: [],
};

const mutations: MutationTree<DriverState> = {
  setDrivers: (state, drivers: DriversType) => (state.drivers = drivers),
  addDriver: (state, newDriver: Driver) => {
    state.drivers.push(newDriver);
  },
  removeDriver: (state, id) =>
    (state.drivers = state.drivers.filter((driver) => driver.id !== id)),
};

const actions: ActionTree<DriverState, RootState> = {
  async fetchDrivers({ commit }) {
    try {
      const client = createApiClient();
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
  async addDriver({ commit }, newDriver: DriverPostBody) {
    try {
      const client = createApiClient();
      const headers = getAuthHeaders();
      const response = await client.v1.drivers.post({
        body: newDriver,
        config: { headers },
      });
      if (response.status === 201) {
        const newDriverResponse: PostResponse = response.body;
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
      const client = createApiClient();
      const headers = getAuthHeaders();
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
  async updateDriver(_, newDriver) {
    try {
      const client = createApiClient();
      const headers = getAuthHeaders();
      const { first_name, last_name } = newDriver;
      const newName = { first_name, last_name };
      const response = await client.v1.drivers._driverId(newDriver.id).put({
        body: newName,
        config: { headers },
      });
      if (response.status !== 200) {
        throw new Error("Failed to update No." + newDriver.id + "driver");
      }
    } catch (error) {
      console.log(error);
      console.error("Error updating Employee: ", error);
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
