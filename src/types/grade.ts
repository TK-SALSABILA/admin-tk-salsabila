export interface ClassData {
  id: string;
  gradeLevel: string;
}


export interface GetAllGradesApiResponse {
  meta: {
    page: number;
    recordsPerPage: number;
    totalRecords: number;
    totalPages: number;
  };
  data: ClassData[];
}