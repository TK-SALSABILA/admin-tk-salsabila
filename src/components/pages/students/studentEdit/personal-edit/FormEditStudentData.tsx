import React, { useEffect } from "react";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ConfirmModal from "@/components/modal/ModalConfirmation";
import GradeSelect from "@/components/form/GradeSelect";
import { StudentFormData, studentSchema } from "@/schema/studentSchema";
import { useRouter } from "next/navigation";
import { Student } from "@/types/student";

interface FormEditStudentDataProps {
  studentData: Student;
  onUpdate: (id: string, data: StudentFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const formatDateForInput = (dateString: string) => {
  if (!dateString) return "";

  // Jika sudah format YYYY-MM-DD, langsung return
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }

  try {
    // Handle format "YYYY-MM-DD HH:mm:ss" (dengan spasi)
    if (dateString.includes(" ")) {
      return dateString.split(" ")[0];
    }

    // Handle format "YYYY-MM-DDTHH:mm:ss" (dengan T)
    if (dateString.includes("T")) {
      return dateString.split("T")[0];
    }

    // Fallback: coba parse sebagai Date object
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    return "";
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

export const FormEditStudentData: React.FC<FormEditStudentDataProps> = ({
  studentData,
  onUpdate,
  onCancel,
  isLoading = false,
}) => {
  const router = useRouter();

  const resolver = zodResolver(
    studentSchema
  ) as unknown as Resolver<StudentFormData>;

  const form = useForm<StudentFormData>({
    resolver: resolver,
    mode: "onChange",
    defaultValues: {
      fullName: studentData?.fullName || "",
      nickName: studentData?.nickName || "",
      nik: studentData?.nik || "",
      gender: studentData?.gender as "Laki-laki" | "Perempuan" | undefined,
      dateBirth: formatDateForInput(studentData?.dateBirth),
      birthOrder: studentData?.birthOrder?.toString() || "",
      tribe: studentData?.tribe || "",
      address: studentData?.address || "",
      height: studentData?.height?.toString() || "",
      weight: studentData?.weight?.toString() || "",
      gradeClass: {
        academicYear: studentData?.gradeClass?.academicYear || "",
        isCurrent: studentData?.gradeClass?.isCurrent ?? true,
        gradeLog: {
          id: studentData?.gradeClass?.gradeLog?.id || "",
          gradeLevel: studentData?.gradeClass?.gradeLog?.gradeLevel || "",
        },
      },
    },
  });

  // Force re-render setelah form di-reset
  useEffect(() => {
    if (studentData) {
      const newValues = {
        fullName: studentData.fullName || "",
        nickName: studentData.nickName || "",
        nik: studentData.nik || "",
        gender: studentData.gender as "Laki-laki" | "Perempuan" | undefined,
        dateBirth: formatDateForInput(studentData.dateBirth),
        birthOrder: studentData.birthOrder?.toString() || "",
        tribe: studentData.tribe || "",
        address: studentData.address || "",
        height: studentData.height?.toString() || "",
        weight: studentData.weight?.toString() || "",
        gradeClass: {
          academicYear: studentData.gradeClass?.academicYear || "",
          isCurrent: studentData.gradeClass?.isCurrent ?? true,
          gradeLog: {
            id: studentData.gradeClass?.gradeLog?.id || "",
            gradeLevel: studentData.gradeClass?.gradeLog?.gradeLevel || "",
          },
        },
      };

      form.reset(newValues);

      // Force update untuk select fields
      setTimeout(() => {
        if (studentData.tribe) {
          form.setValue("tribe", studentData.tribe, { shouldValidate: true });
        }
        if (studentData.gradeClass?.academicYear) {
          form.setValue(
            "gradeClass.academicYear",
            studentData.gradeClass.academicYear,
            { shouldValidate: true }
          );
        }
      }, 0);
    }
  }, [studentData, form]);

  const onSubmit = (data: StudentFormData) => {
    if (!studentData?.id) return;

    onUpdate(studentData.id, {
      ...data,
      dateBirth: formatDateForBackend(data.dateBirth),
    });
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.push("/students");
    }
  };

  const handleGradeChange = (gradeId: string, gradeLevel: string) => {
    form.setValue("gradeClass.gradeLog.id", gradeId, { shouldValidate: true });
    form.setValue("gradeClass.gradeLog.gradeLevel", gradeLevel, {
      shouldValidate: true,
    });
  };

  const formatDateForBackend = (dateString: string): string => {
    if (!dateString) return "";

    try {
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return `${dateString}T00:00:00`;
      }
      if (dateString.includes("T")) {
        return dateString;
      }
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }

      const pad = (num: number) => num.toString().padStart(2, "0");
      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1);
      const day = pad(date.getDate());

      return `${year}-${month}-${day}T00:00:00`;
    } catch {
      return `${dateString}T00:00:00`;
    }
  };

  return (
    <Card className="w-full">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap Siswa</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukan nama lengkap siswa"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nickName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Panggilan Siswa</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukan panggilan siswa"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nik"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIK</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukan nomor NIK siswa"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex space-x-1"
                        disabled={isLoading}
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Laki-laki" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Laki-laki
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Perempuan" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Perempuan
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Lahir</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Masukan tanggal lahir"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Anak Ke-</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukan anak ke berapa"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tribe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Suku</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""} // Tambahkan fallback empty string
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih suku siswa" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Jawa">Jawa</SelectItem>
                        <SelectItem value="Sunda">Sunda</SelectItem>
                        <SelectItem value="Bugis">Bugis</SelectItem>
                        <SelectItem value="Madura">Madura</SelectItem>
                        <SelectItem value="Dayak">Dayak</SelectItem>
                        <SelectItem value="Batak">Batak</SelectItem>
                        <SelectItem value="Lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Textarea
                      className="w-full"
                      placeholder="Masukan alamat siswa"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Health Data */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                Data Kesehatan
              </h3>
              <p className="text-sm text-gray-600 mb-4">Data kesehatan siswa</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Berat Badan</FormLabel>
                      <div className="flex">
                        <FormControl>
                          <Input
                            placeholder="00"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <span className="ml-2 flex items-center text-sm text-gray-600">
                          Kg
                        </span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tinggi Badan</FormLabel>
                      <div className="flex">
                        <FormControl>
                          <Input
                            placeholder="00"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <span className="ml-2 flex items-center text-sm text-gray-600">
                          Cm
                        </span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Academic Data */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                Data Akademik
              </h3>
              <p className="text-sm text-gray-600 mb-4">Data akademik siswa</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="gradeClass.gradeLog.id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kelas</FormLabel>
                      <GradeSelect
                        withLevel={true}
                        value={field.value}
                        onChange={(id, level) => {
                          field.onChange(id);
                          handleGradeChange(id, level || "");
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gradeClass.academicYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tahun Ajaran</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""} 
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih tahun ajaran" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="2023/2024">2023/2024</SelectItem>
                          <SelectItem value="2024/2025">2024/2025</SelectItem>
                          <SelectItem value="2025/2026">2025/2026</SelectItem>
                          <SelectItem value="2026/2027">2026/2027</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-between">
              <ConfirmModal
                title="Anda akan membatalkan proses edit data siswa"
                description="Perubahan yang belum disimpan akan hilang. Apakah anda yakin?"
                onConfirm={handleCancel}
                confirmText="Ya"
                cancelText="Tidak"
                trigger={
                  <Button
                    type="button"
                    variant="outline"
                    className="text-gray-500 border-gray-500 hover:text-gray-700"
                    disabled={isLoading}
                  >
                    Batal
                  </Button>
                }
              />
              <div className="flex justify-end pt-6">
                <Button
                  type="submit"
                  disabled={!form.formState.isValid || isLoading}
                  className="text-white px-8"
                >
                  {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FormEditStudentData;
