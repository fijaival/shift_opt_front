import type { DefineMethods } from "aspida";

type Employee = {
  id: number;
  first_name: string;
  last_name: string;
};

type postResBody = {
  id: number;
  message: string;
};

type restrictions = {
  id: number;
  value: number;
};

type newEmployee = {
  last_name: String;
  first_name: string;
  qualifications: number[];
  restrictions: restrictions[];
  dependencies: number[];
};

export type Methods = DefineMethods<{
  get: {
    resBody: Employee[];
  };
  post: {
    reqBody: newEmployee;
    resBody: postResBody;
  };
}>;
