import {
  FilterConfig,
  ReusableFilter,
} from "@/components/shared/ReusableFilter";
import { Button } from "@/components/ui/button";
import { PlusSquareIcon } from "lucide-react";
import React from "react";

const OperationalFilter = () => {
  const year: FilterConfig[] = [
    {
      type: "select",
      key: "tahun_ajaran",
      placeholder: "Tahun Ajaran",
      options: [
        { value: "2026", label: "2026" },
        { value: "2025", label: "2025" },
        { value: "2024", label: "2024" },
        { value: "2023", label: "2023" },
      ],
    },
  ];

  const classs: FilterConfig[] = [
    {
      type: "select",
      key: "kelas",
      placeholder: "Kelas",
      options: [
        { value: "1", label: "Kelas 1" },
        { value: "2", label: "Kelas 2" },
        { value: "3", label: "Kelas 3" },
      ],
    },
  ];

  const month: FilterConfig[] = [
    {
      type: "select",
      key: "bulan",
      placeholder: "Bulan",
      options: [
        { value: "1", label: "Januari" },
        { value: "2", label: "Februari" },
        { value: "3", label: "Maret" },
        { value: "4", label: "April" },
        { value: "5", label: "Mei" },
        { value: "6", label: "Juni" },
        { value: "7", label: "Juli" },
        { value: "8", label: "Agustus" },
        { value: "9", label: "September" },
        { value: "10", label: "Oktober" },
        { value: "11", label: "November" },
        { value: "12", label: "Desember" },
      ],
    },
  ];
  const status: FilterConfig[] = [
    {
      type: "select",
      key: "status",
      placeholder: "Status Pembayaran",
      width: "w-[200px]",
      options: [
        { value: "lunas", label: "Lunas" },
        { value: "sudah_dibayar", label: "Sudah Dibayar" },
        { value: "tidak_dibayar", label: "Tidak Dibayar" },
        { value: "menunggu_konfirmasi", label: "Menunggu Konfirmasi" },
      ],
    },
  ];
  return (
    <div className="flex justify-between mt-2">
      <div className="flex flex-row items-start gap-2">
        <ReusableFilter filters={year} key={year[0].key} actions={null} />
        <ReusableFilter
          filters={month}
          key={month[0].key}
          actions={null}
        />
        <ReusableFilter filters={classs} key={classs[0].key} actions={null} />
        <ReusableFilter filters={status} key={status[0].key} actions={null} />
      </div>
      <div className="">
        <ReusableFilter
          filters={[]}
          searchConfig={{ placeholder: "Cari", searchKey: "search" }}
          actions={
            <Button>
              <PlusSquareIcon /> Tambah Pembayaran
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default OperationalFilter;
