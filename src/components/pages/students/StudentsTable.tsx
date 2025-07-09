import React from "react";
import { TableColumn, TableAction } from "@/types/table";
import DataTable from "@/components/shared/DataTable";
import { Edit, Eye } from "lucide-react";
import { createBadgeRenderer } from "@/utils/tableHelper";

interface Student {
  id: string;
  fullName: string;
  nickName: string;
  nik: string;
  gender: string;
  dateBirth: string;
  birthOrder: string;
}

interface StudentTableProps {
  data: Student[];
}

export const StudentTable: React.FC<StudentTableProps> = ({ data }) => {
  const genderColor = (gender: string) =>
    gender === "Laki-laki"
      ? "bg-blue-100 text-blue-600 border-blue-200 border-2 hover:bg-blue-200"
      : "bg-pink-100 text-pink-600 border-pink-200 border-2 hover:bg-pink-200";

  const columns: TableColumn[] = [
    {
      key: "fullName",
      title: "Nama Lengkap",
      sortable: true,
    },
    {
      key: "nickName",
      title: "Nama Panggilan",
    },
    {
      key: "nik",
      title: "NIK",
    },
    {
      key: "gender",
      title: "Jenis Kelamin",
      render: createBadgeRenderer(genderColor),
    },
    {
      key: "dateBirth",
      title: "Tanggal Lahir",
    },
    {
      key: "birthOrder",
      title: "Anak Ke-",
    },
  ];

  const actions: TableAction[] = [
    {
      icon: <Eye className="h-4 w-4" />,
      tooltip: "Lihat Detail",
      onClick: (row) => console.log("Lihat detail:", row),
      className: "hover:text-blue-500",
    },
    {
      icon: <Edit className="h-4 w-4" />,
      tooltip: "Edit Data",
      onClick: (row) => console.log("Edit:", row),
      className: "hover:text-yellow-500",
    },
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
