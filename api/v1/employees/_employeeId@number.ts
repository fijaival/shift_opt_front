import type { DefineMethods } from "aspida";
import type { EmployeeNamePostBody } from "../../../src/types/axios";

type responseBody = {
  message: string;
};

export type Methods = DefineMethods<{
  delete: {
    resBody: responseBody;
  };
  put: {
    reqBody: EmployeeNamePostBody;
  };
}>;
