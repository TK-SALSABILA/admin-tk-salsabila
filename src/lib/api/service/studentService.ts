import { CombinedStudentFormData, ParentFormData, StudentFormData } from "@/schema/studentSchema";
import apiClient from "../axios";
import {
  GetAllApiResponse,
  GetParentStudentByIdApiResponse,
  GetStudentByIdApiResponse,
  PaginationParams,
} from "../type";

export const studentService = {
  getStudentById: async (id: string) => {
    try {
      const response = await apiClient.get<GetStudentByIdApiResponse>(
        `/student/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getParentStudentByStudentId: async (id: string) => {
    try {
      const response = await apiClient.get<GetParentStudentByIdApiResponse>(
        `/parent/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getStudents: async (param: PaginationParams) => {
    try {
      const response = await apiClient.get<GetAllApiResponse>(
        "/student/record",
        {
          params: param,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createStudent: async (data: CombinedStudentFormData) => {
    try {
      const response = await apiClient.post("/student/create", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateStudent: async (id: string, data: StudentFormData) => {
    try {
      const response = await apiClient.patch(`/student/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateParrent: async (id: string, data: ParentFormData) => {
    try {
      const response = await apiClient.patch(`/parent/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
