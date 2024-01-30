import { PostResponse } from "../../../src/types";
import { PostEmployeeQualifications } from "../../../src/types/axios";

import type { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  post: {
    reqBody: PostEmployeeQualifications;
    resBody: PostResponse;
  };
}>;
