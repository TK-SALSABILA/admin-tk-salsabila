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
import { paymentData } from "@/data/studentsData";
import { Badge } from "@/components/ui/badge";

const StudentSavingTable = () => {
  const getColor = (type: string) => {
    if (type === "Lainnya") {
      return "bg-green-100 text-green-600";
    } else if (type === "SPP") {
      return "bg-yellow-100 text-yellow-600";
    } else if (type === "Tabungan") {
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
              Tanggal <ArrowUpDown className="ml-1 h-4 w-4" />
            </button>
          </TableHead>
          <TableHead>
            <button className="flex justify-between items-center w-full ">
              Jenis Pembayaran <ArrowUpDown className="ml-1 h-4 w-4" />
            </button>
          </TableHead>
          <TableHead>
            <button className="flex justify-between items-center w-full ">
              Prihal <ArrowUpDown className="ml-1 h-4 w-4" />
            </button>
          </TableHead>
          <TableHead>
            <button className="flex justify-between items-center w-full ">
              Jumlah <ArrowUpDown className="ml-1 h-4 w-4" />
            </button>
          </TableHead>
          <TableHead align="center">
            <button className="flex justify-between">Action</button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {paymentData.map((student, idx) => (
          <TableRow key={idx}>
            <TableCell>{student.tanggal}</TableCell>
            <TableCell className="">
              <Badge
                variant={"default"}
                className={`${getColor(student.jenisPembayaran)}`}
              >
                {student.jenisPembayaran}
              </Badge>
            </TableCell>
            <TableCell>{student.perihal}</TableCell>
            <TableCell>{student.jumlah}</TableCell>
            <TableCell align="center" className="flex gap-1">
              <Edit className="h-4 w-4 cursor-pointer hover:text-yellow-500" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentSavingTable;
