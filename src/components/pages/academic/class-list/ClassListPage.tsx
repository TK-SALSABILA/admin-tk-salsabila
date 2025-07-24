"use client";

import CustomCard from "@/components/shared/CustomCard";
import PageHeader from "@/components/shared/PageHeder";
import { useGetGradeQuery } from "@/hooks/query/useGradeQuery";
import { CheckCircle2 } from "lucide-react";
import React, { useState } from "react";
import ClassListTable from "./ClassListTable";
import ClassListFIlter from "./ClassListFIlter";
import LoadingSkeletonTable from "@/components/shared/LoadingSkeletonTable";
import CustomPagination from "@/components/shared/CustomPagination";
import { useRouter, useSearchParams } from "next/navigation";
import { createURLParamsHelper } from "@/utils/urlParams";

const ClassListPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlHelper = createURLParamsHelper(searchParams, router);
  const paginationParams = urlHelper.getPaginationParams(1, 10);

  const { data, isPending, isError } = useGetGradeQuery(paginationParams);

  const handlePageChange = (page: number) => {
    urlHelper.updatePage(page);
  };

  const handleItemsPerPageChange = (rpp: number) => {
    urlHelper.updateItemsPerPage(rpp);
  };

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
          children={
            <p className="text-2xl font-bold">
              {data?.meta?.totalRecords || 0}
            </p>
          }
        />
        <CustomCard
          headerRight={<CheckCircle2 />}
          title="Jumlah Siswa"
          children={<p className="text-2xl font-bold">200</p>}
        />
      </div>

      <div className="">
        <ClassListFIlter />
      </div>

      <div className="space-y-4">
        {isPending ? (
          <LoadingSkeletonTable />
        ) : isError ? (
          <div className="flex w-full h-full items-center text-red-500 font-semibold">
            <span className="text-center">
              Terjadi kesalahan saat mengambil data siswa.
            </span>
          </div>
        ) : (
          <ClassListTable data={data?.data || []} />
        )}

        {/* Show pagination only if data exists and not loading */}
        {!isPending && !isError && data?.meta && (
          <CustomPagination
            currentPage={paginationParams.page}
            itemsPerPage={paginationParams.rpp}
            totalItems={data.meta.totalRecords}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            showItemsPerPageSelector={true}
            itemsPerPageOptions={[5, 10, 25, 50]}
          />
        )}
      </div>
    </div>
  );
};

export default ClassListPage;
