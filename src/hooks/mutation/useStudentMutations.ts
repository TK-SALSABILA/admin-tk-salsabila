import { studentService } from "@/lib/api/service/studentService";
import { CombinedStudentFormData, ParentFormData, StudentFormData } from "@/schema/studentSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateStudentMutations = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CombinedStudentFormData) =>
      studentService.createStudent(data),
    mutationKey: ["create-student"],
    onSuccess: () => {
      toast.success("Siswa berhasil ditambahkan");
      queryClient.invalidateQueries({ queryKey: ["student"] });      
    },
    onError: () => {
      toast.error("Gagal menambahkan siswa");
    },
  });
};

export const useUpdateStudentMutations = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }: { data: StudentFormData; id: string }) =>
      studentService.updateStudent(id, data),
    mutationKey: ["update-student"],
    onSuccess: (_, { id }) => {
      toast.success("Siswa berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: ["student", id] });
    },
    onError: () => {
      toast.error("Gagal memperbarui siswa");
    },
  });
};


export const useUpdateParrentMutation = () =>{
   const queryClient = useQueryClient();
   return useMutation({
     mutationFn: ({ data, id, studentId }: { data: ParentFormData; id: string ; studentId: string }) =>
       studentService.updateParrent(id, data),
     mutationKey: ["update-parrent"],
     onSuccess: (_, { studentId }) => {
       toast.success("Data orang tua berhasil diperbarui");
       queryClient.invalidateQueries({ queryKey: ["student", studentId] });
     },
     onError: () => {
       toast.error("Gagal memperbarui data orang tua");
     },
   });
}