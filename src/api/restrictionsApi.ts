import { createApiClient, getAuthHeaders } from "./apiHelpers";
import {
  RestrictionsPostBody,
  PostEmployeeRestrictions,
  ChangeEmployeeRestrictions,
} from "../types/axios";

export const fetchRestrictions = async () => {
  const client = createApiClient();
  return await client.v1.restrictions.get();
};

export const addRestriction = async (newRestriction: RestrictionsPostBody) => {
  const client = createApiClient();
  const headers = getAuthHeaders();
  return await client.v1.restrictions.post({
    body: newRestriction,
    config: { headers },
  });
};

export const deleteRestriction = async (restrictionId: number) => {
  const client = createApiClient();
  const headers = getAuthHeaders();

  return await client.v1.restrictions._restrictionId(restrictionId).delete({
    config: { headers },
  });
};

export const addEmployeeRestriction = async (
  restriction: PostEmployeeRestrictions
) => {
  const client = createApiClient();
  const headers = getAuthHeaders();
  return await client.v1.employees_restrictions.post({
    body: restriction,
    config: { headers },
  });
};

export const deleteEmployeeRestriction = async (restrictionId: number) => {
  const client = createApiClient();
  const headers = getAuthHeaders();
  return await client.v1.employees_restrictions._erId(restrictionId).delete({
    config: { headers },
  });
};

export const updateEmployeeRestriction = async (
  restriction: ChangeEmployeeRestrictions
) => {
  const client = createApiClient();
  const headers = getAuthHeaders();
  const { value } = restriction;
  const newValue = { value };
  return await client.v1.employees_restrictions._erId(restriction.id).put({
    body: newValue,
    config: { headers },
  });
};
