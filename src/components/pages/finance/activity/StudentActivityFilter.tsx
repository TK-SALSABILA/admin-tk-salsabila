import {
  FilterConfig,
  ReusableFilter,
} from "@/components/shared/ReusableFilter";
import { Button } from "@/components/ui/button";
import { PlusSquareIcon } from "lucide-react";
import React from "react";

const StudentActivityFilters = () => {
  const schoolYear: FilterConfig[] = [
    {
      type: "select",
      key: "tahun_ajaran",
      placeholder: "Tahun Ajaran",
      options: [
        { value: "2025-2026", label: "2025-2026" },
        { value: "2024-2025", label: "2024-2025" },
        { value: "2023-2024", label: "2023-2024" },
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

  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex flex-row items-start gap-2">
        <ReusableFilter
          filters={schoolYear}
          key={schoolYear[0].key}
          actions={null}
        />
        <ReusableFilter filters={classs} key={classs[0].key} actions={null} />
      </div>
      <div className="">
        <ReusableFilter
          filters={[]}
          searchConfig={{
            placeholder: "Cari Nama Kegiatan",
            searchKey: "search",
          }}
          actions={
            <Button>
              <PlusSquareIcon /> Tambah Kegiatan
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default StudentActivityFilters;
