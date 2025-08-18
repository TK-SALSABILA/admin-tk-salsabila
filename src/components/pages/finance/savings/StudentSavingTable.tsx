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
interface StudentSavingTableProps {
  data: SavingGetData[];
}

export const StudentSavingTable = ({ data }: StudentSavingTableProps) => {
  const { selectedGrade } = useGradeStore();
  const getPaymentTypeColor = (type: string) => {
    switch (type) {
      default:
        return "bg-orange-100 text-orange-600 border-orange-200 border-2  hover:bg-orange-200";
    }
  };

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
      render: createBadgeRenderer(getPaymentTypeColor),
    },
    {
      key: "transactionDate",
      title: "Tanggal",
      sortable: true,
      align: "left",
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
      data={data}
      actions={actions}
      className="shadow-sm"
    />
  );
};
