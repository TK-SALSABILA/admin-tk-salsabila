import { savingService } from "@/lib/api/service/savingService";
import { PaginationParams } from "@/lib/api/type";
import { useQuery } from "@tanstack/react-query";

export const useGetSavingsQuery = (params:PaginationParams) => {
    return useQuery({
        queryKey: ["savings", params],
        queryFn: () => savingService.getAll(params),
    });
};