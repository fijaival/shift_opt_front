import { Dependencies, EmployeeQualification, EmployeeRestriction } from ".";

export interface EmployeePostBody {
  dependencies: Dependencies[];
  first_name: string;
  last_name: string;
  qualifications: EmployeeQualification[];
  restrictions: EmployeeRestriction[];
  [key: string]: any;
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
