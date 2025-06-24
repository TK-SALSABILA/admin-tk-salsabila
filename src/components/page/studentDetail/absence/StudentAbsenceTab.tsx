import CustomCard from "@/components/shared/CustomCard";
import { CheckCircle } from "lucide-react";
import React from "react";
import StudentAbsenceTable from "./StudentAbsenceTable";

const StudentAbsenceTabs = () => {
  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CustomCard
          title="Total Kehadiran"
          headerRight={<CheckCircle />}
          children={
            <div>
              <h2>96%</h2>
              <p className="text-xs text-muted-foreground">
                dari 100hari sekolah
              </p>
            </div>
          }
        />
        <CustomCard
          title="Total Kehadiran"
          headerRight={<CheckCircle />}
          children={
            <div>
              <h2>96%</h2>
              <p className="text-xs text-muted-foreground">
                dari 100hari sekolah
              </p>
            </div>
          }
        />
      </div>
      <StudentAbsenceTable />
    </div>
  );
};

export default StudentAbsenceTabs;
