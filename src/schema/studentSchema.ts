import { z } from "zod";


export const studentSchema = z.object({
  fullName: z.string().min(1, "Nama lengkap wajib diisi"),
  nickName: z.string().min(1, "Nama panggilan wajib diisi"),
  nik: z.string().min(1, "NIK wajib diisi").max(16, "NIK maksimal 16 karakter"),
  gender: z.enum(["Laki-laki", "Perempuan"], {
    required_error: "Jenis kelamin wajib dipilih",
  }),
  dateBirth: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Tanggal tidak valid",
    })
    .transform((val) => new Date(val).toISOString()),
  birthOrder: z.string().min(1, "Anak ke berapa wajib diisi"),
  tribe: z.string().min(1, "Suku wajib diisi"),
  address: z.string().min(1, "Alamat wajib diisi"),
  height: z.string().min(1, "Tinggi badan wajib diisi"),
  weight: z.string().min(1, "Berat badan wajib diisi"),
  gradeClass: z.object({
    gradeLevel: z.string().min(1, "Kelas wajib dipilih"),
    academicYear: z.string().min(1, "Tahun ajaran wajib dipilih"),
  }),
});


export const parentSchema = z.object({
  fatherName: z.string().min(1, "Nama ayah wajib diisi"),
  fatherDateBirth: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Tanggal tidak valid",
    })
    .transform((val) => new Date(val).toISOString()),
  fatherNik: z
    .string()
    .min(1, "NIK ayah wajib diisi")
    .max(16, "NIK maksimal 16 karakter"),
  fatherEducation: z.string().min(1, "Pendidikan ayah wajib diisi"),
  fatherJob: z.string().min(1, "Pekerjaan ayah wajib diisi"),
  fatherCitizen: z.string().min(1, "Kewarganegaraan ayah wajib diisi"),
  fatherIncome: z.number().min(0, "Penghasilan ayah wajib diisi"),
  fatherAddress: z.string().min(1, "Alamat ayah wajib diisi"),
  fatherPhone: z.string().min(10, "Nomor telepon ayah minimal 10 digit"),

  motherName: z.string().min(1, "Nama ibu wajib diisi"),
  motherDateBirth: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Tanggal tidak valid",
    })
    .transform((val) => new Date(val).toISOString()),
  motherNik: z
    .string()
    .min(1, "NIK ibu wajib diisi")
    .max(16, "NIK maksimal 16 karakter"),
  motherEducation: z.string().min(1, "Pendidikan ibu wajib diisi"),
  motherCitizen: z.string().min(1, "Kewarganegaraan ibu wajib diisi"),
  motherIncome: z.number().min(0, "Penghasilan ibu wajib diisi"),
  motherAddress: z.string().min(1, "Alamat ibu wajib diisi"),
  motherPhone: z.string().min(10, "Nomor telepon ibu minimal 10 digit"),
});


export type StudentFormData = z.infer<typeof studentSchema>;
export type ParentFormData = z.infer<typeof parentSchema>;
export type CombinedStudentFormData = StudentFormData & { parent: ParentFormData };

