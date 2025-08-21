"use client";

import PageHeader from "@/components/shared/PageHeder";
import React from "react";
import StudentsFilter from "./StudentsFilter";
import { useGetStudentsQuery } from "@/hooks/query/useStudentQuery";
import { StudentTable } from "./StudentsTable";
import { Skeleton } from "@/components/ui/skeleton"; // assuming you're using shadcn/ui
import { useRouter, useSearchParams } from "next/navigation";
import { createURLParamsHelper } from "@/utils/urlParams";
import CustomPagination from "@/components/shared/CustomPagination";
import LoadingSkeletonTable from "@/components/shared/LoadingSkeletonTable";

const StudentsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlParams = createURLParamsHelper(searchParams, router);
  const paginationParams = urlParams.getPaginationParams(1, 10);
  const searchStudent = searchParams.get("q") || "";
  const params = {
    ...paginationParams,
    q: searchStudent,
  };
  const { data: students, isPending, isError } = useGetStudentsQuery(params);

  const handlePageChange = (page: number) => {
    urlParams.updatePage(page);
  };

  const handleItemChange = (rpp: number) => {
    urlParams.updateItemsPerPage(rpp);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        pages={["Data Siswa"]}
        pageDesc="Pilih tahun ajaran dan kelas siswa untuk ditampilkan"
      />
      <StudentsFilter />

      {isPending ? (
        <LoadingSkeletonTable />
      ) : isError ? (
        <div className="flex w-full h-full items-center  text-red-500 font-semibold">
          <span className="text-center">
            Terjadi kesalahan saat mengambil data siswa.
          </span>
        </div>
      ) : (
        <StudentTable data={students?.data} />
      )}

      {/* Show pagination only if data exists and not loading */}
      {!isPending && !isError && students?.meta && (
        <CustomPagination
          currentPage={paginationParams.page}
          itemsPerPage={paginationParams.rpp}
          totalItems={students.meta.totalRecords}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemChange}
          showItemsPerPageSelector={true}
          itemsPerPageOptions={[5, 10, 25, 50]}
        />
      )}
    </div>
  );
};

export default StudentsPage;
