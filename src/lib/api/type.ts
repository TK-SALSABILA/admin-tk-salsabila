export interface GetStudentParam {
  page: number;
  rpp: number;
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
