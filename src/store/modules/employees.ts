import { ActionTree, MutationTree, GetterTree, Module } from "vuex";
import { createApiClient, getAuthHeaders } from "../../lib/apiHelpers";

import { Employee, EmployeesType } from "../../types";
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
      const client = createApiClient();
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
      const client = createApiClient();
      const headers = getAuthHeaders();
      console.log(newEmployee);
      const response = await client.v1.employees.post({
        body: newEmployee,
        config: { headers: headers },
      });
      if (response.status === 201) {
        // stateのEmployeeとpostするときに
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
      const client = createApiClient();
      const headers = getAuthHeaders();
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
