import type { DefineMethods } from "aspida";
import { Employee, newEmployee, PostResponse } from "../../../src/types";

export type Methods = DefineMethods<{
  get: {
    resBody: Employee[];
  };
  post: {
    reqBody: newEmployee;
    resBody: PostResponse;
  };
}>;
