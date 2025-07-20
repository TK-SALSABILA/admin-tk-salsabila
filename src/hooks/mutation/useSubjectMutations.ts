import { subjectService } from "@/lib/api/service/subjectService";
import { subjectsSchemaForm } from "@/schema/subjectsSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateSubjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: subjectsSchemaForm) => {
      return subjectService.createSubject(data);
    },
    mutationKey: ["create-subject"],
    onSuccess: () => {
      toast.success("Mata pelajaran berhasil ditambahkan");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
    onError: () => {
      toast.error("Gagal menambahkan mata pelajaran");
    },
  });
};
export const useUpdateSubjectMutation = () => {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }: { data: subjectsSchemaForm; id: string }) => {
      return subjectService.updateSubject({ data, id });
    },
    mutationKey: ["update-subject"],
    onSuccess: () => {
      toast.success("Mata pelajaran berhasil diupdate");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
    onError: () => {
      toast.error("Gagal menambahkan Mata pelajaran");
    },
  });
};
export const useDeleteSubject = () => {};
