"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, CopyCheck } from "lucide-react";
import { toast } from "sonner";
import { Parent } from "@/types/student";
import TabLoader from "@/components/shared/TabLoader";
import { format } from "date-fns";

interface ParentDataTabProps {
  data: Parent;
  loading: boolean;
}

const ParentDataTab: React.FC<ParentDataTabProps> = ({ data, loading }) => {
  const [copiedItems, setCopiedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  if (loading) return <TabLoader />;

  const handleCopy = (key: string, value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast.success(`${label} berhasil disalin`);

    setCopiedItems((prev) => ({
      ...prev,
      [key]: true,
    }));

    // Reset after 2 seconds
    setTimeout(() => {
      setCopiedItems((prev) => ({
        ...prev,
        [key]: false,
      }));
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const fatherData = [
    { key: "name", label: "Nama", value: data.fatherName },
    { key: "nik", label: "NIK", value: data.fatherNik, copyable: true },
    {
      key: "dateOfBirth",
      label: "Tanggal Lahir",
      value: format(data.fatherDateBirth, "dd MMMM yyyy"),
    },
    { key: "education", label: "Pendidikan", value: data.fatherEducation },
    { key: "job", label: "Pekerjaan", value: data.fatherJob },
    { key: "citizen", label: "Kewarganegaraan", value: data.fatherCitizen },
    {
      key: "income",
      label: "Penghasilan",
      value: formatCurrency(data.fatherIncome),
    },
    { key: "address", label: "Alamat", value: data.fatherAddress },
    {
      key: "phone",
      label: "Nomor Telepon",
      value: data.fatherPhone,
    },
  ];

  const motherData = [
    { key: "name", label: "Nama", value: data.motherName },
    { key: "nik", label: "NIK", value: data.motherNik, copyable: true },
    {
      key: "dateOfBirth",
      label: "Tanggal Lahir",
      value: format(data.motherDateBirth, "dd MMMM yyyy"),
    },
    { key: "education", label: "Pendidikan", value: data.motherEducation },
    { key: "citizen", label: "Kewarganegaraan", value: data.motherCitizen },
    {
      key: "income",
      label: "Penghasilan",
      value: formatCurrency(data.motherIncome),
    },
    { key: "address", label: "Alamat", value: data.motherAddress },
    {
      key: "phone",
      label: "Nomor Telepon",
      value: data.motherPhone,
    },
  ];

  const renderDataSection = (
    title: string,
    dataArray: any[],
    prefix: string
  ) => (
    <div className="mb-6 max-w-[750px]">
      <h4 className="text-md font-semibold text-blue-900 mb-4 bg-blue-50 px-3 py-2 rounded">
        {title}
      </h4>
      <div className="space-y-4">
        {dataArray.map((item) => (
          <div key={item.key} className="flex">
            <div className="w-40 flex-shrink-0">
              <p className="font-bold text-slate-900">{item.label}</p>
            </div>
            <div className="flex-1">
              <p className="text-gray-900 flex items-center gap-2">
                {item.value}
                {item.copyable && (
                  <span
                    className="cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={() =>
                      handleCopy(
                        `${prefix}-${item.key}`,
                        item.value,
                        item.label
                      )
                    }
                  >
                    {copiedItems[`${prefix}-${item.key}`] ? (
                      <CopyCheck className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    )}
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Data Orang Tua
          </CardTitle>
          <p className="text-sm text-muted-foreground">Data orang tua siswa</p>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          {/* Data Ayah */}
          {renderDataSection("Data Ayah", fatherData, "father")}

          {/* Data Ibu */}
          {renderDataSection("Data Ibu", motherData, "mother")}
        </CardContent>
      </Card>
    </section>
  );
};

export default ParentDataTab;
