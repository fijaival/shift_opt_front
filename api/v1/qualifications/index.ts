import { Qualification, PostResponse } from "../../../src/types";
import type { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: {
    resBody: Qualification[];
  };
  post: {
    reqBody: Qualification;
    resBody: PostResponse;
  };
}>;
