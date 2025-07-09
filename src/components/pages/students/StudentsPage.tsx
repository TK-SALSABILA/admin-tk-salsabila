"use client";

import PageHeader from "@/components/shared/PageHeder";
import React from "react";
import StudentsFilter from "./StudentsFilter";
import { useGetStudentsQuery } from "@/hooks/query/useStudentQuery";
import { StudentTable } from "./StudentsTable";
import { Skeleton } from "@/components/ui/skeleton"; // assuming you're using shadcn/ui

const StudentsPage = () => {
  const {
    data: students,
    isLoading,
    isError,
  } = useGetStudentsQuery({ page: 1, rpp: 10 });

  return (
    <div className="space-y-6">
      <PageHeader
        pages={["Data Siswa"]}
        pageDesc="Pilih tahun ajaran dan kelas siswa untuk ditampilkan"
      />
      <StudentsFilter />

      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      )}

      {isError && (
        <div className="flex w-full h-full items-center  text-red-500 font-semibold">
          <span className="text-center">
            Terjadi kesalahan saat mengambil data siswa.
          </span>
        </div>
      )}

      {!isLoading && students?.data?.length === 0 && (
        <div className="text-center text-gray-500">Belum ada data siswa.</div>
      )}

      {students?.data && students.data.length > 0 && (
        <StudentTable data={students.data} />
      )}
    </div>
  );
};

export default StudentsPage;
