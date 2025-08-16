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

interface StudentTuitionTableProps {
  data: TuitionSchemaForm[];
  onDataChange?: () => void; // Callback untuk refresh data setelah edit
}

export const StudentTuitionTable = ({
  data,
  onDataChange,
}: StudentTuitionTableProps) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<TuitionSchemaForm | null>(
    null
  );

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
    // Implementasi print logic
  };


  const columns: TableColumn[] = [
    {
      key: "student",
      title: "Nama Siswa",
      render: createAvatarRenderer("name", "avatar", "class", "academicYear"),
    },
    {
      key: "month",
      title: "Periode Bulan",
    },
    {
      key: "tanggal",
      title: "Tanggal",
      sortable: true,
      align: "left",
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
