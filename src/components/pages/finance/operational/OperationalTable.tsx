import DataTable from "@/components/shared/DataTable";
import { TableAction, TableColumn } from "@/types/table";
import {
  createAvatarRenderer,
  createBadgeRenderer,
  createCurrencyRenderer,
} from "@/utils/tableHelper";
import { Edit, Printer } from "lucide-react";
import React from "react";

const OperationalTable = () => {
  const getPaymentTypeColor = (type: string) => {
    switch (type) {
      case "Lainnya":
        return "bg-green-100 text-green-600 border-green-200 border-2 hover:bg-green-200";
      case "SPP":
        return "bg-yellow-100 text-yellow-600 border-yellow-200 border-2 hover:bg-yellow-200";
      case "Tabungan":
        return "bg-orange-100 text-orange-600 border-orange-200 border-2 hover:bg-orange-200";
      case "Kegiatan":
        return "bg-blue-100 text-blue-600 border-blue-200 border-2 hover:bg-blue-200";
      case "Pendaftaran":
        return "bg-sky-400/50 text-sky-400 border-sky-400 border-2 hover:bg-sky-400/20";
      default:
        return "bg-red-100 text-red-600 border-red-200 border-2  hover:bg-red-200";
    }
  };

  const getStatusTypeColor = (type: string) => {
    switch (type) {
      case "Lunas":
        return "bg-green-100 text-green-600 border-green-200 border-2 hover:bg-green-200";
      case "Belum Bayar":
        return "bg-yellow-100 text-yellow-600 border-yellow-200 border-2 hover:bg-yellow-200";
      case "Menunggu Konfirmasi":
        return "bg-orange-100 text-orange-600 border-orange-200 border-2 hover:bg-orange-200";
      //   case "Kegiatan":
      //     return "bg-blue-100 text-blue-600 border-blue-200 border-2 hover:bg-blue-200";
      //   case "Pendaftaran":
      //     return "bg-sky-400/50 text-sky-400 border-sky-400 border-2 hover:bg-sky-400/20";
      default:
        return "bg-red-100 text-red-600 border-red-200 border-2  hover:bg-red-200";
    }
  };

  const transactionData = [
    {
      name: "Maulana Fauzan",
      class: "TK A",
      academicYear: "2025-2026",
      tanggalPembayaran: "4 April 2026",
      tanggalJatuhTempo: "4 April 2026",
      jenisPembayaran: "SPP",
      perihal: "Pembayaran SPP April 2026",
      statusPembayaran: "Lunas",
      jumlah: 150000,
    },
    {
      name: "Kenzo Fauzan",
      class: "TK B",
      academicYear: "2025-2026",
      tanggalPembayaran: "4 April 2026",
      tanggalJatuhTempo: "4 April 2026",
      jenisPembayaran: "SPP",
      perihal: "Pembayaran SPP April 2026",
      statusPembayaran: "Belum Bayar",
      jumlah: 50000,
    },
    {
      name: "Budi Santoso",
      class: "SD 1A",
      academicYear: "2025-2026",
      tanggalPembayaran: "6 April 2026",
      tanggalJatuhTempo: "6 April 2026",
      jenisPembayaran: "SPP",
      perihal: "Pembayaran SPP April 2026",
      statusPembayaran: "Menunggu Konfirmasi",
      jumlah: 75000,
    },
    {
      name: "Putri Wulandari",
      class: "SD 1A",
      academicYear: "2025-2026",
      tanggalPembayaran: "4 April 2026",
      tanggalJatuhTempo: "4 April 2026",
      jenisPembayaran: "SPP",
      perihal: "SPP Bulan April 2026",
      statusPembayaran: "Lunas",
      jumlah: 75000,
    },
    {
      name: "Rina Sari",
      class: "SD 1A",
      academicYear: "2025-2026",
      tanggalPembayaran: "4 April 2026",
      tanggalJatuhTempo: "4 April 2026",
      jenisPembayaran: "SPP",
      perihal: "Pembayaran SPP Bulan April 2026",
      statusPembayaran: "Lunas",
      jumlah: 75000,
    },
    {
      name: "No name",
      class: "SD 1A",
      academicYear: "2025-2026",
      tanggalPembayaran: "4 April 2026",
      tanggalJatuhTempo: "4 April 2026",
      jenisPembayaran: "SPP",
      perihal: "Pembayaran SPP Bulan April 2026",
      statusPembayaran: "Tidak Bayar",
      jumlah: 75000,
    },
  ];

  const columns: TableColumn[] = [
    {
      key: "name",
      title: "Nama Siswa",
      sortable: true,
      render: createAvatarRenderer("name", "avatar", "class", "academicYear"),
    },
    {
      key: "jenisPembayaran",
      title: "Jenis Pembayaran",
      sortable: true,
      render: createBadgeRenderer(getPaymentTypeColor),
    },
    {
      key: "jumlah",
      title: "Jumlah",
      sortable: true,
      align: "left",
      render: createCurrencyRenderer(),
    },
    {
      key: "statusPembayaran",
      title: "Status Pembayaran",
      sortable: true,
      render: createBadgeRenderer(getStatusTypeColor),
    },
    {
      key: "tanggalPembayaran",
      title: "Tanggal Pembayaran",
      sortable: true,
      align: "left",
    },
    {
      key: "tanggalJatuhTempo",
      title: "Tanggal Jatuh Tempo",
      sortable: true,
      align: "left",
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
    <div>
      <DataTable columns={columns} data={transactionData} actions={actions} />
    </div>
  );
};

export default OperationalTable;
