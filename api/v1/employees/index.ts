import type { DefineMethods } from "aspida";
import { EmployeesType, PostResponse } from "../../../src/types";
import { EmployeePostBody } from "../../../src/types/axios";

export type Methods = DefineMethods<{
  get: {
    resBody: EmployeesType;
  };
  post: {
    reqBody: EmployeePostBody;
    resBody: PostResponse;
  };
}>;
