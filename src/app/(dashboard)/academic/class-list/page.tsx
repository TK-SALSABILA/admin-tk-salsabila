import ClassListPage from "@/components/pages/academic/class-list/ClassListPage";
import React, { Suspense } from "react";

const ClassList = () => {
  return (
    <Suspense>
      <ClassListPage />
    </Suspense>
  );
};

export default ClassList;
