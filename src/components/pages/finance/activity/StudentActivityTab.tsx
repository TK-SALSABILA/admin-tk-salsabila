"use client";

import React from "react";
import StudentActivityTable from "./StudentActivityTable";
import StudentActivityFilters from "./StudentActivityFilter";
import CustomCardFinance from "@/components/shared/CustomCardFinance";

const StudentActivityTab = () => {
  return (
    <section className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <CustomCardFinance
          total={5}
          title="Total Kegiatan"
          desc="Ditahun ajaran 2025-2026"
          noCurrnecy={true}
        />
        <CustomCardFinance
          title="Total Dana Terkumpul"
          desc="Untuk 5 Kegiatan"
          total={1200000}
        />
        <CustomCardFinance
          title="Dana Dibutuhkan"
          total={5000000}
          desc="Untuk 5 Kegiatan"
        />
      </div>
      <StudentActivityFilters />
      <StudentActivityTable />
    </section>
  );
};

export default StudentActivityTab;
