import { EmployeePostBody } from "./axios";

export interface Driver {
  id: number;
  first_name: string;
  last_name: string;
}

export type DriversType = Driver[];

export interface PostResponse {
  id: number;
  message: string;
}

export interface Dependencies {
  first_name: string;
  id?: number;
  last_name: string;
  required_employee_id: number;
}

export interface Qualification {
  name: string;
  id: number;
}

export interface Restriction {
  name: string;
  id: number;
  value: number;
}

export interface EmployeeRestriction {
  id?: number;
  name: string;
  restricton_id: number;
  value: number;
}

export interface EmployeeQualification {
  id?: number;
  name: string;
  qualification_id: number;
}

export interface Employee {
  dependencies: Dependencies[];
  first_name: string;
  id?: number;
  last_name: string;
  qualifications: EmployeeQualification[];
  restrictions: EmployeeRestriction[];
  [key: string]: any;
}

export type EmployeesType = Employee[];

export interface ChaseChange {
  dependencies?: Dependencies[];
  first_name?: string;
  id?: number;
  last_name?: string;
  qualifications?: Qualification[];
  restrictions?: Restriction[];
  [key: string]: any;
}
