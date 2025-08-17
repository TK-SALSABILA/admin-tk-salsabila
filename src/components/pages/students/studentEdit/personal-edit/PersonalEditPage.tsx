"use client";

import PageHeader from "@/components/shared/PageHeder";
import React from "react";
import FormEditStudentData from "./FormEditStudentData";
import { useGetStudentByIdQuery } from "@/hooks/query/useStudentQuery";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useRouter } from "next/navigation";
import { StudentFormData } from "@/schema/studentSchema";
import { useUpdateStudentMutations } from "@/hooks/mutation/useStudentMutations";

interface PersonalEditPageProps {
  id: string;
}

const PersonalEditPage = ({ id }: PersonalEditPageProps) => {
  const { data, isError, isLoading } = useGetStudentByIdQuery(id);
  const { mutateAsync, isPending } = useUpdateStudentMutations();
  const router = useRouter();

  const handleUpdateStudent = async (
    studentId: string,
    formData: StudentFormData
  ) => {
    try {
      const response = await mutateAsync({ id: studentId, data: formData });
      router.push(`/students/${studentId}`);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleCancel = () => {
    router.push(`/students/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8 min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <section>
        <PageHeader
          pages={["Data Siswa", "Edit Data Pribadi"]}
          pageDesc={`Edit Personal Information for Student ID: ${id}`}
        />
        <div className="flex justify-center items-center py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-700">
              Gagal memuat data siswa
            </h2>
            <p className="text-gray-500 mt-2">
              Terjadi kesalahan saat mengambil data siswa.
            </p>
            <button
              onClick={() => router.push("/students")}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Kembali ke Daftar Siswa
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-2">
      <PageHeader
        pages={["Data Siswa", "Edit Data Pribadi"]}
        pageDesc={`Edit Data Pribadi ${data.data.fullName}`}
      />
      <FormEditStudentData
        onUpdate={handleUpdateStudent}
        studentData={data.data}
        isLoading={isPending}
        onCancel={handleCancel}
      />
    </section>
  );
};

export default PersonalEditPage;
