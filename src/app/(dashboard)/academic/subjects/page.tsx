import SubjectsPage from "@/components/pages/academic/subjects/SubjectsPage";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <SubjectsPage />
    </Suspense>
  );
};

export default page;
