import { studentService } from "@/lib/api/service/studentService";
import { GetStudentParam } from "@/lib/api/type";
import { useQuery } from "@tanstack/react-query";

export const useGetStudentsQuery = (param: GetStudentParam) => {
  return useQuery({
    queryKey: ["student", param], // supaya cache beda per param
    queryFn: () => studentService.getStudents(param), // ← harus pakai return!
  });
};
  
