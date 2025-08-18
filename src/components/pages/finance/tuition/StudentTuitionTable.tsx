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

import { useGradeStore } from "@/stores/grade-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateSPPInvoiceNumber, generateSPPInvoicePDF, getCurrentDateID } from "@/lib/generateInvoice";

interface StudentTuitionTableProps {
  data: TuitionSchemaForm[];
  onDataChange?: () => void;
}

export const StudentTuitionTable = ({
  data,
  onDataChange,
}: StudentTuitionTableProps) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] =
    useState<TuitionSchemaForm | null>(null);
  const { selectedGrade } = useGradeStore();

  const handleEdit = (row: TuitionSchemaForm) => {
    setSelectedRecord(row);
    setEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    if (onDataChange) {
      onDataChange();
    }
    setSelectedRecord(null);
  };

  const handlePrint = (row: any) => {
    try {
      // Generate PDF invoice
      generateSPPInvoicePDF(row, {
        invoiceNumber: generateSPPInvoiceNumber(),
        issueDate: getCurrentDateID(),
        schoolName: "TAUD Salsabila",
        schoolAddress:
          "Jl. Laskar Dalam, Griya Metropolitan Blok D1 No.1, RT.005/RW.003, Pekayon Jaya, Kota Bks, Jawa Barat 17148",
        schoolPhone: "Telp: 628 28372983",
        schoolEmail: "info@taudsalsabila.sch.id",
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
        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
          Dibayar
        </span>
      );
    } else if (status === "PENDING") {
      return (
        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'>
          Belum Dibayar
        </span>
      );
    }

    return (
      <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'>
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

  const createStudentRenderer = () => (_: any, student: any) => {
    return (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={student.avatar || "/default-avatar.png"} />
          <AvatarFallback>
            {student.fullName?.charAt(0)?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{student.fullName}</span>
          {selectedGrade && (
            <span className="text-xs text-gray-500">{selectedGrade.gradeLevel}</span>
          )}
        </div>
      </div>
    );
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
      render: (_value, row) => createStudentRenderer()("", row.student),
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
      icon: <Printer className='h-4 w-4' />,
      onClick: handlePrint,
      tooltip: "Print",
      className: "hover:text-blue-500",
    },
    {
      icon: <Edit className='h-4 w-4' />,
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
        className='shadow-sm'
      />

      {/* Modal Edit */}
      <ModalTuitionForm
        open={editModalOpen}
        setOpen={setEditModalOpen}
        mode='edit'
        editData={selectedRecord}
        onSuccess={handleEditSuccess}
      />
    </>
  );
};
