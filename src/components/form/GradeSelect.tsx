"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useGetGradeQuery } from "@/hooks/query/useGardeQuery";

type Grade = {
  id: string;
  gradeLevel: string;
};

type GradeSelectProps = {
  value?: string;
  onChange: (id: string, level: string) => void;
};

const GradeSelect: React.FC<GradeSelectProps> = ({ value, onChange }) => {
  const [page, setPage] = useState(1);
  const [grades, setGrades] = useState<Grade[]>([]);
  const { data, isLoading } = useGetGradeQuery({ page, rpp: 10 });

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data?.data) {
      setGrades((prev) => [...prev, ...data.data]);
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

  const handleValueChange = (value: string) => {
    const selectedGrade = grades.find((grade) => grade.id === value);
    if (selectedGrade) {
      onChange(value, selectedGrade.gradeLevel);
    }
  };

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Pilih Kelas" />
      </SelectTrigger>
      <SelectContent ref={contentRef} onScroll={handleScroll}>
        {grades.map((grade) => (
          <SelectItem key={grade.id} value={grade.id}>
            TK {grade.gradeLevel}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default GradeSelect;
