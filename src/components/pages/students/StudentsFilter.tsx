"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusSquareIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const StudentsFilter = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
      <div className="flex gap-2 w-full md:w-auto">
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Tahun Ajaran" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2025-2026">2025-2026</SelectItem>
            <SelectItem value="2024-2025">2024-2025</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Kelas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TK A">TK A</SelectItem>
            <SelectItem value="TK B">TK B</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Input placeholder="Cari nama siswa" className="w-full md:w-[250px]" />
        <Button onClick={()=> router.push("/students/create")}>
          <PlusSquareIcon /> Tambah Siswa
        </Button>
      </div>
    </div>
  );
};

export default StudentsFilter;
