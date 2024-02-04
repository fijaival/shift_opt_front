import { VacationRecords } from "../../../../src/types/index";

import type { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: {
    resBody: VacationRecords;
  };
}>;
