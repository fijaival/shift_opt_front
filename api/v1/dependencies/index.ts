import { PostResponse } from "../../../src/types";
import { PostEmployeeDependencies } from "../../../src/types/axios";

import type { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  post: {
    reqBody: PostEmployeeDependencies;
    resBody: PostResponse;
  };
}>;
