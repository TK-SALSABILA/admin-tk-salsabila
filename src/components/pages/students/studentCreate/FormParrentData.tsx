import ConfirmModal from "@/components/modal/ModalConfirmation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import  { NumericFormat } from "react-number-format";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Users } from "lucide-react";
import { useForm } from "react-hook-form";

interface FormParentDataProps {
  onSubmit: (data: ParentFormData) => void;
  onBack: () => void;
  initialData?: Partial<ParentFormData>;
  studentAddress?: string;
}

export const FormParentData: React.FC<FormParentDataProps> = ({
  onSubmit,
  onBack,
  initialData,
  studentAddress,
}) => {
  const form = useForm<ParentFormData>({
    resolver: zodResolver(parentSchema),
    defaultValues: initialData || {
      fatherName: "",
      fatherDateBirth: "",
      fatherNik: "",
      fatherEducation: "",
      fatherJob: "",
      fatherCitizen: "",
      fatherIncome: 0,
      fatherAddress: "",
      fatherPhone: "",
      motherName: "",
      motherDateBirth: "",
      motherNik: "",
      motherEducation: "",
      motherCitizen: "",
      motherIncome: 0,
      motherAddress: "",
      motherPhone: "",
    },
  });

  const handleSubmit = (data: ParentFormData) => {
    const formattedData = {
      ...data,
      fatherDateBirth: formatDateForBackend(data.fatherDateBirth),
      motherDateBirth: formatDateForBackend(data.motherDateBirth),
    };
    onSubmit(formattedData);
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

  const onCancel = () => {
    form.reset();
    onBack();
  };

 const formatDateForBackend = (dateString: string): string => {
   if (!dateString) return "";

   try {
     // Jika format sudah YYYY-MM-DD, tambahkan time part tanpa Z
     if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
       return `${dateString}T00:00:00`; // Hapus .000Z
     }

     // Jika format sudah ISO (ada T), hapus .000Z jika ada
     if (dateString.includes("T")) {
       return dateString.replace(/\.\d{3}Z$/, "");
     }

     // Untuk format lain, coba parse dan format ulang
     const date = new Date(dateString);
     if (isNaN(date.getTime())) {
       throw new Error("Invalid date");
     }

     const pad = (num: number) => num.toString().padStart(2, "0");
     const year = date.getFullYear();
     const month = pad(date.getMonth() + 1);
     const day = pad(date.getDate());

     return `${year}-${month}-${day}T00:00:00`; // Tanpa Z
   } catch {
     // Fallback: return dengan format default tanpa Z jika parsing gagal
     return `${dateString.split("T")[0]}T00:00:00`;
   }
 };

  return (
    <Card className="w-full">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Users className="h-5 w-5" />
          Data Orang Tua
        </CardTitle>
        <p className="text-sm text-gray-600">Data orang tua siswa</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
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
                        <Input placeholder="Masukan nama ayah" {...field} />
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
                        <Input placeholder="Masukan NIK ayah" {...field} />
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
                        value={field.value}
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
                        value={field.value}
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
                          <SelectItem value="Lainnya">
                            Lainnya
                          </SelectItem>
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
                        value={field.value}
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
                        />
                      </FormControl>
                      {studentAddress && (
                        <div className="flex gap-1">
                          <input
                            onChange={() => copyStudentAddressToFather()}
                            type="checkbox"
                            id="copy"
                          />{" "}
                          <label
                            htmlFor="copy"
                            id="copy"
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
                        <Input placeholder="Masukan nama ibu" {...field} />
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
                        <Input placeholder="Masukan NIK ibu" {...field} />
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
                        value={field.value}
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
                        value={field.value}
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
                        />
                      </FormControl>
                      {studentAddress && (
                        <div className="flex gap-1">
                          <input
                            onChange={() => copyStudentAddressToMother()}
                            type="checkbox"
                            id="copyMother"
                          />{" "}
                          <label
                            htmlFor="copyMother"
                            id="copyMother"
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
              <div className="">
                <ConfirmModal
                  title="Anda akan membatalkan proses menambah data siswa"
                  description="Anda perlu mengulangi proses input kembali nantinya. Apakah anda yakin?"
                  onConfirm={onCancel}
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
              </div>
              <div className="flex gap-2">
                <Button
                  className="text-yellow-500 border-yellow-500 hover:text-yellow-300"
                  type="button"
                  variant="outline"
                  onClick={onBack}
                >
                  Kembali
                </Button>
                <Button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-8"
                >
                  Simpan
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
