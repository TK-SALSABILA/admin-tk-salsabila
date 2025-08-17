import React, { useState } from "react";
import { TableColumn, TableAction } from "@/types/table";
import { Edit, Eye, Printer, Trash2 } from "lucide-react";
import {
  createAvatarRenderer,
  createBadgeRenderer,
  createCurrencyRenderer,
} from "@/utils/tableHelper";
import DataTable from "@/components/shared/DataTable";
import ModalTuitionForm from "@/components/form/ModalTuitionForm";
import { TuitionSchemaForm } from "@/schema/tuitionSchema";
import {
  generateInvoiceNumber,
  generateInvoicePDF,
  getCurrentDate,
} from "@/lib/generateInvoice";

interface StudentTuitionTableProps {
  data: TuitionSchemaForm[];
  onDataChange?: () => void; // Callback untuk refresh data setelah edit
}

export const StudentTuitionTable = ({
  data,
  onDataChange,
}: StudentTuitionTableProps) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] =
    useState<TuitionSchemaForm | null>(null);

  const handleEdit = (row: TuitionSchemaForm) => {
    console.log("Edit record:", row);
    setSelectedRecord(row);
    setEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    console.log("Edit success, refreshing data...");
    if (onDataChange) {
      onDataChange();
    }
    setSelectedRecord(null);
  };

  const handlePrint = (row: TuitionSchemaForm) => {
    console.log("Print record:", row);

    try {
      // Generate PDF invoice
      generateInvoicePDF(row, {
        invoiceNumber: generateInvoiceNumber(),
        issueDate: getCurrentDate(),
        schoolName: "Taud Salsabila",
        schoolAddress: "Jl. Pendidikan No. 123, Jakarta",
        schoolPhone: "Telp: 628 28372983",
      });

      console.log("PDF invoice generated successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Gagal membuat invoice PDF. Silakan coba lagi.");
    }
  };

  // Custom renderer untuk nama siswa dengan avatar
  const renderStudentName = (value: any, row: any) => {
    const student = row.student;
    if (!student) return "-";

    return (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {student.fullName?.charAt(0)?.toUpperCase() || "?"}
        </div>
        <div>
          <div className="font-medium text-gray-900">{student.fullName}</div>
          <div className="text-sm text-gray-500">{student.nickName}</div>
        </div>
      </div>
    );
  };

  // Custom renderer untuk status pembayaran
  const renderPaymentStatus = (value: any, row: any) => {
    const status = row.status;

    if (status === "SUCCESS") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Dibayar
        </span>
      );
    } else if (status === "PENDING") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Belum Dibayar
        </span>
      );
    }

    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        {status}
      </span>
    );
  };

  // Custom renderer untuk tanggal pembayaran
  const renderPaymentDate = (value: any, row: any) => {
    const paymentDate = row.paymentDate;

    if (!paymentDate || paymentDate === null) {
      return "-";
    }

    // Format tanggal jika ada
    const date = new Date(paymentDate);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Custom renderer untuk periode bulan
  const renderMonth = (value: any, row: any) => {
    const month = row.month;
    if (!month) return "-";

    // Format bulan dari YYYY-MM ke format yang lebih readable
    const [year, monthNum] = month.split("-");
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const monthName = monthNames[parseInt(monthNum) - 1];
    return `${monthName} ${year}`;
  };

  const columns: TableColumn[] = [
    {
      key: "student",
      title: "Nama Siswa",
      render: renderStudentName,
    },
    {
      key: "month",
      title: "Periode Bulan",
      render: renderMonth,
    },
    {
      key: "paymentDate",
      title: "Tanggal Pembayaran",
      sortable: true,
      align: "left",
      render: renderPaymentDate,
    },
    {
      key: "amount",
      title: "Jumlah",
      sortable: true,
      align: "left",
      render: createCurrencyRenderer(),
    },
    {
      key: "status",
      title: "Status",
      sortable: true,
      render: renderPaymentStatus,
    },
  ];

  const actions: TableAction[] = [
    {
      icon: <Printer className="h-4 w-4" />,
      onClick: handlePrint,
      tooltip: "Print",
      className: "hover:text-blue-500",
    },
    {
      icon: <Edit className="h-4 w-4" />,
      onClick: handleEdit,
      tooltip: "Edit",
      className: "hover:text-yellow-500",
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        actions={actions}
        className="shadow-sm"
      />

      {/* Modal Edit */}
      <ModalTuitionForm
        open={editModalOpen}
        setOpen={setEditModalOpen}
        mode="edit"
        editData={selectedRecord}
        onSuccess={handleEditSuccess}
      />
    </>
  );
};
