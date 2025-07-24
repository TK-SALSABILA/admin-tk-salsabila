import { gradeSchemaForm } from "@/schema/gradeShema";
import apiClient from "../axios";
import { GetAllApiResponse, PaginationParams } from "../type";

export const gradeService = {
  async getGrades(params: PaginationParams) {
    try {
      const response = await apiClient.get<GetAllApiResponse>("/grade/record", {
        params: params,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createGrade(data: gradeSchemaForm) {
    try {
      const response = await apiClient.post("/grade/create", data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async updateGrade({ id, data }: { id: string; data: gradeSchemaForm }) {
    try {
      const response = await apiClient.patch(`/grade/update/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
