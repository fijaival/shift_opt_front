import type { DefineMethods } from "aspida";
import type { PutEmployeeRestrictions } from "../../../src/types/axios";

type responseBody = {
  message: string;
};

export type Methods = DefineMethods<{
  delete: {
    resBody: responseBody;
  };
  put: {
    reqBody: PutEmployeeRestrictions;
  };
}>;
