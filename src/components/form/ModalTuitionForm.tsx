import tuitionSchema, {
  generateReferenceNumber,
  PaymentStatus,
  PaymentType,
  TransactionType,
  TransactionTypeEnum,
  TuitionSchemaForm,
  PaymentTypeEnum,
} from "@/schema/tuitionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ReusableModal from "../shared/ReusableModal";
import ButtonOpenModal from "../shared/ButtonOpenModal";
import StudentSearchSelect from "./StudentSearchSelect";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { NumericFormat } from "react-number-format";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar } from "../ui/calendar";
import { Student } from "@/types/student";
import { useUpdateTuitionMutation } from "@/hooks/mutation/useTutionMutation";

const useCreateTuitionMutation = () => ({
  mutateAsync: async (data: any) => {
    console.log("Creating tuition payment:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true };
  },
  isPending: false,
});

// Helper function for formatting currency
const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

interface ModalTuitionFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: () => void;
  editData?: any | null;
  mode?: "create" | "edit";
}

const ModalTuitionForm = ({
  open,
  setOpen,
  onSuccess,
  editData = null,
  mode = "create",
}: ModalTuitionFormProps) => {
  const { mutateAsync: createMutation, isPending: isCreating } =
    useCreateTuitionMutation();
  const { mutateAsync: updateMutation, isPending: isUpdating } =
    useUpdateTuitionMutation();

  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [reviewMode, setReviewMode] = useState(false);

  const isEditMode = mode === "edit" && editData;
  const isPending = isCreating || isUpdating;
  console.log("edit data", editData);

  const form = useForm({
    resolver: zodResolver(tuitionSchema),
    defaultValues: {
      studentId: "",
      paymentType: PaymentType.ADMISSION_FEE,
      transactionType: TransactionType.TUITION,
      amount: 0,
      month: new Date().toISOString().slice(0, 7),
      transactionDate: new Date().toISOString(),
    },
  });

  const {
    setValue,
    register,
    watch,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = form;

  // Effect untuk mengisi form dengan data edit
  useEffect(() => {
    if (isEditMode && editData && open) {
      console.log("Setting edit data:", editData);

      setValue("studentId", editData.student.id || "");
      setSelectedStudent(editData.student);
      setValue(
        "paymentType",
        editData.paymentType || PaymentType.FUND_TRANSFER
      );
      setValue(
        "transactionType",
        editData.transactionType || TransactionType.TUITION
      );
      setValue("amount", editData.amount || 0);
      setValue("month", editData.month || new Date().toISOString().slice(0, 7));
      setValue(
        "transactionDate",
        editData.transactionDate || new Date().toISOString()
      );
      // Set selected student jika ada data student
      if (editData.student) {
        setSelectedStudent(editData.student);
      }
    }
  }, [isEditMode, editData, open, setValue]);

  // Reset form ketika modal ditutup atau mode berubah
  useEffect(() => {
    if (!open) {
      reset();
      setSelectedStudent(null);
      setReviewMode(false);
    }
  }, [open, reset]);

  const transactionDate = watch("transactionDate");
  const amount = watch("amount");
  const paymentType = watch("paymentType");
  const transactionType = watch("transactionType");

  const handleSelectStudent = (student: Student) => {
    console.log("Selected student:", student);
    setValue("studentId", student.id || "");
    setSelectedStudent(student);
  };

  // Form submission untuk review
  const onFormSubmit = handleSubmit((data) => {
    console.log("Form data:", data);
    if (!selectedStudent && !isEditMode) {
      console.error("No student selected");
      return;
    }
    setReviewMode(true);
  });

  // Final submission
  const onFinalSubmit = async () => {
    const formData = getValues();

    const submitData = {
      ...formData,
      transactionDate: formatDateForBackend(formData.transactionDate),
    };

    try {
      if (isEditMode) {
        // Update existing record
        await updateMutation({
          id: editData?.id,
          data: submitData,
        });
      } else {
        // Create new record
        await createMutation(submitData);
      }

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

  const formatDateForBackend = (dateString: string) => {
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

  // Get modal titles based on mode
  const getModalTitle = () => {
    if (reviewMode) {
      return isEditMode
        ? "Konfirmasi Perubahan Pembayaran SPP"
        : "Konfirmasi Pembayaran SPP";
    }
    return isEditMode ? "Edit Pembayaran SPP" : "Input Pembayaran SPP";
  };

  const getModalDescription = () => {
    if (reviewMode) {
      return isEditMode
        ? "Cek kembali perubahan pembayaran yang telah dimasukan"
        : "Cek kembali detail pembayaran yang telah dimasukan";
    }
    return isEditMode
      ? "Update detail pembayaran SPP siswa"
      : "Masukan detail pembayaran SPP siswa";
  };

  return (
    <ReusableModal
      open={open}
      className="min-w-[750px]"
      onOpenChange={setOpen}
      title={getModalTitle()}
      description={getModalDescription()}
      trigger={
        !isEditMode ? (
          <ButtonOpenModal
            text="Input Pembayaran SPP"
            onClick={() => setOpen(true)}
          />
        ) : undefined
      }
    >
      <FormProvider {...form}>
        {!reviewMode ? (
          <div className="space-y-6">
            {/* Student Selection Row */}
            <div className="grid grid-cols-12 gap-4 items-end">
              <div className="col-span-6">
                <StudentSearchSelect
                  onSelect={handleSelectStudent}
                  selectedStudent={selectedStudent}
                  disabled={isEditMode}
                />
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
                  value={selectedStudent?.gradeLevel ? "TK B" : ""}
                  placeholder="-"
                  className="bg-gray-50 mt-2"
                />
              </div>
              <div className="col-span-3">
                <Label className="text-sm font-medium">NIS</Label>
                <Input
                  disabled
                  value={selectedStudent?.nik || ""}
                  placeholder="-"
                  className="bg-gray-50 mt-2"
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
                  value={transactionType}
                  onValueChange={(val: TransactionTypeEnum) => {
                    console.log("Transaction type changed:", val);
                    setValue("transactionType", val as any);
                  }}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={TransactionType.TUITION}
                      id="tuition"
                    />
                    <Label htmlFor="tuition" className="font-normal">
                      SPP
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={TransactionType.SAVINGS}
                      id="savings"
                    />
                    <Label htmlFor="savings" className="font-normal">
                      Tabungan
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Jenis Pembayaran
                </Label>
                <RadioGroup
                  value={paymentType}
                  onValueChange={(val: PaymentTypeEnum) => {
                    console.log("Payment type changed:", val);
                    setValue("paymentType", val as any);
                  }}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={PaymentType.ADMISSION_FEE}
                      id="admission-fee"
                    />
                    <Label htmlFor="admission-fee" className="font-normal">
                      Uang Masuk
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={PaymentType.FUND_TRANSFER}
                      id="fund-transfer"
                    />
                    <Label htmlFor="fund-transfer" className="font-normal">
                      Pindah Dana
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Amount and Month Row */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium">Jumlah Pembayaran</Label>
                <NumericFormat
                  value={amount}
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
                <Label className="text-sm font-medium">Bulan SPP</Label>
                <Input
                  type="month"
                  value={watch("month")}
                  onChange={(e) => setValue("month", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">
                  Tanggal Pembayaran
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal mt-2"
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

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={handleModalClose}>
                Batal
              </Button>
              <Button onClick={onFormSubmit}>Selanjutnya</Button>
            </div>
          </div>
        ) : (
          /* Review Mode */
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700">
                  Nama Siswa
                </Label>
                <div className="mt-1 text-sm">
                  {selectedStudent?.fullName || editData?.student?.name || "-"}
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
                  {selectedStudent?.nik || editData?.student?.nik || "-"}
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">
                  Jenis Transaksi
                </Label>
                <div className="mt-1">
                  <Button
                    variant={
                      transactionType === TransactionType.TUITION
                        ? "default"
                        : "secondary"
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
                    {paymentType}
                  </Button>
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">
                  Jumlah Pembayaran
                </Label>
                <div className="mt-1 text-sm font-medium">
                  {formatRupiah(amount || 0)}
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">
                  Bulan SPP
                </Label>
                <div className="mt-1 text-sm">{watch("month")}</div>
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
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button variant="outline" onClick={onBack}>
                Kembali
              </Button>
              <Button onClick={onFinalSubmit} disabled={isPending}>
                {isPending
                  ? isEditMode
                    ? "Mengupdate..."
                    : "Menyimpan..."
                  : isEditMode
                  ? "Update"
                  : "Simpan"}
              </Button>
            </div>
          </div>
        )}
      </FormProvider>
    </ReusableModal>
  );
};

export default ModalTuitionForm;
