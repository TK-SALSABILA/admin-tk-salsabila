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
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateGradeMutation } from "@/hooks/mutation/useGradeMutations";
import ConfirmModal from "../modal/ModalConfirmation";
import { Trash2 } from "lucide-react";
import { subjectsSchema, subjectsSchemaForm } from "@/schema/subjectsSchema";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import GradeSelect from "./GradeSelect";
import { Textarea } from "../ui/textarea";
import {
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
} from "@/hooks/mutation/useSubjectMutations";

interface ModalSubjectsFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mode: "create" | "edit";
  initialData?: subjectsSchemaForm & { id: string };
  onSuccess?: () => void;
}

const ModalSubjectsForm = ({
  open,
  setOpen,
  mode,
  initialData,
  onSuccess,
}: ModalSubjectsFormProps) => {
  const { mutateAsync: createMutation, isPending: isPendingCreate } =
    useCreateSubjectMutation();

  const { mutateAsync: updateMutation, isPending: updatePending } =
    useUpdateSubjectMutation();

  const form = useForm<subjectsSchemaForm>({
    mode: "onChange",
    resolver: zodResolver(subjectsSchema),
    defaultValues: {
      subjectName: "",
      subjectCode: "",
      isMandatory: true,
      gradeLevel: "",
      description: "",
    },
  });

  const { control, handleSubmit, reset } = form;

  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      reset(initialData);
    }
  }, [mode, initialData, reset]);

  const handleSubmitForm = async (data: subjectsSchemaForm) => {
    console.log(initialData)
    if (mode === "create") {
      await createMutation(data);
    } else if (mode === "edit" && initialData?.id) {
      await updateMutation({ data: data, id: initialData.id });
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

  const handleGradeChange = (gradeLevel: string) => {
    form.setValue("gradeLevel", gradeLevel);
  };

  return (
    <>
      <ReusableModal
        open={open}
        onOpenChange={setOpen}
        title={mode === "create" ? "Tambah Mata Pelajaran" : "Edit Mata Pelajaran"}
        className="min-w-[700px]"
        description={
          mode === "create"
            ? "Buat pelajaran baru."
            : "Perbarui mata pelajaran."
        }
      >
        <Form {...form}>
          <form onSubmit={handleSubmit(handleSubmitForm)} className="">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="subjectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Mata Pelajaran</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Masukan nama mata pelajaran"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="subjectCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kode Mata Pelajaran</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Masukan kode mata pelajaran"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="isMandatory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sifat Mata Pelajaran</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) =>
                          field.onChange(value === "true")
                        }
                        defaultValue={field.value ? "true" : "false"}
                        className="flex gap-6"
                      >
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal">Wajib</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Tambahan
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="gradeLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenjang Kelas</FormLabel>
                    <FormControl>
                      <GradeSelect
                        withLevel={true}
                        value={field.value}
                        onChange={(id, level) => {
                          field.onChange(level);
                          handleGradeChange(level || "");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Masukan deskripsi mata pelajaran"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                <Button type="submit" disabled={isPendingCreate}>
                  Simpan
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </ReusableModal>
    </>
  );
};

export default ModalSubjectsForm;
