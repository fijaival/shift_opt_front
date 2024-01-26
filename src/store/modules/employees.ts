import { ActionTree, MutationTree, GetterTree, Module } from "vuex";
import aspida from "@aspida/axios";
import api from "../../../api/$api";
import AxiosInstance from "../../lib/axios";

import { PostResponse, Employee, EmployeesType } from "../../types";
import { EmployeePostBody } from "../../types/axios";

type RootState = {
  version: string;
};

interface EmployeeState {
  employees: EmployeesType;
}

const state: EmployeeState = {
  employees: [],
};

const mutations: MutationTree<EmployeeState> = {
  setEmployees: (state, employees: EmployeesType) =>
    (state.employees = employees),
  addEmployee: (state, newEmployee: Employee) => {
    state.employees.push(newEmployee);
  },
  removeEmployee: (state, id: number) =>
    (state.employees = state.employees.filter(
      (employee) => employee.id !== id
    )),
};

const actions: ActionTree<EmployeeState, RootState> = {
  async fetchEmployees({ commit }) {
    try {
      const client = api(aspida(AxiosInstance));
      const response = await client.v1.employees.get();

      if (response.status === 200 && response.body) {
        commit("setEmployees", response.body);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error fetching employees: ", error);
    }
  },

  async addEmployee({ commit }, newEmployee: EmployeePostBody) {
    try {
      const csrfToken = localStorage.getItem("CsrfAccessToken");
      console.log(csrfToken);
      const client = api(aspida(AxiosInstance));
      const headers = {
        "X-CSRF-TOKEN": csrfToken,
      };
      const response = await client.v1.employees.post({
        body: newEmployee,
        config: { headers },
      });
      if (response.status === 201) {
        // stateのEmployeeとpostするときに
        const newEmployeeResponse: PostResponse = response.body;
        const addedEmployee: Employee = {
          id: newEmployeeResponse.id,
          ...newEmployee,
        };
        commit("addEmployee", addedEmployee);
      } else {
        throw new Error("Failed to add new employee");
      }
    } catch (error) {
      console.log(error);
      console.error("Error adding new employee: ", error);
    }
  },
  async deleteEmployee({ commit }, employeeId: number) {
    try {
      const csrfToken = localStorage.getItem("CsrfAccessToken");
      const client = api(aspida(AxiosInstance));
      const headers = {
        "X-CSRF-TOKEN": csrfToken,
      };
      const response = await client.v1.employees
        ._employeeId(employeeId)
        .delete({
          config: { headers },
        });
      if (response.status === 200) {
        commit("removeEmployee", employeeId);
      } else {
        throw new Error("Failed to delete employee");
      }
    } catch (error) {
      console.error("Error deleting employee: ", error);
    }
  },
};

const getters: GetterTree<EmployeeState, RootState> = {
  getEmployees: (state: EmployeeState) => {
    return state.employees;
  },
};

export const EmployeeModule: Module<EmployeeState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
