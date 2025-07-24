import { z } from "zod";

const savingSchema = z.object({
  studentId: z.string().uuid({
    message: "studentId harus berupa UUID yang valid",
  }),
  paymentType: z.string().min(1, {
    message: "paymentType tidak boleh kosong",
  }),
  transactionType: z.string().min(1, {
    message: "transactionType tidak boleh kosong",
  }),
  amount: z.number().int().positive({
    message: "amount harus berupa bilangan bulat positif",
  }),
  description: z.string().optional(),
  transactionDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "transactionDate harus berupa tanggal yang valid (ISO string)",
  }),
});

export type SavingSchemaForm = z.infer<typeof savingSchema>;

export default savingSchema;
