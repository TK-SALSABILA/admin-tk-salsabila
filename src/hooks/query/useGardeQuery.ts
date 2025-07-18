import { gradeService } from "@/lib/api/service/gradeService";
import { PaginationParams } from "@/lib/api/type";
import { useQuery } from "@tanstack/react-query";

export const useGetGradeQuery = (params: PaginationParams) => {
  return useQuery({
    queryKey: ["grade", params],
    queryFn: () => {
      return gradeService.getGrades(params);
    },
  });
};
