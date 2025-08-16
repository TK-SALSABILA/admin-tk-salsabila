export interface TuitionParams {
  classId: string;
  month: string;
}

export interface Student {
  id: string;
  fullName: string;
  nickName: string;
  nik: string;
  gender: string;
  dateBirth: string; // format: "YYYY-MM-DD HH:mm:ss"
  birthOrder: string; // contoh: "6 tahun"
}

export interface TuitionRecord {
  id: string;
  month: string; // format: "YYYY-MM"
  amount: number;
  status: "SUCCESS" | "PENDING" | "FAILED"; // enum dari status pembayaran
  paymentDate: string | null; // null kalau belum dibayar
  student: Student;
}
