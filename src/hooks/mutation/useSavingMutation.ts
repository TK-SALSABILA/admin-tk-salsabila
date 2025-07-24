import { savingService } from "@/lib/api/service/savingService";
import { SavingSchemaForm } from "@/schema/savingSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateSavingMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: SavingSchemaForm) => {
            return savingService.createSaving(data);
        },
        mutationKey: ["create-saving"],
        onSuccess: () => {
            toast.success("Simpanan berhasil ditambahkan");
            queryClient.invalidateQueries({ queryKey: ["savings"] });
        },
        onError: () => {
            toast.error("Gagal menambahkan simpanan");
        },
    })
};