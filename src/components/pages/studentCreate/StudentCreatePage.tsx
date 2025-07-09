"use client";

import PageHeader from "@/components/shared/PageHeder";
import { ParentFormData, StudentFormData } from "@/schema/studentSchema";
import React, { useState } from "react";
import { FormCreateStudentData } from "./FormCreateStudentData";
import { FormParentData } from "./FormParrentData";
import { useCreateStudentMutations } from "@/hooks/mutation/useStudentMutations";

const StudentCreatePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [studentData, setStudentData] = useState<StudentFormData | null>(null);
  const { mutateAsync, isPending } = useCreateStudentMutations();

  const handleStudentFormNext = (data: StudentFormData) => {
    setStudentData(data);
    setCurrentStep(2);
  };

  const handleParentFormSubmit = (parentData: ParentFormData) => {
    if (studentData) {
      const completeData = {
        ...studentData,
        parent: parentData,
      };
      mutateAsync(completeData);
    }
  };

  const handleBackToStudentForm = () => {
    setCurrentStep(1);
  };
  return (
    <div className="space-y-6">
      <PageHeader
        pageDesc="Masukan detail siswa baru dan data pendukungnya."
        pages={["Data Siswa", "Tambah Siswa"]}
      />
      {currentStep === 1 && (
        <FormCreateStudentData
          onNext={handleStudentFormNext}
          initialData={studentData || undefined}
        />
      )}

      {currentStep === 2 && (
        <FormParentData
          onSubmit={handleParentFormSubmit}
          onBack={handleBackToStudentForm}
          studentAddress={studentData?.address || ""}
        />
      )}
    </div>
  );
};

export default StudentCreatePage;
