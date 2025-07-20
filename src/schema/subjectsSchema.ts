import { z } from "zod";

export const subjectsSchema = z.object({
  subjectName: z
    .string()
    .min(1, "Nama mata pelajaran wajib diisi")
    .max(50, "Mata pelajaran maksimal 50 karakter"),
  subjectCode: z
    .string()
    .min(1, "Kode mata pelajaran wajib diisi")
    .max(10, "Kode mata pelajaran maksimal 10 karakter"),
  gradeLevel: z.string().min(1, "Jenjang kelas wajib diisi"),
  isMandatory: z.boolean(),
  description: z
    .string()
    .min(1, "Deskripsi wajib diisi")
    .max(250, "Deskripsi maksimal 100 karakter"),
});

export type subjectsSchemaForm = z.infer<typeof subjectsSchema>;
