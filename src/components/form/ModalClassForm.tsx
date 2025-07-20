"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReusableModal from "../shared/ReusableModal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { gradeSchema, gradeSchemaForm } from "@/schema/gradeShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateGradeMutation } from "@/hooks/mutation/useGradeMutations";
import ConfirmModal from "../modal/ModalConfirmation";
import { Trash, Trash2 } from "lucide-react";

interface ModalClassFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mode: "create" | "edit";
  initialData?: gradeSchemaForm & { id: string }; // Pastikan ada id untuk edit/delete
  onSuccess?: () => void;
}

const ModalClassForm = ({
  open,
  setOpen,
  mode,
  initialData,
  onSuccess,
}: ModalClassFormProps) => {
  const { mutateAsync: createMutation } = useCreateGradeMutation();

  const form = useForm<gradeSchemaForm>({
    resolver: zodResolver(gradeSchema),
    defaultValues: {
      gradeLevel: "",
    },
  });

  const { control, handleSubmit, reset } = form;

  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      reset(initialData);
    }
  }, [mode, initialData, reset]);

  const handleSubmitForm = async (data: gradeSchemaForm) => {
    if (mode === "create") {
      await createMutation(data);
    } else if (mode === "edit" && initialData?.id) {
      // await updateMutation({ ...data, id: initialData.id });
    }

    reset();
    setOpen(false);
    onSuccess?.();
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    // await deleteMutation({ id: initialData.id });
    setOpen(false);
    onSuccess?.();
  };

  return (
    <>
      <ReusableModal
        open={open}
        onOpenChange={setOpen}
        title={mode === "create" ? "Tambah Kelas" : "Edit Kelas"}
        description={
          mode === "create" ? "Buat kelas baru." : "Perbarui data kelas."
        }
      >
        <Form {...form}>
          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
            <FormField
              control={control}
              name="gradeLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenjang Kelas</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Contoh: TK A" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center pt-4">
              {mode === "edit" && (
                <ConfirmModal
                  open={confirmDelete}
                  onOpenChange={setConfirmDelete}
                  title="Anda akan menghapus kelas"
                  description="Semua siswa yang didaftarkan pada kelas ini perlu untuk didaftarkan ke dalam kelas lainnya. Apakah Anda yakin?"
                  confirmText="Ya"
                  cancelText="Tidak"
                  confirmVariant="default"
                  onConfirm={handleDelete}
                  trigger={
                    <Button type="button" variant="destructive">
                      <Trash2 />
                      Hapus
                    </Button>
                  }
                />
              )}

              <div className="flex gap-2 ml-auto">
                <Button
                  type="button"
                  variant="outline"
                  className="border-yellow-300"
                  onClick={() => setOpen(false)}
                >
                  Batal
                </Button>
                <Button type="submit">Simpan</Button>
              </div>
            </div>
          </form>
        </Form>
      </ReusableModal>
    </>
  );
};

export default ModalClassForm;
