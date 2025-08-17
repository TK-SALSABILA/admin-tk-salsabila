import React, { useEffect } from "react";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ConfirmModal from "@/components/modal/ModalConfirmation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumericFormat } from "react-number-format";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ParentFormData, parentSchema } from "@/schema/studentSchema";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { Parent } from "@/types/student";

interface FormEditParentDataProps {
  parentData: Parent;
  onUpdate: (id: string, data: ParentFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  studentAddress?: string;
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

export const FormEditParentData: React.FC<FormEditParentDataProps> = ({
  parentData,
  onUpdate,
  onCancel,
  isLoading = false,
  studentAddress,
}) => {
  const router = useRouter();

  const resolver = zodResolver(
    parentSchema
  ) as unknown as Resolver<ParentFormData>;

  const form = useForm<ParentFormData>({
    resolver: resolver,
    mode: "onChange",
    defaultValues: {
      fatherName: parentData?.fatherName || "",
      fatherDateBirth: formatDateForInput(parentData?.fatherDateBirth),
      fatherNik: parentData?.fatherNik || "",
      fatherEducation: parentData?.fatherEducation || "",
      fatherJob: parentData?.fatherJob || "",
      fatherCitizen: parentData?.fatherCitizen || "",
      fatherIncome: parentData?.fatherIncome || 0,
      fatherAddress: parentData?.fatherAddress || "",
      fatherPhone: parentData?.fatherPhone || "",
      motherName: parentData?.motherName || "",
      motherDateBirth: formatDateForInput(parentData?.motherDateBirth),
      motherNik: parentData?.motherNik || "",
      motherEducation: parentData?.motherEducation || "",
      motherCitizen: parentData?.motherCitizen || "",
      motherIncome: parentData?.motherIncome || 0,
      motherAddress: parentData?.motherAddress || "",
      motherPhone: parentData?.motherPhone || "",
    },
  });

  // Force re-render setelah form di-reset
  useEffect(() => {
    if (parentData) {
      const newValues = {
        fatherName: parentData.fatherName || "",
        fatherDateBirth: formatDateForInput(parentData.fatherDateBirth),
        fatherNik: parentData.fatherNik || "",
        fatherEducation: parentData.fatherEducation || "",
        fatherJob: parentData.fatherJob || "",
        fatherCitizen: parentData.fatherCitizen || "",
        fatherIncome: parentData.fatherIncome || 0,
        fatherAddress: parentData.fatherAddress || "",
        fatherPhone: parentData.fatherPhone || "",
        motherName: parentData.motherName || "",
        motherDateBirth: formatDateForInput(parentData.motherDateBirth),
        motherNik: parentData.motherNik || "",
        motherEducation: parentData.motherEducation || "",
        motherCitizen: parentData.motherCitizen || "",
        motherIncome: parentData.motherIncome || 0,
        motherAddress: parentData.motherAddress || "",
        motherPhone: parentData.motherPhone || "",
      };

      form.reset(newValues);

      // Force update untuk select fields
      setTimeout(() => {
        if (parentData.fatherEducation) {
          form.setValue("fatherEducation", parentData.fatherEducation, {
            shouldValidate: true,
          });
        }
        if (parentData.fatherJob) {
          form.setValue("fatherJob", parentData.fatherJob, {
            shouldValidate: true,
          });
        }
        if (parentData.fatherCitizen) {
          form.setValue("fatherCitizen", parentData.fatherCitizen, {
            shouldValidate: true,
          });
        }
        if (parentData.motherEducation) {
          form.setValue("motherEducation", parentData.motherEducation, {
            shouldValidate: true,
          });
        }
        if (parentData.motherCitizen) {
          form.setValue("motherCitizen", parentData.motherCitizen, {
            shouldValidate: true,
          });
        }
      }, 0);
    }
  }, [parentData, form]);

  const onSubmit = (data: ParentFormData) => {
    if (!parentData?.id) return;

    onUpdate(parentData.id, {
      ...data,
      fatherDateBirth: formatDateForBackend(data.fatherDateBirth),
      motherDateBirth: formatDateForBackend(data.motherDateBirth),
    });
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.push("/students");
    }
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

  const copyStudentAddressToFather = () => {
    if (studentAddress) {
      form.setValue("fatherAddress", studentAddress);
    }
  };

  const copyStudentAddressToMother = () => {
    if (studentAddress) {
      form.setValue("motherAddress", studentAddress);
    }
  };

  return (
    <Card className="w-full">
      {/* <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Users className="h-5 w-5" />
          Edit Data Orang Tua
        </CardTitle>
        <p className="text-sm text-gray-600">Edit data orang tua siswa</p>
      </CardHeader> */}
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Father Data */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Data Ayah</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fatherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukan nama ayah"
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
                  name="fatherDateBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Lahir</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="Masukan tanggal lahir ayah"
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
                  name="fatherNik"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NIK</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukan NIK ayah"
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
                  name="fatherEducation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pendidikan</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih pendidikan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="SD">SD</SelectItem>
                          <SelectItem value="SMP">SMP</SelectItem>
                          <SelectItem value="SMA">SMA</SelectItem>
                          <SelectItem value="D3">D3</SelectItem>
                          <SelectItem value="S1">S1</SelectItem>
                          <SelectItem value="S2">S2</SelectItem>
                          <SelectItem value="S3">S3</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fatherJob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pekerjaan Ayah</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih pekerjaan ayah" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="PNS">PNS</SelectItem>
                          <SelectItem value="TNI/Polri">TNI/Polri</SelectItem>
                          <SelectItem value="Guru/Dosen">Guru/Dosen</SelectItem>
                          <SelectItem value="Petani">Petani</SelectItem>
                          <SelectItem value="Pedagang">Pedagang</SelectItem>
                          <SelectItem value="Wiraswasta">Wiraswasta</SelectItem>
                          <SelectItem value="Karyawan Swasta">
                            Karyawan Swasta
                          </SelectItem>
                          <SelectItem value="Lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fatherCitizen"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kewarganegaraan</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kewarganegaraan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="WNI">WNI</SelectItem>
                          <SelectItem value="WNA">WNA</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fatherIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Penghasilan</FormLabel>
                      <FormControl>
                        <NumericFormat
                          value={field.value}
                          thousandSeparator="."
                          decimalSeparator=","
                          prefix="Rp "
                          allowNegative={false}
                          onValueChange={(values) => {
                            field.onChange(values.floatValue ?? 0);
                          }}
                          customInput={Input}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fatherPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Telepon</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukan nomor telepon ayah"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="fatherAddress"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Alamat</FormLabel>
                    <div className="space-y-2">
                      <FormControl>
                        <Textarea
                          className="max-w-1/2"
                          placeholder="Masukan alamat ayah"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      {studentAddress && (
                        <div className="flex gap-1">
                          <input
                            onChange={() => copyStudentAddressToFather()}
                            type="checkbox"
                            id="copy"
                            disabled={isLoading}
                          />
                          <label
                            htmlFor="copy"
                            className="text-xs font-semibold"
                          >
                            Sama dengan siswa
                          </label>
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Mother Data */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Data Ibu</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="motherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukan nama ibu"
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
                  name="motherDateBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Lahir</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="Masukan tanggal lahir ibu"
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
                  name="motherNik"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NIK</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukan NIK ibu"
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
                  name="motherEducation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pendidikan</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih pendidikan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="SD">SD</SelectItem>
                          <SelectItem value="SMP">SMP</SelectItem>
                          <SelectItem value="SMA">SMA</SelectItem>
                          <SelectItem value="D3">D3</SelectItem>
                          <SelectItem value="S1">S1</SelectItem>
                          <SelectItem value="S2">S2</SelectItem>
                          <SelectItem value="S3">S3</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="motherCitizen"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kewarganegaraan</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kewarganegaraan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="WNI">WNI</SelectItem>
                          <SelectItem value="WNA">WNA</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="motherIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Penghasilan</FormLabel>
                      <FormControl>
                        <NumericFormat
                          value={field.value}
                          thousandSeparator="."
                          decimalSeparator=","
                          prefix="Rp "
                          allowNegative={false}
                          onValueChange={(values) => {
                            field.onChange(values.floatValue ?? 0);
                          }}
                          customInput={Input}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="motherPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Telepon</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukan nomor telepon ibu"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="motherAddress"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Alamat</FormLabel>
                    <div className="flex flex-col gap-1">
                      <FormControl>
                        <Textarea
                          className="max-w-1/2"
                          placeholder="Masukan alamat ibu"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      {studentAddress && (
                        <div className="flex gap-1">
                          <input
                            onChange={() => copyStudentAddressToMother()}
                            type="checkbox"
                            id="copyMother"
                            disabled={isLoading}
                          />
                          <label
                            htmlFor="copyMother"
                            className="text-xs font-semibold"
                          >
                            Sama dengan siswa
                          </label>
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between">
              <ConfirmModal
                title="Anda akan membatalkan proses edit data orang tua"
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

export default FormEditParentData;
