import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const StudentsRaportFilter = () => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
      <div className="flex gap-2 w-full md:w-auto">
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Mata Pelajaran" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Biologi">Biologi</SelectItem>
            <SelectItem value="BahasaArab">Bahasa Arab</SelectItem>
            <SelectItem value="Matematika">Matematika</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Jenis Penilaian" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="UjianSemester">Ujian Semester</SelectItem>
            <SelectItem value="Ujian Harian">Ujian Harian</SelectItem>
            <SelectItem value="Matematika">Matematika</SelectItem>
            <SelectItem value="Nilai Praktek">Nilai Praktek</SelectItem>
            <SelectItem value="Remedial">Remedial</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default StudentsRaportFilter;
