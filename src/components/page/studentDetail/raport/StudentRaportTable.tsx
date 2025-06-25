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
import { dummyRaporSiswa } from "@/data/studentsData";
import { Badge } from "@/components/ui/badge";

const StudentRaportTable = () => {
  const getColor = (type: string) => {
    if (type === "Ujian Semester") {
      return "bg-green-100 text-green-600";
    } else if (type === "Ujian Harian") {
      return "bg-yellow-100 text-yellow-600";
    } else if (type === "Nilai Praktek") {
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
              <span>Semester</span> <ArrowUpDown className="ml-1 h-4 w-4" />
            </button>
          </TableHead>
          <TableHead>
            <button className="flex justify-between items-center w-full ">
              Mata Pelajaran <ArrowUpDown className="ml-1 h-4 w-4" />
            </button>
          </TableHead>
          <TableHead>
            <button className="flex justify-between items-center w-full ">
              Jenis Penilaian <ArrowUpDown className="ml-1 h-4 w-4" />
            </button>
          </TableHead>
          <TableHead>
            <button className="flex justify-between items-center w-full ">
              KKM <ArrowUpDown className="ml-1 h-4 w-4" />
            </button>
          </TableHead>
          <TableHead>
            <button className="flex justify-between items-center w-full ">
              Nilai <ArrowUpDown className="ml-1 h-4 w-4" />
            </button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {dummyRaporSiswa.map((student, idx) => (
          <TableRow key={idx}>
            <TableCell>{student.semester}</TableCell>
            <TableCell>
              <div className="font-medium">{student.mataPelajaran}</div>
            </TableCell>
            <TableCell className="">
              <Badge
                variant={"default"}
                className={`${getColor(student.jenisPenilaian)}`}
              >
                {student.jenisPenilaian}
              </Badge>
            </TableCell>
            <TableCell>{student.kkm}</TableCell>
            <TableCell>
              <p>{student.nilai}</p>
              <p
                className={`text-xs font-medium ${
                  student.nilai < student.kkm ? "text-red-500" : "text-green-500"
                }`}
              >
                {student.nilai < student.kkm ? "Tidak Lulus" : "Lulus"}
              </p>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentRaportTable;
