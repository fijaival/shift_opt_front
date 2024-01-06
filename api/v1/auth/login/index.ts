import type { DefineMethods } from "aspida";

type resType = {
  login: boolean;
};

export type Methods = DefineMethods<{
  post: {
    reqBody: {
      username: String;
      password: String;
    };

    resBody: resType;
  };
}>;
