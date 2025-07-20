"use client";

import PageHeader from "@/components/shared/PageHeder";
import { useGetGradeQuery } from "@/hooks/query/useGradeQuery";
import React from "react";
import SubjectsFilter from "./SubjectsFilter";
import SubjectsTable from "./SubjectsTable";
import LoadingSkeletonTable from "@/components/shared/LoadingSkeletonTable";
import { useGetSubjects } from "@/hooks/query/useSubjectQuery";

const SubjectsPage = () => {
  const { data, isPending, isError } = useGetSubjects({ page: 1, rpp: 10 });
  return (
    <div className="space-y-4">
      <PageHeader
        pages={["Akademik", "Mata Pelajaran"]}
        pageDesc="Daftar mata pelajaran dan pengaturan akademik."
      />
      <div className="">
        <SubjectsFilter />
      </div>
      <div className="">
        {isPending ? (
          <LoadingSkeletonTable />
        ) : isError ? (
          <div className="...">Terjadi kesalahan...</div>
        ) : (
          <SubjectsTable data={data?.data || []} />
        )}
      </div>
    </div>
  );
};

export default SubjectsPage;
