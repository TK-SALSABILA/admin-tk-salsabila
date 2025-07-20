import { subjectsSchemaForm } from "@/schema/subjectsSchema";
import apiClient from "../axios";
import { PaginationParams } from "../type";

export const subjectService = {
  getSubjectById: async (id: string) => {
    try {
      const response = await apiClient.get(`/subject/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getSubjects: async (params: PaginationParams) => {
    try {
      const response = await apiClient.get("/subject/record", {
        params: params,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createSubject: async (data: subjectsSchemaForm) => {
    try {
      const response = await apiClient.post("/subject/create", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateSubject: async ({
    data,
    id,
  }: {
    data: subjectsSchemaForm;
    id: string;
  }) => {
    try {
      const response = await apiClient.patch(`/subject/update/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
