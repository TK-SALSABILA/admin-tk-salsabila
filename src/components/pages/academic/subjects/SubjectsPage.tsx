"use client";

import PageHeader from "@/components/shared/PageHeder";
import { useGetGradeQuery } from "@/hooks/query/useGradeQuery";
import React from "react";
import SubjectsFilter from "./SubjectsFilter";
import SubjectsTable from "./SubjectsTable";
import LoadingSkeletonTable from "@/components/shared/LoadingSkeletonTable";
import { useGetSubjects } from "@/hooks/query/useSubjectQuery";
import { useRouter, useSearchParams } from "next/navigation";
import { createURLParamsHelper } from "@/utils/urlParams";
import CustomPagination from "@/components/shared/CustomPagination";

const SubjectsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlHelper = createURLParamsHelper(searchParams, router);
  const paginationParams = urlHelper.getPaginationParams(1, 10);
  const { data, isPending, isError } = useGetSubjects(paginationParams);

  const handlePageChange = (page: number) => {
    urlHelper.updatePage(page);
  };

  const handleItemsPerPageChange = (rpp: number) => {
    urlHelper.updateItemsPerPage(rpp);
  };

  return (
    <div className="space-y-4">
      <PageHeader
        pages={["Akademik", "Mata Pelajaran"]}
        pageDesc="Daftar mata pelajaran dan pengaturan akademik."
      />
      <div className="">
        <SubjectsFilter />
      </div>
      <div className="space-y-4">
        {isPending ? (
          <LoadingSkeletonTable />
        ) : isError ? (
          <div className="...">Terjadi kesalahan...</div>
        ) : (
          <SubjectsTable data={data?.data || []} />
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

export default SubjectsPage;
