"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useGetTuitionQuery } from "@/hooks/query/useTuitionQuery";
import { StudentTuitionTable } from "./StudentTuitionTable";
import StudentTuitionFilters from "./StudentTuitionFilters";
import LoadingSkeletonTable from "@/components/shared/LoadingSkeletonTable";

const StudentTuitionTab = () => {
  const searchParams = useSearchParams();

  // ambil params dari URL
  const classId = searchParams.get("kelas") || "";
  const month = searchParams.get("bulan") || "";

  // langsung kirim ke react-query
  const { data, isPending, isError } = useGetTuitionQuery({
    classId,
    month,
  });

  return (
    <div className="w-full space-y-4">
      <StudentTuitionFilters />

      {isPending ? (
        <LoadingSkeletonTable />
      ) : isError ? (
        <div className="flex w-full h-full items-center text-red-500 font-semibold">
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
