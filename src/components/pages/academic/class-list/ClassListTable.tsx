"use client";
import React, { useState } from "react";
import { TableColumn, TableAction } from "@/types/table";
import DataTable from "@/components/shared/DataTable";
import { Edit } from "lucide-react";
import { ClassData } from "@/types/grade";
import ModalUpdateClass from "@/components/modal/ModalClassForm";

interface StudentTableProps {
  data: ClassData[];
}

const ClassListTable: React.FC<StudentTableProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<ClassData | undefined>(undefined);
  const columns: TableColumn[] = [
    {
      key: "gradeLevel",
      title: "Jenjang Kelas",
      sortable: true,
    },
    {
      key: "subjects_count",
      title: "Jumlah Matpel",
      sortable: true,
    },
    {
      key: "student_count",
      title: "Jenjang Kelas",
      sortable: true,
    },
  ];

  const actions: TableAction[] = [
    {
      icon: <Edit className="h-4 w-4 text-gray-700" />,
      tooltip: "Edit Data",
      onClick: (row) => {
        setSelectedClass(row);
        setIsOpen(true);
      },
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
      <ModalUpdateClass
        mode="edit"
        open={isOpen}
        setOpen={setIsOpen}
        initialData={selectedClass}
        onSuccess={() => {}}
      />
    </>
  );
};

export default ClassListTable;
