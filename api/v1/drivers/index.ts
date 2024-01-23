import type { DefineMethods } from "aspida";
import { DriversType, PostResponse } from "../../../src/types";
import { DriverPostBody } from "../../../src/types/axios";

export type Methods = DefineMethods<{
  get: {
    resBody: DriversType;
  };
  post: {
    reqBody: DriverPostBody;
    resBody: PostResponse;
  };
}>;
