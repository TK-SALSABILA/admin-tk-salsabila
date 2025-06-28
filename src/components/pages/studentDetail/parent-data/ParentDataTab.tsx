"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, CopyCheck } from "lucide-react";
import { toast } from "sonner";


const mockData = {
  father: {
    name: "Budi Santoso",
    status: "Ayah Kandung",
    placeOfBirth: "Jakarta",
    dateOfBirth: "Senin, 15 Januari 1985",
    age: "40 Tahun 5 Bulan",
    nationality: "Indonesia",
    religion: "Islam",
    address:
      "Jl. Raya seribu No. 99. Kec. Seribu, Pulau Seribu. Jakarta, Indonesia",
    income: "Rp5.000.000,00",
    phone: "081234567812",
    email: "budi@mail.com",
  },
  mother: {
    name: "Siti Rahayu",
    status: "Ibu Kandung",
    placeOfBirth: "Bandung",
    dateOfBirth: "Rabu, 22 Maret 1987",
    age: "38 Tahun 3 Bulan",
    nationality: "Indonesia",
    religion: "Islam",
    address:
      "Jl. Raya seribu No. 99. Kec. Seribu, Pulau Seribu. Jakarta, Indonesia",
    income: "Rp5.000.000,00",
    phone: "081234567813",
    email: "siti@mail.com",
  },
};

const ParentDataTab = () => {
  const { father, mother } = mockData;
  const [copiedItems, setCopiedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

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

  const getParentLabel = (key: string) => {
    const labels: { [key: string]: string } = {
      name: "Nama",
      status: "Status Orang Tua",
      placeOfBirth: "Tempat Lahir",
      dateOfBirth: "Tanggal Lahir",
      age: "Usia",
      nationality: "Warga Negara",
      religion: "Agama",
      address: "Alamat",
      income: "Penghasilan",
      phone: "Nomor Telepon",
      email: "Email",
    };
    return labels[key] || key;
  };

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
          <div className="mb-6 max-w-[750px]">
            <h4 className="text-md font-semibold text-blue-900 mb-4 bg-blue-50 px-3 py-2 rounded">
              Data Ayah
            </h4>
            <div className="space-y-4">
              {Object.entries(father).map(([key, value]) => (
                <div key={key} className="flex">
                  <div className="w-40 flex-shrink-0">
                    <p className="font-bold text-slate-900">
                      {getParentLabel(key)}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 flex items-center gap-2">
                      {value}
                      {(key === "phone" || key === "email") && (
                        <span
                          className="cursor-pointer hover:text-blue-600 transition-colors"
                          onClick={() =>
                            handleCopy(
                              `father-${key}`,
                              value,
                              getParentLabel(key)
                            )
                          }
                        >
                          {copiedItems[`father-${key}`] ? (
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

          {/* Data Ibu */}
          <div className="mb-6 max-w-[750px]">
            <h4 className="text-md font-semibold text-blue-900 mb-4 bg-blue-50 px-3 py-2 rounded">
              Data Ibu
            </h4>
            <div className="space-y-4">
              {Object.entries(mother).map(([key, value]) => (
                <div key={key} className="flex">
                  <div className="w-40 flex-shrink-0">
                    <p className="font-bold text-slate-900">
                      {getParentLabel(key)}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 flex items-center gap-2">
                      {value}
                      {(key === "phone" || key === "email") && (
                        <span
                          className="cursor-pointer hover:text-blue-600 transition-colors"
                          onClick={() =>
                            handleCopy(
                              `mother-${key}`,
                              value,
                              getParentLabel(key)
                            )
                          }
                        >
                          {copiedItems[`mother-${key}`] ? (
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
        </CardContent>
      </Card>
    </section>
  );
};

export default ParentDataTab;
