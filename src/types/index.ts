export interface PostResponse {
  id: number;
  message: string;
}

export interface Driver {
  id: number;
  firstName: string;
  lastName: string;
}

export interface DriverName {
  first_name: string;
  last_name: string;
}

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
}
export interface Dependency {
  first_name: string;
  id: number;
  last_name: string;
}

export interface Qualification {
  id?: number;
  name: string;
}

export interface Restriction {
  id: number;
  name?: string;
  value?: number;
}

export interface Employee {
  dependencies: Dependency[] | [];
  first_name: string;
  id: number;
  last_name: string;
  qualifications: Qualification[] | [];
  restrictions: Restriction[] | [];
}

export interface newEmployee {
  last_name: String;
  first_name: string;
  qualifications: number[];
  restrictions: Restriction[];
  dependencies: number[];
}
