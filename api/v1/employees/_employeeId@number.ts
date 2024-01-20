import type { DefineMethods } from "aspida";

type responseBody = {
  message: string;
};

export type Methods = DefineMethods<{
  delete: {
    resBody: responseBody;
  };
}>;
