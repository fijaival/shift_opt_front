import { createApiClient, getAuthHeaders } from "./apiHelpers";
import { Employee } from "../types/index";
import { UpdateName } from "../types/axios";

export const fetchEmployees = async () => {
  const client = createApiClient();
  return await client.v1.employees.get();
};

export const addEmployee = async (newEmployee: Employee) => {
  const client = createApiClient();
  const headers = getAuthHeaders();
  return await client.v1.employees.post({
    body: newEmployee,
    config: { headers: headers },
  });
};

export const deleteEmployee = async (employeeId: number) => {
  const client = createApiClient();
  const headers = getAuthHeaders();

  return await client.v1.employees._employeeId(employeeId).delete({
    config: { headers },
  });
};

export const updateEmployeeName = async (name: UpdateName) => {
  const client = createApiClient();
  const headers = getAuthHeaders();
  const { first_name, last_name } = name;
  const newName = { first_name, last_name };
  return await client.v1.employees._employeeId(name.id).put({
    body: newName,
    config: { headers },
  });
};
