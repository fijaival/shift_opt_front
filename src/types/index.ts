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

export interface Dependnecy {
  first_name: string;
  id: number;
  last_name: string;
}

export interface Qualification {
  id: number;
  name: string;
}

export interface Restriction {
  id: number;
  name: string;
  value: number;
}

export interface Employee {
  dependencies: Dependnecy[];
  first_name: string;
  id: number;
  last_name: string;
  qualifications: Qualification[];
  restrictions: Restriction[];
}

export type EmployeesType = Employee[];
