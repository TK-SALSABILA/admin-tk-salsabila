import React from "react";
import { TableColumn, TableAction } from "@/types/table";
import { Edit, Eye, Printer, Trash2 } from "lucide-react";
import {
  createAvatarRenderer,
  createBadgeRenderer,
  createCurrencyRenderer,
} from "@/utils/tableHelper";
import DataTable from "@/components/shared/DataTable";
import { SavingGetData } from "@/types/saving";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGradeStore } from "@/stores/grade-store";
import {
  generateSavingBalanceInvoicePDF,
  generateSavingReportNumber,
  getCurrentDateID,
} from "@/lib/generateSavingInvoice";
interface StudentSavingTableProps {
  data: SavingGetData[];
}

export const StudentSavingTable = ({ data }: StudentSavingTableProps) => {
  const { selectedGrade } = useGradeStore();
  const createStudentRenderer = () => (_: any, student: any) => {
    return (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={student || "/default-avatar.png"} />
          <AvatarFallback>
            {student?.charAt(0)?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{student}</span>
          {selectedGrade && (
            <span className="text-xs text-gray-500">
              {selectedGrade.gradeLevel}
            </span>
          )}
        </div>
      </div>
    );
  };

  const renderPaymentDate = (row: any) => {
    if (!row || row === null) {
      return "-";
    }
    const date = new Date(row);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderSaving = (row: any) => {
    return (
      <span className="bg-orange-100 text-orange-600 rounded-md border-orange-200 border-2  hover:bg-orange-200">
        Tabungan
      </span>
    );
  };

  const handlePrintSavingBalance = (row: SavingGetData) => {
    try {
      // Transform row data to match SavingBalanceData interface
      const savingBalanceData = {
        student: {
          fullName: row.studentName,
          className: selectedGrade?.gradeLevel || "",
          parentName: "", // Add if available in your data
          nik: "", // Add if available in your data
          dateBirth: "", // Add if available in your data
        },
        currentBalance: row.totalAmount, // Assuming totalAmount represents current balance
        lastTransactionDate: row.transactionDate,
        totalDeposits: undefined, // Add if available in your data
        totalWithdraws: undefined, // Add if available in your data
        transactionCount: undefined, // Add if available in your data
        accountOpenDate: undefined, // Add if available in your data
        interestEarned: 0, // Most kindergarten savings don't have interest
      };

      const invoiceData = {
        invoiceNumber: generateSavingReportNumber(),
        issueDate: getCurrentDateID(),
        schoolName: "TAUD Salsabila",
        schoolAddress:
          "Jl. Laskar Dalam, Griya Metropolitan Blok D1 No.1, RT.005/RW.003, Pekayon Jaya, Kota Bks, Jawa Barat 17148",
        schoolPhone: "Telp: 628 28372983",
        schoolEmail: "info@taudsalsabila.sch.id",
      };

      generateSavingBalanceInvoicePDF(savingBalanceData, invoiceData);
    } catch (error) {
      console.error("Error generating savings balance report:", error);
      // You can add toast notification here
      alert("Terjadi kesalahan saat membuat laporan saldo tabungan");
    }
  };

  const columns: TableColumn[] = [
    {
      key: "studentName",
      title: "Nama Siswa",
      render: (_value, row) => createStudentRenderer()("", row.studentName),
    },
    {
      key: "paymentType",
      title: "Jenis Pembayaran",
      sortable: true,
      render: renderSaving,
    },
    {
      key: "transactionDate",
      title: "Tanggal",
      sortable: true,
      align: "left",
      render: renderPaymentDate,
    },
    {
      key: "totalAmount",
      title: "Jumlah",
      sortable: true,
      align: "left",
      render: createCurrencyRenderer(),
    },
    {
      key: "description",
      title: "Perihal",
      sortable: true,
    },
  ];

  const actions: TableAction[] = [
    {
      icon: <Printer className="h-4 w-4" />,
      onClick: handlePrintSavingBalance,
      tooltip: "Print",
      className: "hover:text-blue-500",
    },
    // {
    //   icon: <Edit className="h-4 w-4" />,
    //   onClick: (row) => console.log("Edit", row),
    //   tooltip: "Edit",
    //   className: "hover:text-yellow-500",
    // },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      actions={actions}
      className="shadow-sm"
    />
  );
};
