import { createApiClient, getAuthHeaders } from "./apiHelpers";

import { PostVacationRecords } from "../types/axios";

export const fetchRequests = async (year: number, month: number) => {
  const client = createApiClient();
  return await client.v1.shifts_requests._year(year)._month(month).get();
};

export const addRequests = async (requests: PostVacationRecords) => {
  const client = createApiClient();
  const headers = getAuthHeaders();
  return await client.v1.shifts_requests.post({
    body: requests,
    config: { headers },
  });
};

export const deleteRequest = async (requestId: number) => {
  const client = createApiClient();
  const headers = getAuthHeaders();

  return await client.v1.shifts_requests._requestId(requestId).delete({
    config: { headers },
  });
};
