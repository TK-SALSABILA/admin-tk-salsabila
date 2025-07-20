"use client";

import CustomCard from "@/components/shared/CustomCard";
import PageHeader from "@/components/shared/PageHeder";
import { useGetGradeQuery } from "@/hooks/query/useGradeQuery";
import { CheckCircle2 } from "lucide-react";
import React from "react";
import ClassListTable from "./ClassListTable";
import { Skeleton } from "@/components/ui/skeleton";
import ClassListFIlter from "./ClassListFIlter";

const ClassListPage = () => {
  const { data, isPending , isError} = useGetGradeQuery({ page: 1, rpp: 10 });
  return (
    <div className="space-y-4">
      <PageHeader
        pages={["Akademik", "Daftar Kelas"]}
        pageDesc="Daftar kelas dan jumlah siswa per kelas."
      />
      <div className="grid grid-cols-2 gap-2">
        <CustomCard
          headerRight={<CheckCircle2 />}
          title="Jumlah Kelas"
          children={<p className="text-2xl font-bold">5</p>}
        />
        <CustomCard
          headerRight={<CheckCircle2 />}
          title="Jumlah Siswa"
          children={<p className="text-2xl font-bold">200</p>}
        />
      </div>
      <div className="">
        <ClassListFIlter/>
      </div>
      <div className="">
        {isPending && (
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
        <ClassListTable data={data?.data || []} />
      </div>
    </div>
  );
};

export default ClassListPage;
