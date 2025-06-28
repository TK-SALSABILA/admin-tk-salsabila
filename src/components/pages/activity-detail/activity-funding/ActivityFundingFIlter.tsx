import {
  FilterConfig,
  ReusableFilter,
} from "@/components/shared/ReusableFilter";
import { Button } from "@/components/ui/button";
import { Plus, PlusSquareIcon } from "lucide-react";
import React from "react";

const ActivityFundingFilters = () => {
  const datePayment: FilterConfig[] = [
    {
      type: "select",
      key: "date_payement",
      placeholder: "Tanggal Pembayaran",
      options: [
        { value: "21-april-2025", label: "1 April 2025" },
        { value: "22-mei-2025", label: "2 Mei 2025" },
        { value: "23-mei-2025", label: "4 Mei 2025 " },
      ],
    },
  ];

  return (
    <div className="flex justify-between">
      <ReusableFilter filters={datePayment} key={datePayment[0].key} actions={null} />
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

export default ActivityFundingFilters;
