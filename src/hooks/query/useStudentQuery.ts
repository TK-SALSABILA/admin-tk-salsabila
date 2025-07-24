import { studentService } from "@/lib/api/service/studentService";
import { PaginationParams } from "@/lib/api/type";
import { useQuery } from "@tanstack/react-query";

export const useGetStudentsQuery = (param: PaginationParams) => {
  return useQuery({
    queryKey: ["student", param], 
    queryFn: () => studentService.getStudents(param), 
  });
};

export const useGetParentStudentByStudentIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["parent", id],
    queryFn: () => studentService.getParentStudentByStudentId(id),
  });
}

export const useGetStudentByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["student", id],
    queryFn: () => studentService.getStudentById(id),
  });
};
  
