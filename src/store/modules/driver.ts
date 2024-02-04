import { ActionTree, MutationTree, GetterTree, Module } from "vuex";
import { Driver, DriversType, PostResponse } from "../../types";
import { DriverPostBody } from "@/types/axios";

import { RootState, DriverState } from "../types/index";

import {
  fetchDrivers,
  addDriver,
  deleteDriver,
  updateDriverName,
} from "../../api/driversApi";

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
  async loadDrivers({ commit }) {
    await fetchDrivers()
      .then((response) => {
        commit("setDrivers", response.body);
      })
      .catch((error) => console.error("Error fetching drivers: ", error));
  },

  async createDriver({ commit }, newDriver: DriverPostBody) {
    await addDriver(newDriver)
      .then((response) => {
        const newDriverResponse: PostResponse = response.body;
        const addedDriver: Driver = {
          id: newDriverResponse.id,
          ...newDriver,
        };
        commit("addDriver", addedDriver);
      })
      .catch((error) => console.error("Error adding new driver: ", error));
  },

  async removeDriver({ commit }, driverId: number) {
    await deleteDriver(driverId)
      .then(() => {
        commit("removeDriver", driverId);
      })
      .catch((error) => console.error("Error removing driver: ", error));
  },

  async updateDriver(_, name) {
    await updateDriverName(name).catch((error) => {
      console.error("Error updating driver: ", error);
    });
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
