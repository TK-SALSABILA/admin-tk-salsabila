import { SavingSchemaForm } from "@/schema/savingSchema";
import apiClient from "../axios";
import { PaginationParams } from "../type";
import { TuitionParams } from "@/types/tuition";
import { TuitionSchemaForm } from "@/schema/tuitionSchema";

export const tuitionService = {
  async getAll(params: TuitionParams) {
    try {
      const response = await apiClient.get(`/tuition/record/${params.classId}/${params.month}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createTuition(data: SavingSchemaForm) {
    try {
      const response = await apiClient.post("/tuition/create", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async updateTuition({id,data}: {id: string; data: TuitionSchemaForm}) {
    try {
      const response = await apiClient.post(`/tuition/update/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
