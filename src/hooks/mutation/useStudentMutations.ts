import { studentService } from "@/lib/api/service/studentService";
import { CombinedStudentFormData } from "@/schema/studentSchema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateStudentMutations = () => {
  return useMutation({
    mutationFn: (data: CombinedStudentFormData) =>
      studentService.createStudent(data),
    mutationKey: ["create-student"],
    onSuccess: () => {
      toast.success("Siswa berhasil ditambahkan");
    },
    onError: () => {
      toast.error("Gagal menambahkan siswa");
    },
  });
};
