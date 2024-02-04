import { createApiClient, getAuthHeaders } from "./apiHelpers";
import {
  QualificationsPostBody,
  PostEmployeeQualifications,
} from "../types/axios";

export const fetchQualifications = async () => {
  const client = createApiClient();
  return await client.v1.qualifications.get();
};

export const addQualification = async (
  newQualification: QualificationsPostBody
) => {
  const client = createApiClient();
  const headers = getAuthHeaders();
  return await client.v1.qualifications.post({
    body: newQualification,
    config: { headers: headers },
  });
};

export const deleteQualification = async (qualificationId: number) => {
  const client = createApiClient();
  const headers = getAuthHeaders();
  return await client.v1.qualifications
    ._qualificationId(qualificationId)
    .delete({
      config: { headers },
    });
};

export const addEmployeeQualification = async (
  qualification: PostEmployeeQualifications
) => {
  const client = createApiClient();
  const headers = getAuthHeaders();
  return await client.v1.employees_qualifications.post({
    body: qualification,
    config: { headers },
  });
};

export const deleteEmployeeQualification = async (qualificationId: number) => {
  const client = createApiClient();

  const headers = getAuthHeaders();
  return await client.v1.employees_qualifications
    ._eqId(qualificationId)
    .delete({
      config: { headers },
    });
};
