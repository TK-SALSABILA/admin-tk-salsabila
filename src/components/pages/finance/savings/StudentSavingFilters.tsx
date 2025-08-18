"use client";

import ModalSavingForm from "@/components/form/ModalSavingForm";
import {
  FilterConfig,
  ReusableFilter,
} from "@/components/shared/ReusableFilter";
import React, { useState } from "react";

const StudentSavingFilters = () => {
  const [open, setOpen] = useState<boolean>(false);
  const schoolYear: FilterConfig[] = [
    {
      type: "select",
      key: "tahun_ajaran",
      placeholder: "Tahun Ajaran",
      options: [
        { value: "2025-2026", label: "2025-2026" },
        { value: "2024-2025", label: "2024-2025" },
        { value: "2023-2024", label: "2023-2024" },
      ],
    },
  ];

  const studentName: FilterConfig[] = [
    {
      type: "select",
      key: "nama_siswa",
      placeholder: "Nama Siswa",
      options: [
        { value: "1", label: "Siswa 1" },
        { value: "2", label: "Siswa 2" },
        { value: "3", label: "Siswa 3" },
      ],
    },
  ];

  const gradeFilter: FilterConfig[] = [
    {
      type: "grade",
      key: "kelas",
      placeholder: "Pilih Kelas",
      width: "w-[200px]",
    },
  ];

  return (
    <div className="flex justify-start gap-20">
      <div className="flex flex-row items-start gap-2">
        <ReusableFilter
          filters={schoolYear}
          key={schoolYear[0].key}
          actions={null}
        />
        <ReusableFilter
          filters={studentName}
          key={studentName[0].key}
          actions={null}
        />
        <ReusableFilter filters={gradeFilter} actions={null} />
      </div>
      <div className="">
        <ModalSavingForm open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default StudentSavingFilters;
