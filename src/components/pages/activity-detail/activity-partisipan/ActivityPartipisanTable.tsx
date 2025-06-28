import React from "react";
import { TableColumn, TableAction } from "@/types/table";
import { Edit, Eye, Printer, Trash2 } from "lucide-react";
import {
  createAvatarRenderer,
  createBadgeRenderer,
  createCurrencyRenderer,
} from "@/utils/tableHelper";
import DataTable from "@/components/shared/DataTable";

const getPaymentTypeColor = (type: string) => {
  switch (type) {
    case "Cash/Transfer":
      return "bg-green-100 text-green-600 border-green-200 border-2 hover:bg-green-200";
    default:
      return "bg-orange-100 text-orange-600 border-orange-200 border-2  hover:bg-orange-200";
  }
};

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(amount)
    .replace("IDR", "Rp");
};

export const StudentPartisipanTable = () => {
  const paymentData = [
    {
      name: "John Doe",
      class: "TK A",
      academicYear: "2025/2026",
      jumlah: 150000,
      statusPembayaran: "Tabungan",
      pembayaranTerakhir: "4 April 2026",
      totalPembayaran: 70000,
      danadibutuhkan: 1000000,
    },
    {
      name: "Jane Smith",
      class: "TK A",
      academicYear: "2025/2026",
      pembayaranTerakhir: "4 April 2026",
      jumlah: 50000,
      statusPembayaran: "Tabungan",
      totalPembayaran: 450000,
      danadibutuhkan: 1000000,
    },
    {
      name: "Alice Johnson",
      class: "TK A",
      academicYear: "2025/2026",
      pembayaranTerakhir: "4 April 2026",
      jumlah: 75000,
      statusPembayaran: "Cash/Transfer",
      totalPembayaran: 850000,
      danadibutuhkan: 1000000,
    },
    {
      name: "Bob Brown",
      class: "TK A",
      academicYear: "2025/2026",
      pembayaranTerakhir: "4 April 2026",
      jumlah: 75000,
      statusPembayaran: "Cash/Transfer",
      totalPembayaran: 154000,
      danadibutuhkan: 1000000,
    },
    {
      name: "Charlie Green",
      class: "TK A",
      academicYear: "2025/2026",
      pembayaranTerakhir: "4 April 2026",
      jumlah: 75000,
      statusPembayaran: "Cash/Transfer",
      totalPembayaran: 900000,
      danadibutuhkan: 1000000,
    },
  ];

  const columns: TableColumn[] = [
    {
      key: "name",
      title: "Nama Siswa",
      render: createAvatarRenderer("name", "avatar", "class", "academicYear"),
    },
    {
      key: "pembayaranTerakhir",
      title: "Tanggal Pembayaran",
      sortable: true,
    },
    {
      key: "statusPembayaran",
      title: "Sumber Pembayaran",
      sortable: true,
      render: createBadgeRenderer(getPaymentTypeColor),
    },
    {
      key: "totalPembayaran",
      title: "Total Pembayaran",
      sortable: true,
      render: (value) => formatCurrency(value),
      subtext: (value, row) => {
        const remaining = row.danadibutuhkan - value;
        if (remaining > 0) {
          return `kurang ${formatCurrency(remaining)}`;
        }
        return null;
      },
    },
  ];

  const actions: TableAction[] = [
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
