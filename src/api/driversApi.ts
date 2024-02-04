import { createApiClient, getAuthHeaders } from "./apiHelpers";
import { Driver } from "../types/index";
import { UpdateName } from "../types/axios";

export const fetchDrivers = async () => {
  const client = createApiClient();
  return await client.v1.drivers.get();
};

export const addDriver = async (newDriver: Driver) => {
  const client = createApiClient();
  const headers = getAuthHeaders();
  return await client.v1.drivers.post({
    body: newDriver,
    config: { headers: headers },
  });
};

export const deleteDriver = async (driverId: number) => {
  const client = createApiClient();
  const headers = getAuthHeaders();
  return await client.v1.drivers._driverId(driverId).delete({
    config: { headers },
  });
};

export const updateDriverName = async (name: UpdateName) => {
  const client = createApiClient();
  const headers = getAuthHeaders();
  const { first_name, last_name } = name;
  const newName = { first_name, last_name };
  return await client.v1.drivers._driverId(name.id).put({
    body: newName,
    config: { headers },
  });
};
