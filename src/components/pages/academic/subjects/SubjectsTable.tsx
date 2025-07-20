"use client";
import React, { useState } from "react";
import { TableColumn, TableAction } from "@/types/table";
import DataTable from "@/components/shared/DataTable";
import { Edit } from "lucide-react";
import { Subject } from "@/types/subject";
import ModalSubjectsForm from "@/components/form/ModalSubjectsForm";

interface SubjectsTableProps {
  data: Subject[];
}

const SubjectsTable: React.FC<SubjectsTableProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<Subject | undefined>(
    undefined
  );
  const columns: TableColumn[] = [
    {
      key: "subjectCode",
      title: "Kode Matpel",
      sortable: true,
    },
    {
      key: "subjectName",
      title: "Nama",
      sortable: true,
    },
    {
      key: "gradeLevel",
      title: "Jenjang Kelas",
      sortable: true,
    },
    {
      key: "isMandatory",
      title: "Sifat",
      sortable: true,
      render: (row) => {
        console.log(row);
        if (row === null ) return null;
        if (row === true)
          return (
            <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700 border border-green-300">
              Wajib
            </span>
          );
        if (row === false)
          return (
            <span className="px-2 py-0.5 text-xs rounded-full bg-blue-50 text-blue-600 border border-blue-300">
              Tambahan
            </span>
          );
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-500 border border-gray-300">
            Tidak Diketahui
          </span>
        ); // fallback kalau null
      },
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
      <ModalSubjectsForm
        mode="edit"
        open={isOpen}
        setOpen={setIsOpen}
        initialData={selectedClass}
        onSuccess={() => {}}
      />
    </>
  );
};

export default SubjectsTable;
