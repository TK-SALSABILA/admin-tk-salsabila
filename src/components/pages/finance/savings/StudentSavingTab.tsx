"use client";

import { paymentData } from "@/data/studentsData";
import { CheckCircle } from "lucide-react";
import React from "react";
import { StudentSavingTable } from "./StudentSavingTable";
import { useSearchParams } from "next/navigation";
import StudentSavingFilters from "./StudentSavingFilters";
import CustomCardFinance from "@/components/shared/CustomCardFinance";
import { useGetSavingsQuery } from "@/hooks/query/useSavingQuery";

const StudentSavingTab = () => {
  const { data, isPending } = useGetSavingsQuery({ page: 1, rpp: 10 });
  const sppPayments = paymentData.filter(
    (item) => item.jenisPembayaran === "SPP"
  );

  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  // Hitung total pembayaran
  const totalAmount = paymentData.reduce((total, item) => {
    const amount = parseInt(item.jumlah.replace(/[^\d]/g, ""));
    return total + amount;
  }, 0);

  const totalDenda = paymentData
    .filter((item) => item.jenisPembayaran === "Denda")
    .reduce((total, item) => {
      const amount = parseInt(item.jumlah.replace(/[^\d]/g, ""));
      return total + amount;
    }, 0);

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CustomCardFinance
          title="Total Tabungan"
          total={totalAmount}
          desc={`dari ${paymentData.length} pembayaran`}
          headerRight={<CheckCircle />}
        />
        <CustomCardFinance
          title="Total Denda"
          total={totalDenda}
          desc={`dari ${sppPayments.length} pembayaran`}
          headerRight={<CheckCircle />}
        />
      </div>
      <StudentSavingFilters />
      <StudentSavingTable />
    </div>
  );
};

export default StudentSavingTab;
