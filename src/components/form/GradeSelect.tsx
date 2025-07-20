"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useGetGradeQuery } from "@/hooks/query/useGradeQuery";

type Grade = {
  id: string;
  gradeLevel: string;
};

type GradeSelectProps = {
  value?: string;
  withLevel?: boolean;
  onChange: (id: string, level?: string) => void;
};

const GradeSelect: React.FC<GradeSelectProps> = ({
  value,
  onChange,
  withLevel = true,
}) => {
  const [page, setPage] = useState(1);
  const [grades, setGrades] = useState<Grade[]>([]);
  const { data, isLoading } = useGetGradeQuery({ page, rpp: 10 });

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data?.data) {
      setGrades((prev) => {
        const newItems = data.data.filter(
          (item: Grade) => !prev.some((existing) => existing.id === item.id)
        );
        return [...prev, ...newItems];
      });
    }
  }, [data]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading) {
      if (data?.meta?.totalPages && page < data.meta.totalPages) {
        setPage((prev) => prev + 1);
      }
    }
  };

  const handleValueChange = (selectedValue: string) => {
    const selectedGrade = grades.find((grade) =>
      withLevel
        ? grade.gradeLevel === selectedValue
        : grade.id === selectedValue
    );

    if (!selectedGrade) return;

    if (withLevel) {
      onChange(selectedGrade.id, selectedGrade.gradeLevel);
    } else {
      onChange(selectedGrade.id);
    }
  };

  // Untuk menentukan value yang akan di-set ke Select
  const selectValue = withLevel
    ? grades.find((grade) => grade.gradeLevel === value)?.gradeLevel || value
    : value;

  return (
    <Select value={selectValue} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Pilih Kelas" />
      </SelectTrigger>
      <SelectContent ref={contentRef} onScroll={handleScroll}>
        {grades.map((grade) => (
          <SelectItem
            key={grade.id}
            value={withLevel ? grade.gradeLevel : grade.id}
          >
            TK {grade.gradeLevel}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default GradeSelect;
