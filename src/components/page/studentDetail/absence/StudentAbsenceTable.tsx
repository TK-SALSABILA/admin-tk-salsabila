import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, Edit } from "lucide-react";
import { dummyAbsensiSiswa } from "@/data/studentsData";
import { Badge } from "@/components/ui/badge";

const StudentAbsenceTable = () => {
  const getColor = (type: string) => {
    if (type === "Absen") {
      return "bg-green-100 text-green-600";
    } else if (type === "Sakit") {
      return "bg-yellow-100 text-yellow-600";
    } else if (type === "Izin") {
      return "bg-orange-100 text-orange-600";
    } else {
      return "bg-red-100 text-red-600";
    }
  };
  return (
    <Table className="bg-white border-1">
      <TableHeader>
        <TableRow className="">
          <TableHead className="">
            <button className="flex justify-between items-center w-full">
              Tahun Ajaran <ArrowUpDown className="ml-1 h-4 w-4" />
            </button>
          </TableHead>
          <TableHead>
            <button className="flex justify-between items-center w-full ">
              Tanggal Absensi <ArrowUpDown className="ml-1 h-4 w-4" />
            </button>
          </TableHead>
          <TableHead>
            <button className="flex justify-between items-center w-full ">
              Status Absensi <ArrowUpDown className="ml-1 h-4 w-4" />
            </button>
          </TableHead>
          <TableHead>Deskripsi Absensi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {dummyAbsensiSiswa.map((student, idx) => (
          <TableRow key={idx}>
            <TableCell>{student.tahunAjaran}</TableCell>
            <TableCell>
              <div className="font-medium">{student.tanggal}</div>
            </TableCell>
            <TableCell className="">
              <Badge
                variant={"default"}
                className={`${getColor(student.status)}`}
              >
                {student.status}
              </Badge>
            </TableCell>
            <TableCell>{student.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentAbsenceTable;
