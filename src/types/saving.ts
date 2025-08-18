export interface SavingGetData {
  id: string;
  studentId: string;
  studentName: string;
  paymentType: string;
  totalAmount: number;
  transactionDate: string;
  description: string;
  previousBalance: number;
  currentBalance: number;
}
export interface SavingResponse {
  meta: {
    page: number;
    recordsPerPage: number;
    totalRecords: number;
    totalPages: number;
    version: number;
    duration: number;
  };
  data: SavingGetData[];
}
