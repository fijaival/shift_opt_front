import { DriverPostBody } from "../../../src/types/axios";
import type { DefineMethods } from "aspida";

type responseBody = {
  message: string;
};

export type Methods = DefineMethods<{
  delete: {
    resBody: responseBody;
  };
  put: {
    reqBody: DriverPostBody;
  };
}>;
