import { CombinedStudentFormData } from "@/schema/studentSchema";
import apiClient from "../axios";
import { GetAllApiResponse, PaginationParams } from "../type";

export const studentService = {
  getStudents: async (param: PaginationParams) => {
    try {
      const response = await apiClient.get<GetAllApiResponse>("/student/record",{
        params: param
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createStudent: async (data: CombinedStudentFormData) => {
    try {
      const response = await apiClient.post("/student/create", data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
