"use client";

import PageHeader from "@/components/shared/PageHeder";
import React from "react";
import {
  useGetParentStudentByStudentIdQuery,
  useGetStudentByIdQuery,
} from "@/hooks/query/useStudentQuery";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useRouter } from "next/navigation";
import { ParentFormData, StudentFormData } from "@/schema/studentSchema";
import { useUpdateParrentMutation, useUpdateStudentMutations } from "@/hooks/mutation/useStudentMutations";
import FormEditParentData from "./FormParrentEditData";

interface ParrentEditPageProps {
  studentId: string;
}

const ParrentEditPage = ({ studentId }: ParrentEditPageProps) => {
  const { data, isError, isLoading } = useGetParentStudentByStudentIdQuery(studentId);
  const { mutateAsync, isPending } = useUpdateParrentMutation();
  const router = useRouter();

  const handleUpdateParrent = async (id: string, formData: ParentFormData) => {
    try {
      const response = await mutateAsync({ id, data: formData, studentId });
      router.push(`/students/${studentId}`);
    } catch (error) {
      console.error("Error updating parent:", error);
    }
  };

  const handleCancel = () => {
    router.push(`/students/${studentId}`);
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
          pages={["Data Siswa", "Edit Data Orang Tua"]}
          pageDesc={`Edit Data Orang Tua Siswa`}
        />
        <div className="flex justify-center items-center py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-700">
              Gagal memuat data siswa
            </h2>
            <p className="text-gray-500 mt-2">
              Terjadi kesalahan saat mengambil data keluarga siswa.
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
        pages={["Data Siswa", "Edit Data Orang Tua"]}
        pageDesc={`Edit Data Orang Tua Siswa`}
      />
      <FormEditParentData
        onUpdate={handleUpdateParrent}
        parentData={data.data}
        isLoading={isPending}
        onCancel={handleCancel}
        studentAddress=""
      />
    </section>
  );
};

export default ParrentEditPage;
