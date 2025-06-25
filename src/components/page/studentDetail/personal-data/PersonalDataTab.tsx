"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, CopyCheck } from "lucide-react";
import { toast } from "sonner";

const mockData = {
  personal: {
    fullName: "Wawan Irawan",
    nickname: "Wawan",
    gender: "Laki-Laki",
    placeOfBirth: "Kepulauan Seribu",
    dateOfBirth: "Senin, 9 Desember 2020",
    age: "4 Tahun 8 Bulan",
    nationality: "Indonesia",
    nik: "1234567891234567",
    ethnicity: "Jawa",
    religion: "-",
    address:
      "Jl. Raya seribu No. 99. Kec. Seribu, Pulau Seribu. Jakarta, Indonesia",
  },
  academic: {
    status: "Aktif",
    class: "TK B",
    academicYear: "2025/2026",
    yearJoined: "2024",
  },
};

const PersonalDataTab = () => {
  const { personal, academic } = mockData;
  const [copied, setCopied] = useState<boolean>(false);
  const handleCopyNik = (nik: string) => {
    navigator.clipboard.writeText(nik);
    toast.success("NIK berhasil disalin");
    setCopied(true);
  };
  return (
    <section className="">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Data Pribadi</CardTitle>
          <p className="text-sm text-muted-foreground">Data pribadi siswa</p>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          {/* Data Pribadi */}
          {Object.entries(personal).map(([label, value]) => (
            <div key={label} className="flex">
              <div className="w-40 flex-shrink-0">
                <p className="font-bold text-slate-900">
                  {label === "fullName"
                    ? "Nama Lengkap"
                    : label === "nickname"
                    ? "Nama Panggilan"
                    : label === "gender"
                    ? "Jenis Kelamin"
                    : label === "placeOfBirth"
                    ? "Tempat Lahir"
                    : label === "dateOfBirth"
                    ? "Tanggal Lahir"
                    : label === "age"
                    ? "Usia"
                    : label === "nationality"
                    ? "Warga Negara"
                    : label === "nik"
                    ? "NIK"
                    : label === "ethnicity"
                    ? "Suku"
                    : label === "religion"
                    ? "Agama"
                    : label === "address"
                    ? "Alamat"
                    : label}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-gray-900 flex items-center gap-2">
                  {value}{" "}
                  {label === "nik" && (
                    <span
                      className="cursor-pointer"
                      onClick={() => handleCopyNik(value)}
                    >
                      {copied ? (
                       <CopyCheck className="h-4 w-4 mt-[1px] text-muted-foreground" />
                      ) : (
                        <Copy className="h-4 w-4 mt-[1px] text-muted-foreground" />
                      )}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Section Title untuk Data Akademik */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Data Akademik
            </h3>
            <p className="text-sm text-muted-foreground">Data akademik siswa</p>
          </div>

          {/* Data Akademik */}
          {Object.entries(academic).map(([label, value]) => (
            <div key={label} className="flex">
              <div className="w-40 flex-shrink-0">
                <p className="font-bold text-slate-900">
                  {label === "status"
                    ? "Status Siswa"
                    : label === "class"
                    ? "Kelas"
                    : label === "academicYear"
                    ? "Tahun Ajaran"
                    : label === "yearJoined"
                    ? "Tahun Bergabung"
                    : label}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-gray-900">{value}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
};

export default PersonalDataTab;
