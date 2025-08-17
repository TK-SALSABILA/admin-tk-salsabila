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
    classId: "6507a04f-d5c1-479e-a6b4-55602b09351a",
    month: "2025-08",
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
    <div className='w-full space-y-4'>
      <StudentTuitionFilters />
      {isPending ? (
        <LoadingSkeletonTable />
      ) : isError ? (
        <div className='flex w-full h-full items-center  text-red-500 font-semibold'>
          <span className='text-center'>
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
