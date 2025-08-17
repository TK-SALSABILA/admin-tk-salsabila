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
    const selectedGrade = grades.find((grade) => grade.id === selectedValue);
    if (selectedGrade) {
      onChange(selectedGrade.id, selectedGrade.gradeLevel);
    }
  };

  // Temukan grade yang sesuai dengan value (id)
  const selectedGrade = grades.find((grade) => grade.id === value);

  return (
    <Select
      value={value}
      onValueChange={handleValueChange}
      disabled={isLoading}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Pilih Kelas">
          {selectedGrade ? selectedGrade.gradeLevel : ""}
        </SelectValue>
      </SelectTrigger>
      <SelectContent ref={contentRef} onScroll={handleScroll}>
        {grades.map((grade) => (
          <SelectItem key={grade.id} value={grade.id}>
            {grade.gradeLevel}
          </SelectItem>
        ))}
        {isLoading && <div className="p-2 text-center">Memuat...</div>}
      </SelectContent>
    </Select>
  );
};

export default GradeSelect;
