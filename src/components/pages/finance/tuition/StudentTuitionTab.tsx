"use client";

import { paymentData } from "@/data/studentsData";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useGetTuitionQuery } from "@/hooks/query/useTuitionQuery";
import { StudentTuitionTable } from "./StudentTuitionTable";
import StudentTuitionFilters from "./StudentTuitionFilters";
import LoadingSkeletonTable from "@/components/shared/LoadingSkeletonTable";

const StudentTuitionTab = () => {
  const { data, isPending, isError } = useGetTuitionQuery({
    classId: "06dc95f4-0f5a-4cf4-aba9-d6865d6e55e3",
    month: "2025-01",
  });
  const tuitionPayments = paymentData.filter(
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
      <StudentTuitionFilters />
      {isPending ? (
        <LoadingSkeletonTable />
      ) : isError ? (
        <div className="flex w-full h-full items-center  text-red-500 font-semibold">
          <span className="text-center">
            Terjadi kesalahan saat mengambil data SPP.
          </span>
        </div>
      ) : (
      <StudentTuitionTable data={data?.data} />
      )}
    </div>
  );
};

export default StudentTuitionTab;
