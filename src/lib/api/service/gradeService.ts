import apiClient from "../axios";
import { PaginationParams } from "../type";

export const gradeService = {
  async getGrades(params: PaginationParams) {
    try {
      const response = await apiClient.get("/grade/record", {
        params: params,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
