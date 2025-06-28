"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Copy, Edit, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

const studentData = [
  {
    no: 1,
    name: "Nama Siswa A",
    year: "2025-2026",
    class: "TK A",
    nik: "1234",
    birthDate: "1 April 2020",
  },
  {
    no: 2,
    name: "Nama Siswa B",
    year: "2025-2026",
    class: "TK B",
    nik: "5678",
    birthDate: "2 Mei 2020",
  },
  {
    no: 3,
    name: "Nama Siswa C",
    year: "2025-2026",
    class: "TK C",
    nik: "5678",
    birthDate: "2 Agustus 2020",
  },
];

const StudentTable = () => {
  const router = useRouter();
  return (
    <Table className="bg-white border-1">
      <TableHeader>
        <TableRow className="">
          <TableHead className="">
            <button className="flex justify-between items-center w-full">
              <span>No. Urut Siswa</span>{" "}
              <ArrowUpDown className="ml-1 h-4 w-4" />
            </button>
          </TableHead>
          <TableHead>
            <button className="flex justify-between items-center w-full ">
              Nama Siswa <ArrowUpDown className="ml-1 h-4 w-4" />
            </button>
          </TableHead>
          <TableHead>NIK</TableHead>
          <TableHead>Tahun Ajaran</TableHead>
          <TableHead>Kelas</TableHead>
          <TableHead>Tanggal Lahir</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {studentData.map((student, idx) => (
          <TableRow
            key={idx}
            onClick={() => router.push(`/students/${student.no}`)}
          >
            <TableCell>{student.no}</TableCell>
            <TableCell>
              <div className="font-medium">{student.name}</div>
            </TableCell>
            <TableCell className="flex justify-between">
              {student.nik} <Copy className="h-4 w-4" />
            </TableCell>
            <TableCell>{student.year}</TableCell>
            <TableCell>{student.class}</TableCell>
            <TableCell>{student.birthDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentTable;
