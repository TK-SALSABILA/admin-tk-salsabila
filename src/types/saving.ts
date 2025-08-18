export interface SavingGetData {
  id: string;
  studentId: string;
  studentName: string;
  paymentType: string;
  totalAmmount: number;
  transactionDate: string;
  description: string;
}
export interface SavingResponse {
  meta: {
    page: number;
    recordsPerPage: number;
    totalRecord: number;
    totalPages: number;
    version: number;
    duration: number;
  };
  data: SavingGetData[];
}
