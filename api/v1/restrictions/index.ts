import { Restriction, PostResponse } from "../../../src/types";
import type { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: {
    resBody: Restriction[];
  };
  post: {
    reqBody: Restriction;
    resBody: PostResponse;
  };
}>;
