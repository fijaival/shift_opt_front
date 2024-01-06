import type { DefineMethods } from "aspida";

type Driver = {
  id: number;
  first_name: string;
  last_name: string;
};

type postResBody = {
  id: number;
  message: string;
};

type newDriver = {
  first_name: string;
  last_name: string;
};

export type Methods = DefineMethods<{
  get: {
    resBody: Driver[];
  };
  post: {
    reqBody: newDriver;
    resBody: postResBody;
  };
}>;
