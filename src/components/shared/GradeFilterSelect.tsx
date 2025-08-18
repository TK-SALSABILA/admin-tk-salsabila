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
import { useGetGradeQuery } from "@/hooks/query/useGradeQuery";
import { useEffect, useState } from "react";
import { useGradeStore } from "@/stores/grade-store";
import { ClassData } from "@/types/grade";

interface GradeFilterSelectProps {
  searchKey: string;
  placeholder?: string;
  width?: string;
}

export function GradeFilterSelect({
  searchKey,
  placeholder = "Pilih Kelas",
  width = "w-[150px]",
}: GradeFilterSelectProps) {
  const searchParams = useSearchParams();
  const { updateSearchParams } = useUpdateSearchParams();
  const { data, isLoading } = useGetGradeQuery({ page: 1, rpp: 100 });
  const { selectedGrade, setSelectedGrade } = useGradeStore();
  const [grades, setGrades] = useState<ClassData[]>([]);

  useEffect(() => {
    if (data?.data) {
      setGrades(data.data);

      const current = searchParams.get(searchKey);
      if (!current && data.data[0]) {
        const first = data.data[0];
        updateSearchParams({ [searchKey]: first.id });
        setSelectedGrade({ id: first.id, gradeLevel: first.gradeLevel });
      }
    }
  }, [data, searchKey, searchParams, updateSearchParams, setSelectedGrade]);

  const firstGrade = grades.length > 0 ? grades[0] : null;
  const currentValue = searchParams.get(searchKey) || firstGrade?.id || "";

  const handleValueChange = (value: string) => {
    const selected = grades.find((g) => g.id === value);
    if (selected) {
      updateSearchParams({ [searchKey]: selected.id });
      setSelectedGrade({ id: selected.id, gradeLevel: selected.gradeLevel });
    }
  };

  return (
    <Select
      value={currentValue}
      onValueChange={handleValueChange}
      disabled={isLoading}
    >
      <SelectTrigger className={width}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {grades.map((grade) => (
          <SelectItem key={grade.id} value={grade.id}>
            {grade.gradeLevel}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default GradeFilterSelect;
