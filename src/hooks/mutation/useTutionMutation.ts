import { tuitionService } from "@/lib/api/service/tuitionService";
import { TuitionSchemaForm } from "@/schema/tuitionSchema";
import { useMutation } from "@tanstack/react-query";

export const useUpdateTuitionMutation = () => {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: TuitionSchemaForm;
    }) => {
      await tuitionService.updateTuition({ id, data });
    },
  });
};
