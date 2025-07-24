// app/components/form/ModalSavingForm.tsx
"use client";

import React, { useState } from "react";
import ReusableModal from "../shared/ReusableModal";
import ButtonOpenModal from "../shared/ButtonOpenModal";
import StudentSearchSelect from "./StudentSearchSelect";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import savingSchema, { SavingSchemaForm } from "@/schema/savingSchema";
import { Student } from "@/types/student";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { NumericFormat } from "react-number-format";
import { useCreateSavingMutation } from "@/hooks/mutation/useSavingMutation";
import { Textarea } from "../ui/textarea";

interface ModalSavingFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: () => void;
}

const ModalSavingForm = ({
  open,
  setOpen,
  onSuccess,
}: ModalSavingFormProps) => {
  const { mutateAsync, isPending } = useCreateSavingMutation();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [reviewMode, setReviewMode] = useState(false);

  const form = useForm<SavingSchemaForm>({
    resolver: zodResolver(savingSchema),
    defaultValues: {
      studentId: "",
      paymentType: "Tabungan",
      transactionType: "Uang Masuk",
      amount: 0,
      description: "",
      transactionDate: new Date().toISOString(),
    },
  });

  const {
    setValue,
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;
  const transactionDate = watch("transactionDate");
  const amount = watch("amount");
  const transactionType = watch("transactionType");

  const handleSelectStudent = (student: Student) => {
    console.log("Selected student:", student);
    setValue("studentId", student.id || "");
    setSelectedStudent(student);
  };

  // Form submission untuk review
  const onFormSubmit = handleSubmit((data) => {
    console.log("Form data:", data);
    if (!selectedStudent) {
      console.error("No student selected");
      return;
    }
    setReviewMode(true);
  });

  // Final submission
  const onFinalSubmit = async () => {
    const formData = form.getValues();

    console.log("Final submission data:", {
      ...formData,
      transactionDate: formatDateForBackend(formData.transactionDate),
    });

    try {
      await mutateAsync({
        ...formData,
        transactionDate: formatDateForBackend(formData.transactionDate),
      });
      reset();
      setSelectedStudent(null);
      setReviewMode(false);
      setOpen(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const formatDateForBackend = (dateString: string): string => {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error("Invalid date:", dateString);
      return "";
    }

    const pad = (num: number) => num.toString().padStart(2, "0");
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());

    return `${year}-${month}-${day} 00:00:00`;
  };

  const onBack = () => {
    setReviewMode(false);
  };

  const handleModalClose = () => {
    setOpen(false);
    setReviewMode(false);
    setSelectedStudent(null);
    reset();
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  return (
    <ReusableModal
      open={open}
      className="min-w-[750px]"
      onOpenChange={setOpen}
      title={
        reviewMode
          ? "Input Pembayaran Tabungan"
          : "Input Pembayaran Tabungan"
      }
      description={
        reviewMode
          ? "Cek kembali detail pembayaran yang telah dimasukan"
          : "Masukan detail pembayaran tabungan"
      }
      trigger={
        <ButtonOpenModal
          text="Input Pembayaran Tabungan"
          onClick={handleOpenModal}
        />
      }
    >
      <FormProvider {...form}>
        {!reviewMode ? (
          <form onSubmit={onFormSubmit} className="space-y-6">
            {/* Student Selection Row */}
            <div className="grid grid-cols-12 gap-4 items-end">
              <div className="col-span-6">
                <StudentSearchSelect onSelect={handleSelectStudent} />
                {errors.studentId && (
                  <p className="text-red-500 text-xs mt-1">
                    Siswa harus dipilih
                  </p>
                )}
              </div>
              <div className="col-span-3">
                <Label className="text-sm font-medium">Kelas</Label>
                <Input
                  disabled
                  value={selectedStudent ? "TK B" : ""}
                  placeholder="-"
                  className="bg-gray-50"
                />
              </div>
              <div className="col-span-3">
                <Label className="text-sm font-medium">NIS</Label>
                <Input
                  disabled
                  value={selectedStudent?.nik || ""}
                  placeholder="-"
                  className="bg-gray-50"
                />
              </div>
            </div>

            {/* Transaction Type and Payment Type Row */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Jenis Transaksi
                </Label>
                <RadioGroup
                  defaultValue="Uang Masuk"
                  onValueChange={(val) => {
                    console.log("Transaction type changed:", val);
                    setValue("transactionType", val);
                  }}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Uang Masuk" id="uang-masuk" />
                    <Label htmlFor="uang-masuk" className="font-normal">
                      Uang Masuk
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Pindah Dana" id="pindah-dana" />
                    <Label htmlFor="pindah-dana" className="font-normal">
                      Pindah Dana
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-sm font-medium">Jenis Pembayaran</Label>
                <Input disabled value="Tabungan" className="bg-gray-50 mt-2" />
              </div>
            </div>

            {/* Amount and Date Row */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium">Jumlah Pembayaran</Label>
                <NumericFormat
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="Rp "
                  customInput={Input}
                  className="mt-2"
                  placeholder="0"
                  onValueChange={({ floatValue }) => {
                    console.log("Amount changed:", floatValue);
                    setValue("amount", floatValue || 0);
                  }}
                />
                {errors.amount && (
                  <p className="text-red-500 text-xs mt-1">
                    Jumlah harus diisi
                  </p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium">
                  Tanggal Pembayaran
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-2",
                        !transactionDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {transactionDate
                        ? format(new Date(transactionDate), "PPP", {
                            locale: id,
                          })
                        : "Pilih tanggal"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={new Date(transactionDate)}
                      onSelect={(date) => {
                        if (date) {
                          console.log("Date changed:", date);
                          setValue("transactionDate", date.toISOString());
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Description */}
            <div>
              <Label className="text-sm font-medium">Perihal</Label>
              <Textarea
                {...register("description")}
                placeholder="Masukkan deskripsi pembayaran"
                className="mt-2"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                variant="outline"
                type="button"
                onClick={handleModalClose}
              >
                Batal
              </Button>
              <Button type="submit">Selanjutnya</Button>
            </div>
          </form>
        ) : (
          /* Review Mode */
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700">
                  Nama Siswa
                </Label>
                <div className="mt-1 text-sm">
                  {selectedStudent?.fullName || "Wawan Irawan"}
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">
                  Kelas
                </Label>
                <div className="mt-1 text-sm">TK B</div>
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">
                  NIS
                </Label>
                <div className="mt-1 text-sm">
                  {selectedStudent?.nik || "90"}
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">
                  Jenis Transaksi
                </Label>
                <div className="mt-1">
                  <Button
                    variant={
                      transactionType === "Uang Masuk" ? "default" : "secondary"
                    }
                    size="sm"
                    className="h-7 text-xs"
                  >
                    {transactionType}
                  </Button>
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">
                  Jenis Pembayaran
                </Label>
                <div className="mt-1">
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    Tabungan
                  </Button>
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">
                  Jumlah Pembayaran
                </Label>
                <div className="mt-1 text-sm font-medium">
                  Rp{amount?.toLocaleString("id-ID") || "0"},00
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">
                  Tanggal Pembayaran
                </Label>
                <div className="mt-1 text-sm">
                  {format(new Date(transactionDate), "EEEE, d MMMM yyyy", {
                    locale: id,
                  })}
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">
                  Perihal
                </Label>
                <div className="mt-1 text-sm">
                  {form.getValues("description") || "-"}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button variant="outline" onClick={onBack}>
                Kembali
              </Button>
              <Button onClick={onFinalSubmit}>Simpan</Button>
            </div>
          </div>
        )}
      </FormProvider>
    </ReusableModal>
  );
};

export default ModalSavingForm;
