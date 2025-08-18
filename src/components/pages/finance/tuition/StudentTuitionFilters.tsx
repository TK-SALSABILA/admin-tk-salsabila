"use client";

import GradeSelect from "@/components/form/GradeSelect";
import {
  FilterConfig,
  ReusableFilter,
} from "@/components/shared/ReusableFilter";
import React, { useMemo } from "react";
import { TuitionMonthFilter } from "./TutionFilterMonth";

const StudentTuitionFilters = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-based
  const currentDate = today.getDate();

  // Format helper YYYY-MM
  const formatValue = (year: number, month: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}`;

  const currentMonthValue = formatValue(currentYear, currentMonth);

  // bulan depan
  const nextMonthDate = new Date(currentYear, currentMonth + 1, 1);
  const nextMonthValue = formatValue(
    nextMonthDate.getFullYear(),
    nextMonthDate.getMonth()
  );

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const monthOptions = useMemo(() => {
    return monthNames.map((label, index) => {
      const value = formatValue(currentYear, index);
      let disabled = false;

      // bulan depan disabled kalau tanggal < 28
      if (value === nextMonthValue && currentDate < 28) {
        disabled = true;
      }
      // bulan setelah bulan depan → selalu disabled
      if (value > nextMonthValue) {
        disabled = true;
      }

      return { value, label, disabled };
    });
  }, [currentYear, currentMonthValue, nextMonthValue, currentDate]);

  const monthFilter: FilterConfig[] = [
    {
      type: "select",
      key: "bulan",
      placeholder: "Bulan",
      options: monthOptions,
    },
  ];

  const statusFilter: FilterConfig[] = [
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
        <ReusableFilter filters={gradeFilter} />
        <TuitionMonthFilter searchKey="bulan" />
        <ReusableFilter filters={statusFilter} actions={null} />
      </div>
    </div>
  );
};

export default StudentTuitionFilters;
