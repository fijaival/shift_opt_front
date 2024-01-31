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
export interface EmployeeNamePostBody {
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
export interface PostEmployeeDependencies {
  dependent_employee_id: number;
  required_employee_id: number;
  first_name: string;
  last_name: string;
}

export interface UpdateName {
  id: number;
  first_name: string;
  last_name: string;
}

export interface PostEmployeeQualifications {
  employee_id: number;
  qualification_id: number;
  name: string;
}
export interface PostEmployeeRestrictions {
  employee_id: number;
  restriction_id: number;
  value: number;
  name: string;
}

export interface PutEmployeeRestrictions {
  value: number;
}

export interface ChangeEmployeeRestrictions {
  id: number;
  value: number;
}
export interface UpdateEmployee {
  dependencies: {
    post: PostEmployeeDependencies[];
    delete: number[];
  };
  name: { put: UpdateName[] };
  qualifications: { post: PostEmployeeQualifications[]; delete: number[] };
  restrictions: {
    post: PostEmployeeRestrictions[];
    delete: number[];
    put: ChangeEmployeeRestrictions[];
  };
  [key: string]: any;
}

export type Value = EmployeeQualification | EmployeeRestriction | Dependencies;
