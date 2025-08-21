import { Parent, Student } from "@/types/student";



export interface PaginationParams {
  page: number;
  rpp: number;
  q?: string;
}

export interface GetAllApiResponse {
  meta: {
    page: number;
    recordsPerPage: number;
    totalRecords: number;
    totalPages: number;
  };
  data: any;
}

export interface GetStudentByIdApiResponse {
  meta: {
    page: number;
    recordsPerPage: number;
    totalRecords: number;
    totalPages: number;
  };
  data: Student;
}
export interface GetParentStudentByIdApiResponse {
  meta: {
    page: number;
    recordsPerPage: number;
    totalRecords: number;
    totalPages: number;
  };
  data: Parent;
}
