import { ActionTree, Module } from "vuex";
import { UpdateEmployee } from "../../types/axios";

import { updateEmployeeName } from "../../api/employeesApi";
import {
  addEmployeeQualification,
  deleteEmployeeQualification,
} from "../../api/qualificationsApi";

import {
  addEmployeeRestriction,
  deleteEmployeeRestriction,
  updateEmployeeRestriction,
} from "../../api/restrictionsApi";

import { addDependency, deleteDependency } from "../../api/dependenciesApi";

type RootState = {
  version: string;
};

interface RestrictionState {
  change: UpdateEmployee;
}

const actions: ActionTree<RestrictionState, RootState> = {
  // ここの繰り返し呼び出しは必ず修正
  async updateEmployee(_, change: UpdateEmployee) {
    try {
      // POST
      try {
        for (const restriction of change.restrictions.post) {
          await addEmployeeRestriction(restriction);
        }
      } catch (error) {
        console.error("Failed to add new Restriction", error);
        throw error;
      }
      try {
        for (const qualification of change.qualifications.post) {
          await addEmployeeQualification(qualification);
        }
      } catch (error) {
        console.error("Failed to add new Qualification", error);
        throw error;
      }
      try {
        for (const dependency of change.dependencies.post) {
          await addDependency(dependency);
        }
      } catch (error) {
        console.error("Failed to add new Dependency", error);
        throw error;
      }

      // DELETE
      try {
        for (const restrictionId of change.restrictions.delete) {
          await deleteEmployeeRestriction(restrictionId);
        }
      } catch (error) {
        console.error("Failed to delete  EmployeeRestrictions", error);
        throw error;
      }

      try {
        for (const qualificationId of change.qualifications.delete) {
          await deleteEmployeeQualification(qualificationId);
        }
      } catch (error) {
        console.error("Failed to delete  EmployeeQualifications", error);
        throw error;
      }

      try {
        for (const dependencyId of change.dependencies.delete) {
          await deleteDependency(dependencyId);
        }
      } catch (error) {
        console.error("Failed to delete  dependency", error);
        throw error;
      }

      // PUT
      try {
        for (const restriction of change.restrictions.put) {
          await updateEmployeeRestriction(restriction);
        }
      } catch (error) {
        console.error("Failed to update Employee Restrictions", error);
        throw error;
      }

      try {
        for (const name of change.name.put) {
          await updateEmployeeName(name);
        }
      } catch (error) {
        console.error("Failed to update Employee name", error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      console.error("Error updating Employee: ", error);
    }
  },
};

export const updateEmployeeModule: Module<RestrictionState, RootState> = {
  namespaced: true,

  actions,
};
