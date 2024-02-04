import {
  EmployeesType,
  Restriction,
  Qualification,
  DriversType,
  VacationRecords,
} from "../../types";
import { UpdateEmployee } from "../../types/axios";

export type RootState = {
  version: string;
};

export interface Login {
  username: string;
  password: string;
}
export interface UserState {
  user: string;
  msg: string;
}

export interface EmployeeState {
  employees: EmployeesType;
}

export interface RestrictionState {
  restrictions: Restriction[];
}

export interface QualificationState {
  qualifications: Qualification[];
}

export interface UodateState {
  change: UpdateEmployee;
}

export interface DriverState {
  drivers: DriversType;
}

export interface RequestState {
  requests: VacationRecords;
}
