import { Dependnecy, Qualification, Restriction } from ".";

export interface EmployeePostBody {
  dependencies: Dependnecy[];
  first_name: string;
  last_name: string;
  qualifications: Qualification[];
  restrictions: Restriction[];
}

export interface DriverPostBody {
  first_name: string;
  last_name: string;
}

export interface QualificationsPostBody {
  neme: string;
}
export interface QualificationGetBody {
  id: number;
  name: string;
}

export interface RestrictionsPostBody {
  neme: string;
}

export interface RestrictionsGetBody {
  id: number;
  name: string;
}
