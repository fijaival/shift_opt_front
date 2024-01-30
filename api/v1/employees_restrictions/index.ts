import { PostResponse } from "../../../src/types";
import { PostEmployeeRestrictions } from "../../../src/types/axios";

import type { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  post: {
    reqBody: PostEmployeeRestrictions;
    resBody: PostResponse;
  };
}>;
