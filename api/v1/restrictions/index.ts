import { PostResponse } from "../../../src/types";
import {
  RestrictionsGetBody,
  RestrictionsPostBody,
} from "../../../src/types/axios";

import type { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: {
    resBody: RestrictionsGetBody[];
  };
  post: {
    reqBody: RestrictionsPostBody;
    resBody: PostResponse;
  };
}>;
