import { z } from "zod";

// Enum definitions for better type safety
export const PaymentType = {
  ADMISSION_FEE: "ADMISSION_FEE",
  FUND_TRANSFER: "FUND_TRANSFER",
} as const;

export const TransactionType = {
  TUITION: "TUITION",
  SAVINGS: "SAVINGS",
} as const;

export const PaymentStatus = {
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  CANCELLED: "CANCELLED",
} as const;

// Helper function to validate month format and logical date
const validateMonth = (month: string): boolean => {
  const regex = /^\d{4}-(0[1-9]|1[0-2])$/;
  if (!regex.test(month)) return false;

  const [year, monthNum] = month.split("-");
  const currentDate = new Date();
  const inputDate = new Date(parseInt(year), parseInt(monthNum) - 1);

  // Allow payments for current month and up to 12 months in the future
  const maxDate = new Date(
    currentDate.getFullYear() + 1,
    currentDate.getMonth()
  );

  return inputDate <= maxDate;
};

// Main tuition schema
const tuitionSchema = z.object({
  studentId: z.string().uuid({
    message: "studentId harus berupa UUID yang valid",
  }),

  paymentType: z.nativeEnum(PaymentType, {
    message: `paymentType harus salah satu dari: ${Object.values(
      PaymentType
    ).join(", ")}`,
  }),

  transactionType: z.nativeEnum(TransactionType, {
    message: `transactionType harus salah satu dari: ${Object.values(
      TransactionType
    ).join(", ")}`,
  }),

  transactionDate: z.string().datetime({
    message:
      "transactionDate harus berupa ISO datetime string yang valid (contoh: 2024-01-15T10:30:00Z)",
  }),

  amount: z
    .number()
    .int()
    .min(1, {
      message: "amount harus berupa bilangan bulat positif minimal 1",
    })
    .max(100000000, {
      message: "amount tidak boleh melebihi 100,000,000",
    }),

  month: z.string().refine(validateMonth, {
    message:
      "month harus dalam format YYYY-MM dan tidak boleh lebih dari 12 bulan ke depan",
  }),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  createdBy: z.string().uuid().optional(),
});

// Create variations of the schema for different use cases
export const createTuitionSchema = tuitionSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export const updateTuitionSchema = tuitionSchema.partial().omit({
  studentId: true,
  createdAt: true,
});

export const tuitionQuerySchema = z.object({
  studentId: z.string().uuid().optional(),
  month: z
    .string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])$/)
    .optional(),
  status: z.nativeEnum(PaymentStatus).optional(),
  paymentType: z.nativeEnum(PaymentType).optional(),
  transactionType: z.nativeEnum(TransactionType).optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
});

// Type exports
export type TuitionSchemaForm = z.infer<typeof tuitionSchema>;
export type CreateTuitionForm = z.infer<typeof createTuitionSchema>;
export type UpdateTuitionForm = z.infer<typeof updateTuitionSchema>;
export type TuitionQueryForm = z.infer<typeof tuitionQuerySchema>;
export type PaymentTypeEnum = keyof typeof PaymentType;
export type TransactionTypeEnum = keyof typeof TransactionType;
export type PaymentStatusEnum = keyof typeof PaymentStatus;

// Validation helper functions
export const validateTuition = (data: unknown) => {
  return tuitionSchema.safeParse(data);
};

export const validateCreateTuition = (data: unknown) => {
  return createTuitionSchema.safeParse(data);
};

export const validateUpdateTuition = (data: unknown) => {
  return updateTuitionSchema.safeParse(data);
};

export const validateTuitionQuery = (data: unknown) => {
  return tuitionQuerySchema.safeParse(data);
};

// Utility functions
export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
};

export const parseMonth = (month: string): { year: number; month: number } => {
  const [year, monthNum] = month.split("-");
  return {
    year: parseInt(year),
    month: parseInt(monthNum),
  };
};

export const generateReferenceNumber = (prefix = "TUI"): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `${prefix}-${timestamp}-${random}`.toUpperCase();
};

// Default export
export default tuitionSchema;
