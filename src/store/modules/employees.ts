import { ActionTree, MutationTree, GetterTree, Module } from "vuex";

import { EmployeePostBody } from "../../types/axios";

import { Employee, EmployeesType } from "../../types";

import { RootState, EmployeeState } from "../types/index";

import {
  fetchEmployees,
  addEmployee,
  deleteEmployee,
} from "../../api/employeesApi";

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
  async loadEmployees({ commit }) {
    await fetchEmployees()
      .then((response) => {
        commit("setEmployees", response.body);
      })
      .catch((error) => console.error("Error fetching employees: ", error));
  },

  async createEmployee(_, newEmployee: EmployeePostBody) {
    await addEmployee(newEmployee)
      .then()
      .catch((error) => console.error("Error adding new employee: ", error));
  },

  async removeEmployee({ commit }, employeeId: number) {
    await deleteEmployee(employeeId)
      .then(() => {
        commit("removeEmployee", employeeId);
      })
      .catch((error) => console.error("Error removing employee: ", error));
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
