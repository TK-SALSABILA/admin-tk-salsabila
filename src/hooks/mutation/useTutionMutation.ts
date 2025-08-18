import { tuitionService } from "@/lib/api/service/tuitionService";
import { TuitionSchemaForm } from "@/schema/tuitionSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTuitionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TuitionSchemaForm) => {
      await tuitionService.createTuition(data);
    },
    mutationKey: ["createTuition"],
    onSuccess: () => {
      toast.success("Pembayaran SPP berhasil dibuat");
      queryClient.invalidateQueries({ queryKey: ["tuition"] });
    },
    onError: () => {
      toast.error("Gagal membuat pembayaran SPP");
    },
  });
};

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
