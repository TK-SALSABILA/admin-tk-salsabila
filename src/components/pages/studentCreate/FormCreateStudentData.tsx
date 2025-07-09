import React from "react";
import { useForm } from "react-hook-form";
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
import { CalendarDays, User, Users, GraduationCap } from "lucide-react";
import { StudentFormData, studentSchema } from "@/schema/studentSchema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ConfirmModal from "@/components/modal/ModalConfirmation";

interface FormCreateStudentDataProps {
  onNext: (data: StudentFormData) => void;
  initialData?: Partial<StudentFormData>;
}

export const FormCreateStudentData: React.FC<FormCreateStudentDataProps> = ({
  onNext,
  initialData,
}) => {
  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    mode: "onChange",
    defaultValues: initialData || {
      fullName: "",
      nickName: "",
      nik: "",
      gender: undefined,
      dateBirth: "",
      birthOrder: "",
      tribe: "",
      address: "",
      height: "",
      weight: "",
      gradeClass: {
        gradeLevel: "",
        academicYear: "",
      },
    },
  });

  const onSubmit = (data: StudentFormData) => {
    onNext(data);
  };

  const onCancel = () => {
    form.reset();
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-2 text-xl">
          Data Pribadi
        </CardTitle>
        <p className="text-sm text-gray-600">Data pribadi siswa</p>
      </CardHeader>
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
                      <Input placeholder="Masukan panggilan siswa" {...field} />
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
                      <Input placeholder="Masukan nomor NIK siswa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex space-x-1"
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
                      <Input placeholder="Masukan anak ke berapa" {...field} />
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
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
                      className="max-w-1/2"
                      placeholder="Masukan alamat siswa"
                      {...field}
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
                          <Input placeholder="00" {...field} />
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
                          <Input placeholder="00" {...field} />
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
                  name="gradeClass.gradeLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kelas</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kelas" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="A">A</SelectItem>
                          <SelectItem value="B">B</SelectItem>
                          <SelectItem value="C">C</SelectItem>
                          <SelectItem value="D">D</SelectItem>
                          <SelectItem value="E">E</SelectItem>
                        </SelectContent>
                      </Select>
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
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
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
                title="Anda akan membatalkan proses menambah data siswa"
                description="Anda perlu mengulangi proses input kembali nantinya. Apakah anda yakin?"
                onConfirm={onCancel}
                confirmText="Ya"
                cancelText="Tidak"
                trigger={
                  <Button
                    type="button"
                    variant={"outline"}
                    className="text-yellow-500 border-yellow-500 hover:text-yellow-300"
                  >
                    Batal
                  </Button>
                }
              />
              <div className="flex justify-end pt-6">
                <Button
                  type="submit"
                  disabled={!form.formState.isValid}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-8"
                >
                  Selanjutnya
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
