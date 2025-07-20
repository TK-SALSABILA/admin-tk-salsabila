import { z } from "zod";

const gradeBasechema = z.object({
  gradeLevel: z
    .string()
    .min(1, "Nama kelas wajib diisi")
    .max(20, "Kelas maksimal 20 karakter"),
});

export const gradeSchema = gradeBasechema;
export type gradeSchemaForm = z.infer<typeof gradeSchema>;
