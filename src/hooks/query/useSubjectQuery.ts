import { subjectService } from "@/lib/api/service/subjectService";
import { PaginationParams } from "@/lib/api/type";
import { useQuery } from "@tanstack/react-query";

export const useGetSubjects = (params: PaginationParams) => {
  return useQuery({
    queryKey: ["subjects", params],
    queryFn: () => subjectService.getSubjects(params),
  });
};

export const useGetSubjectById = (id:string)=>{
    return useQuery({
        queryKey: ["subject", id],
        queryFn: () => subjectService.getSubjectById(id),
    })
}
