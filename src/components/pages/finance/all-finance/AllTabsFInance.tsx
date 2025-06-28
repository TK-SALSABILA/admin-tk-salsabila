"use client";

import CustomCardFinance from "@/components/shared/CustomCardFinance";
import HeadTableDesc from "@/components/shared/HeadTableDesc";
import { ReusableFilter } from "@/components/shared/ReusableFilter";
import { Button } from "@/components/ui/button";
import { PlusSquareIcon } from "lucide-react";
import React from "react";
import TransactionsTable from "./TransactionsTable";

const AllTabsSection = () => {
  return (
    <div className="space-y-4">
      <section className="grid grid-cols-2 gap-4 w-full">
        <CustomCardFinance
          title="Total Tabungan"
          total={1700000}
          desc="dari 10 kali pembayaran"
        />
        <CustomCardFinance
          title="Total Denda"
          total={5600000}
          desc="dari 10 kali pembayaran"
        />
      </section>
      <section className="flex items-center justify-between mt-4 px-1">
        <HeadTableDesc
          title="Daftar Transaksi Pembayaran"
          description="Daftar semua transaksi. Tekan tombol + untuk input pembayaran baru."
        />
        <ReusableFilter
          actions={
            <Button>
              <PlusSquareIcon /> Tambah Pembayaran
            </Button>
          }
          key={undefined}
          filters={[]}
        />
      </section>
      <TransactionsTable />
    </div>
  );
};

export default AllTabsSection;
