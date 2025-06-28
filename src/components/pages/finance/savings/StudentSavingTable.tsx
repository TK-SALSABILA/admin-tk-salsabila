import React from "react";
import { TableColumn, TableAction } from "@/types/table";
import { Edit, Eye, Printer, Trash2 } from "lucide-react";
import {
  createAvatarRenderer,
  createBadgeRenderer,
  createCurrencyRenderer,
} from "@/utils/tableHelper";
import DataTable from "@/components/shared/DataTable";

export const StudentSavingTable = () => {
  const paymentData = [
    {
      name: "John Doe",
      class: "TK A",
      academicYear: "2025-2026",
      tanggal: "4 April 2026",
      jenisPembayaran: "Tabungan",
      perihal: "Pembayaran Tabungan April 2026",
      jumlah: 150000,
    },
    {
      name: "Jane Smith",
      class: "TK B",
      academicYear: "2025-2026",
      tanggal: "4 April 2026",
      jenisPembayaran: "Tabungan",
      perihal: "Tabungan",
      jumlah: 50000,
    },
    {
      name: "Alice Johnson",
      class: "SD 1A",
      academicYear: "2025-2026",
      tanggal: "4 April 2026",
      jenisPembayaran: "Tabungan",
      perihal: "Tabungan sekolah",
      jumlah: 75000,
    },
    {
      name: "Bob Brown",
      class: "SD 1A",
      academicYear: "2025-2026",
      tanggal: "4 April 2026",
      jenisPembayaran: "Tabungan",
      perihal: "Tabungan Bulanan",
      jumlah: 75000,
    },
    {
      name: "Charlie Green",
      class: "SD 1A",
      academicYear: "2025-2026",
      tanggal: "4 April 2026",
      jenisPembayaran: "Tabungan",
      perihal: "Tabungan Kegiatan",
      jumlah: 75000,
    },
  ];

  const getPaymentTypeColor = (type: string) => {
    switch (type) {
      default:
        return "bg-orange-100 text-orange-600 border-orange-200 border-2  hover:bg-orange-200";
    }
  };

  const columns: TableColumn[] = [
    {
      key: "name",
      title: "Nama Siswa",
      render: createAvatarRenderer("name", "avatar", "class", "academicYear"),
    },
    {
      key: "jenisPembayaran",
      title: "Jenis Pembayaran",
      sortable: true,
      render: createBadgeRenderer(getPaymentTypeColor),
    },
    {
      key: "tanggal",
      title: "Tanggal",
      sortable: true,
      align: "left",
    },
    {
      key: "jumlah",
      title: "Jumlah",
      sortable: true,
      align: "left",
      render: createCurrencyRenderer(),
    },
    {
      key: "perihal",
      title: "Perihal",
      sortable: true,
    },
  ];

  const actions: TableAction[] = [
    {
      icon: <Printer className="h-4 w-4" />,
      onClick: (row) => console.log("View", row),
      tooltip: "Print",
      className: "hover:text-blue-500",
    },
    {
      icon: <Edit className="h-4 w-4" />,
      onClick: (row) => console.log("Edit", row),
      tooltip: "Edit",
      className: "hover:text-yellow-500",
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={paymentData}
      actions={actions}
      className="shadow-sm"
    />
  );
};
