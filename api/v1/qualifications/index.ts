import { PostResponse } from "../../../src/types";
import {
  QualificationsPostBody,
  QualificationGetBody,
} from "../../../src/types/axios";

import type { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: {
    resBody: QualificationGetBody[];
  };
  post: {
    reqBody: QualificationsPostBody;
    resBody: PostResponse;
  };
}>;
