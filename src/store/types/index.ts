import { EmployeesType } from "../../types";

export type RootState = {
  version: string;
};

export interface EmployeeState {
  employees: EmployeesType;
}
