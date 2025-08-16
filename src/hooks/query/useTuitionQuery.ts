import { tuitionService } from "@/lib/api/service/tuitionService";
import { TuitionParams } from "@/types/tuition";
import { useQuery } from "@tanstack/react-query";

export const useGetTuitionQuery = (params:TuitionParams) => {
    return useQuery({
        queryKey: ["tuition", params],
        queryFn: () => tuitionService.getAll(params),
    });
};