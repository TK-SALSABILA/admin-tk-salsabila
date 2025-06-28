import {
  FilterConfig,
  ReusableFilter,
} from "@/components/shared/ReusableFilter";
import { Button } from "@/components/ui/button";
import { Plus, PlusSquareIcon } from "lucide-react";
import React from "react";

const ActivityPartisipanFilters = () => {
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
    <div className="flex justify-between">
      <ReusableFilter filters={classs} key={classs[0].key} actions={null} />
      <ReusableFilter
        filters={[]}
        searchConfig={{ placeholder: "Cari Nama Siswa", searchKey: "search" }}
        actions={
          <Button>
            <PlusSquareIcon /> Tambah Pembayaran
          </Button>
        }
      />
    </div>
  );
};

export default ActivityPartisipanFilters;
