import StudentsPage from "@/components/pages/students/StudentsPage";
import React, { Suspense } from "react";

export default function Students() {
  return (
    <Suspense>
      <StudentsPage />
    </Suspense>
  );
}
