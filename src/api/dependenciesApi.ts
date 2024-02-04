import { createApiClient, getAuthHeaders } from "./apiHelpers";
import { PostEmployeeDependencies } from "../types/axios";

export const addDependency = async (dependency: PostEmployeeDependencies) => {
  const client = createApiClient();
  const headers = getAuthHeaders();
  return await client.v1.dependencies.post({
    body: dependency,
    config: { headers },
  });
};

export const deleteDependency = async (dependencyId: number) => {
  const client = createApiClient();
  const headers = getAuthHeaders();
  return await client.v1.dependencies._depId(dependencyId).delete({
    config: { headers },
  });
};
