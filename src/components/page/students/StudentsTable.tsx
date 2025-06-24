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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, Copy, Edit, Eye } from "lucide-react";
import Link from "next/link";

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
  return (
    <Table className="bg-white border-1">
      <TableHeader>
        <TableRow className="">
          <TableHead align="center" className="">
            <Input type="checkbox" className="w-4 h-4" />
          </TableHead>
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
          <TableHead>
            <button className="flex justify-between items-center w-full ">
              NIK <ArrowUpDown className="ml-1 h-4 w-4" />
            </button>
          </TableHead>
          <TableHead>
            <button className="flex justify-between items-center w-full ">
              Tahun Ajaran <ArrowUpDown className="ml-1 h-4 w-4" />
            </button>
          </TableHead>
          <TableHead>
            <button className="flex justify-between items-center w-full ">
              Kelas <ArrowUpDown className="ml-1 h-4 w-4" />
            </button>
          </TableHead>
          <TableHead>
            <button className="flex justify-between items-center w-full">
              Tanggal Lahir <ArrowUpDown className="ml-1 h-4 w-4" />
            </button>
          </TableHead>
          <TableHead align="center">
            <button className="flex justify-between">Action</button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {studentData.map((student, idx) => (
          <TableRow key={idx}>
            <TableCell>
              <Input type="checkbox" className="w-4 h-4" />
            </TableCell>
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
            <TableCell align="center" className="flex gap-1">
              {" "}
              <Edit className="h-4 w-4 cursor-pointer hover:text-yellow-500" />
              <Link href={`/students/${student.no}`}>
                <Eye className="h-4  w-4 cursor-pointer hover:text-yellow-500" />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentTable;
