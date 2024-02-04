import { PostVacationRecords } from "../../../src/types/axios";

type responseBody = {
  message: string;
};

import type { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  post: {
    reqBody: PostVacationRecords;
    resBody: responseBody;
  };
}>;
