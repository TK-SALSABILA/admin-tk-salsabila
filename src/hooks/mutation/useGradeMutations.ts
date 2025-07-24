import { gradeService } from "@/lib/api/service/gradeService";
import { gradeSchemaForm } from "@/schema/gradeShema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateGradeMutation = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data: gradeSchemaForm) => {
      return gradeService.createGrade(data);
    },
    mutationKey: ["create-grade"],
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["grade"] });
      toast.success("Kelas berhasil ditambahkan");
    },
    onError: () => {
      toast.error("Gagal menambahkan kelas");
    },
  });
};
export const useUpdateGradeMutation = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: gradeSchemaForm }) => {
      return gradeService.updateGrade({ id, data });
    },
    mutationKey: ["update-grade"],
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["grade"] });
      toast.success("Kelas berhasil diupdate");
    },
    onError: () => {
      toast.error("Gagal update kelas");
    },
  });
};
export const useDeleteGradeMutation = () => {};
