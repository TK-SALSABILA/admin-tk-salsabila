"use client";

import { paymentData } from "@/data/studentsData";
import { CheckCircle } from "lucide-react";
import React from "react";
import { StudentSavingTable } from "./StudentSavingTable";
import { useRouter, useSearchParams } from "next/navigation";
import StudentSavingFilters from "./StudentSavingFilters";
import CustomCardFinance from "@/components/shared/CustomCardFinance";
import { useGetSavingsQuery } from "@/hooks/query/useSavingQuery";
import LoadingSkeletonTable from "@/components/shared/LoadingSkeletonTable";
import CustomPagination from "@/components/shared/CustomPagination";
import { createURLParamsHelper } from "@/utils/urlParams";

const StudentSavingTab = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlHelper = createURLParamsHelper(searchParams, router);
  const paginationParams = urlHelper.getPaginationParams(1, 10);
  const { data, isPending, isError } = useGetSavingsQuery(paginationParams);


  const handlePageChange = (page: number) => {
    urlHelper.updatePage(page);
  };

  const handleItemsPerPageChange = (rpp: number) => {
    urlHelper.updateItemsPerPage(rpp);
  };

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CustomCardFinance
          title="Total Tabungan"
          total={1000000}
          desc={`dari ${paymentData.length} pembayaran`}
          headerRight={<CheckCircle />}
        />
        <CustomCardFinance
          title="Total Denda"
          total={49999}
          desc={`dari ${100} pembayaran`}
          headerRight={<CheckCircle />}
        />
      </div>
      <StudentSavingFilters />
      {isPending ? (
        <LoadingSkeletonTable />
      ) : isError ? (
        <div>Error loading data</div>
      ) : (
        <StudentSavingTable data={data.data} />
      )}

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
  );
};

export default StudentSavingTab;
