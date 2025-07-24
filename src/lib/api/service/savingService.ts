import { SavingSchemaForm } from "@/schema/savingSchema";
import apiClient from "../axios";
import { PaginationParams } from "../type";

export const savingService = {
  async getAll(params: PaginationParams) {
    try {
      const response = await apiClient.get("/saving/record", {
        params: params,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createSaving(data: SavingSchemaForm) {
    try {
      const response = await apiClient.post("/saving/create", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
