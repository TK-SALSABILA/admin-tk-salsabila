"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, CopyCheck } from "lucide-react";
import { toast } from "sonner";
import { Student } from "@/types/student";
import TabLoader from "@/components/shared/TabLoader";

interface PersonalDataProps {
  personal: Student;
  loading: boolean;
}

const PersonalDataTab = ({ personal, loading }: PersonalDataProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyNik = (nik: string) => {
    navigator.clipboard.writeText(nik);
    toast.success("NIK berhasil disalin");
    setCopied(true);
  };

  if (loading) return <TabLoader/>

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Data Pribadi</CardTitle>
          <p className="text-sm text-muted-foreground">Data pribadi siswa</p>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          {/* Data Pribadi */}
          <DataItem label="Nama Lengkap" value={personal.fullName} />
          <DataItem label="Nama Panggilan" value={personal.nickName} />
          <DataItem
            label="NIK"
            value={personal.nik}
            copyable
            onCopy={() => handleCopyNik(personal.nik)}
            copied={copied}
          />
          <DataItem label="Jenis Kelamin" value={personal.gender} />
          <DataItem
            label="Tanggal Lahir"
            value={new Date(personal.dateBirth).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          />
          <DataItem label="Anak ke-" value={personal.birthOrder} />
          <DataItem label="Suku" value={personal.tribe} />
          <DataItem label="Alamat" value={personal.address} />
          <DataItem label="Tinggi Badan (cm)" value={personal.height} />
          <DataItem label="Berat Badan (kg)" value={personal.weight} />

          {/* Divider */}
          <div className="border-t border-gray-200 my-6" />

          {/* Data Akademik */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Data Akademik
            </h3>
            <p className="text-sm text-muted-foreground">Data akademik siswa</p>
          </div>

          <DataItem
            label="Tahun Ajaran"
            value={personal.gradeClass.academicYear}
          />
          <DataItem
            label="Tingkat Kelas"
            value={personal.gradeClass.gradeLog.gradeLevel}
          />
          <DataItem
            label="Status Aktif"
            value={personal.gradeClass.isCurrent ? "Aktif" : "Tidak Aktif"}
          />
        </CardContent>
      </Card>
    </section>
  );
};

// Komponen reusable untuk baris data
interface DataItemProps {
  label: string;
  value: string | number;
  copyable?: boolean;
  onCopy?: () => void;
  copied?: boolean;
}

const DataItem = ({
  label,
  value,
  copyable = false,
  onCopy,
  copied,
}: DataItemProps) => (
  <div className="flex">
    <div className="w-40 flex-shrink-0">
      <p className="font-bold text-slate-900">{label}</p>
    </div>
    <div className="flex-1">
      <p className="text-gray-900 flex items-center gap-2">
        {value}{" "}
        {copyable && onCopy && (
          <span className="cursor-pointer" onClick={onCopy}>
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
);

export default PersonalDataTab;
