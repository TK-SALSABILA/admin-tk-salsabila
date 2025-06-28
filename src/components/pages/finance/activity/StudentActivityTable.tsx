import DataTable from "@/components/shared/DataTable";
import { TableAction, TableColumn } from "@/types/table";
import { createCurrencyRenderer } from "@/utils/tableHelper";
import { Edit, Printer } from "lucide-react";
import React from "react";

const StudentActivityTable = () => {
  const transactionData = [
    {
      id: "asia09suajsasasasas",
      tahunAjaran: "2025-2026",
      namaKegiatan: "Kegiatan Bulan April",
      tanggalKegiatan: "4 April 2026",
      danaDibutuhkan: 150000,
      danaTerkumpul: 100000,
      kelasPartipisan: "TK A",
      detailKegiatan: "Kegiatan Bulan April 2026 Mengenjungi Kebun Binatang",
    },
    {
      id: "asia09suajsasasasas2",
      tahunAjaran: "2025-2026",
      namaKegiatan: "Kegiatan Bulan Mei",
      tanggalKegiatan: "4 Mei 2026",
      danaDibutuhkan: 450000,
      danaTerkumpul: 200000,
      kelasPartipisan: "TK B",
      detailKegiatan: "Kegiatan Bulan Mei 2026 Mengunjungi Kebun Binatang",
    },
    {
      id: "asia09suajsasasasas3",
      tahunAjaran: "2025-2026",
      namaKegiatan: "Kegiatan Bulan Juni",
      tanggalKegiatan: "4 Juni 2026",
      danaDibutuhkan: 300000,
      danaTerkumpul: 0,
      kelasPartipisan: "TK C",
      detailKegiatan: "Kegiatan Bulan Juni 2026 Mengunjungi Kebun Binatang",
    },
    {
      id: "asia09suajsasasasas4",
      tahunAjaran: "2025-2026",
      namaKegiatan: "Outing Kelas 1A",
      tanggalKegiatan: "4 April 2026",
      danaDibutuhkan: 75000,
      danaTerkumpul: 0,
      kelasPartipisan: "TK B",
      detailKegiatan: "Outing Kelas 1A ke Kebun Binatang",
    },
    {
      id: "asia09suajsasasasas5",
      tahunAjaran: "2025-2026",
      namaKegiatan: "Berenang",
      tanggalKegiatan: "4 April 2026",
      danaDibutuhkan: 75000,
      danaTerkumpul: 0,
      kelasPartipisan: "TK A",
      detailKegiatan: "Kegiatan Berenang di Kolam Renang",
    },
  ];

  const columns: TableColumn[] = [
    {
      key: "tahunAjaran",
      title: "Tahun Ajaran",
      sortable: true,
    },
    {
      key: "namaKegiatan",
      title: "Nama Kegiatan",
      sortable: true,
    },
    {
      key: "tanggalKegiatan",
      title: "Tanggal Kegiatan",
      sortable: true,
    },
    {
      key: "danaDibutuhkan",
      title: "Dana Dibutuhkan",
      sortable: true,
      render: createCurrencyRenderer(),
    },
    {
      key: "danaTerkumpul",
      title: "Dana Terkumpul",
      sortable: true,
      render: createCurrencyRenderer(),
    },
    {
      key: "kelasPartisipan",
      title: "Kelas Partisipan",
      sortable: true,
    },
    {
      key: "detailKegiatan",
      title: "Detail Kegiatan",
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
    <div>
      <DataTable
        columns={columns}
        data={transactionData}
        actions={actions}
        clickTRoute={true}
        pathRoute="finance/activity"
      />
    </div>
  );
};

export default StudentActivityTable;
