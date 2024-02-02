import { ActionTree, Module } from "vuex";

import { createApiClient, getAuthHeaders } from "../../lib/apiHelpers";

import { UpdateEmployee } from "../../types/axios";

type RootState = {
  version: string;
};

interface RestrictionState {
  change: UpdateEmployee;
}

const actions: ActionTree<RestrictionState, RootState> = {
  // ここの繰り返し呼び出しは必ず修正
  async updateEmployee({ commit }, change: UpdateEmployee) {
    try {
      const client = createApiClient();
      for (const restriction of change.restrictions.post) {
        const headers = getAuthHeaders();
        const response = await client.v1.employees_restrictions.post({
          body: restriction,
          config: { headers },
        });
        if (response.status !== 201) {
          throw new Error("Failed to add new Restriction");
        }
      }

      for (const qualification of change.qualifications.post) {
        const headers = getAuthHeaders();
        const response = await client.v1.employees_qualifications.post({
          body: qualification,
          config: { headers },
        });
        if (response.status !== 201) {
          throw new Error("Failed to add new Qualification");
        }
      }

      for (const dependency of change.dependencies.post) {
        const headers = getAuthHeaders();
        const response = await client.v1.dependencies.post({
          body: dependency,
          config: { headers },
        });
        if (response.status !== 201) {
          throw new Error("リクエストが成功しませんでした。"); // エラーメッセージは状況に応じて適切に設定してください。
        }
      }
      for (const restrictionId of change.restrictions.delete) {
        const headers = getAuthHeaders();
        const response = await client.v1.employees_restrictions
          ._erId(restrictionId)
          .delete({
            config: { headers },
          });
        if (response.status !== 200) {
          throw new Error(
            "Failed to delete No." + restrictionId + "restrictions"
          );
        }
      }
      for (const qualificationId of change.qualifications.delete) {
        const headers = getAuthHeaders();
        const response = await client.v1.employees_qualifications
          ._eqId(qualificationId)
          .delete({
            config: { headers },
          });
        if (response.status !== 200) {
          throw new Error(
            "Failed to delete No." + qualificationId + "qualifications"
          );
        }
      }

      for (const dependencyId of change.dependencies.delete) {
        const headers = getAuthHeaders();
        const response = await client.v1.dependencies
          ._depId(dependencyId)
          .delete({
            config: { headers },
          });
        if (response.status !== 200) {
          throw new Error(
            "Failed to delete No." + dependencyId + "dependencies"
          );
        }
      }
      for (const restriction of change.restrictions.put) {
        const headers = getAuthHeaders();
        const { value } = restriction;
        const newValue = { value };
        const response = await client.v1.employees_restrictions
          ._erId(restriction.id)
          .put({
            body: newValue,
            config: { headers },
          });
        if (response.status !== 200) {
          throw new Error(
            "Failed to update No." + restriction.id + "restrictions"
          );
        }
      }
      for (const name of change.name.put) {
        const headers = getAuthHeaders();
        const { first_name, last_name } = name;
        const newName = { first_name, last_name };
        const response = await client.v1.employees._employeeId(name.id).put({
          body: newName,
          config: { headers },
        });
        if (response.status !== 200) {
          throw new Error("Failed to update No." + name.id + "Employee name");
        }
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
