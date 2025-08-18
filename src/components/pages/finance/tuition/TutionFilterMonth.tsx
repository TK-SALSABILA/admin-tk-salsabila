"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import { useUpdateSearchParams } from "@/utils/searchParams";
import { useEffect, useMemo } from "react";

interface TuitionMonthFilterProps {
  searchKey: string;
  width?: string;
}

export function TuitionMonthFilter({
  searchKey,
  width = "w-[180px]",
}: TuitionMonthFilterProps) {
  const searchParams = useSearchParams();
  const { updateSearchParams } = useUpdateSearchParams();

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-based
  const currentDate = today.getDate();

  const formatValue = (year: number, month: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}`;

  const currentMonthValue = formatValue(currentYear, currentMonth);
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

  // generate daftar bulan
  const monthOptions = useMemo(() => {
    return monthNames
      .map((label, index) => {
        const value = formatValue(currentYear, index);

        // bulan depan → hide jika tanggal < 28
        if (value === nextMonthValue && currentDate < 28) {
          return null;
        }

        // bulan setelah bulan depan → selalu hide
        if (value > nextMonthValue) {
          return null;
        }

        return { value, label };
      })
      .filter(Boolean) as { value: string; label: string }[];
  }, [currentYear, currentDate, nextMonthValue]);

  // ambil dari query string atau fallback ke bulan ini
  const currentValue = searchParams.get(searchKey) || currentMonthValue;

  const handleValueChange = (value: string) => {
    updateSearchParams({ [searchKey]: value });
  };

  useEffect(() => {
    updateSearchParams({ [searchKey]: currentValue });
  }, []);

  return (
    <Select value={currentValue} onValueChange={handleValueChange}>
      <SelectTrigger className={width}>
        <SelectValue placeholder="Pilih Bulan" />
      </SelectTrigger>
      <SelectContent>
        {monthOptions.map((month) => (
          <SelectItem key={month.value} value={month.value}>
            {month.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
