"use client";

import PageHeader from "@/components/shared/PageHeder";
import React from "react";
import StudentsProfile from "./StudentProfile";
import StudentTabs from "./StudentTabs";
import {
  useGetParentStudentByStudentIdQuery,
  useGetStudentByIdQuery,
} from "@/hooks/query/useStudentQuery";
import { Parent, Student } from "@/types/student";

const StudentsPageDetail = ({ id }: { id: string }) => {
  const { data: student, isLoading: personalLoading } =
    useGetStudentByIdQuery(id);
  const { data: parent, isLoading: parentLoading } =
    useGetParentStudentByStudentIdQuery(id);
  return (
    <div className='space-y-6'>
      <PageHeader
        pages={["Data Siswa", "Detail Siswa"]}
        pageDesc='Data detail siswa mengenai akademik dan keuangan'
      />
      <StudentsProfile student={student?.data as Student} />
      <div className='flex'>
        <StudentTabs
          student={student?.data as Student}
          parent={parent?.data as Parent}
          personalLoading={personalLoading}
          parentLoading={parentLoading}
        />
      </div>
    </div>
  );
};

export default StudentsPageDetail;
