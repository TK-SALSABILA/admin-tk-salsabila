"use client";

import ModalSavingForm from "@/components/form/ModalSavingForm";
import {
  FilterConfig,
  ReusableFilter,
} from "@/components/shared/ReusableFilter";
import React, { useState } from "react";

const StudentTuitionFilters = () => {
  const [open, setOpen] = useState<boolean>(false);
  const classs: FilterConfig[] = [
    {
      type: "select",
      key: "kelas",
      placeholder: "Kelas",
      options: [
        { value: "1", label: "Kelas 1" },
        { value: "2", label: "Kelas 2" },
        { value: "3", label: "Kelas 3" },
      ],
    },
  ];
  const month: FilterConfig[] = [
    {
      type: "select",
      key: "bulan",
      placeholder: "Bulan",
      options: [
        { value: "january", label: "Januari" },
        { value: "february", label: "Februari" },
        { value: "march", label: "Maret" },
      ],
    },
  ];

  const status: FilterConfig[] = [
    {
      type: "select",
      key: "status",
      placeholder: "Status",
      options: [
        { value: "PENDING", label: "Pending" },
        { value: "SUCCESS", label: "Success" },
      ],
    },
  ];
  return (
    <div className="flex justify-start gap-20">
      <div className="flex flex-row items-start gap-2">
        <ReusableFilter filters={classs} key={classs[0].key} actions={null} />
        <ReusableFilter filters={month} key={month[0].key} actions={null} />
        <ReusableFilter filters={status} key={status[0].key} actions={null} />
      </div>
      <div className="">
        <ModalSavingForm open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default StudentTuitionFilters;
