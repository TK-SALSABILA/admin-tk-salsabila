import CustomCard from "@/components/shared/CustomCard";
import TooltipInfo from "@/components/shared/TooltipInfo";
import React from "react";
import { dummyRaporSiswa } from "@/data/studentsData";
import StudentRaportTable from "./StudentRaportTable";
import StudentsRaportFilter from "./StudentRaportFilter";

const StudentRaportTab = () => {
  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CustomCard
          title="Jumlah mata pelajaran"
          headerRight={<TooltipInfo text="Jumlah mata pelajaran" />}
          children={<p>{dummyRaporSiswa.length}</p>}
        />
        <CustomCard
          title="Jumlah mata pelajaran"
          headerRight={<TooltipInfo text="Jumlah mata pelajaran" />}
          children={<p>{dummyRaporSiswa.length}</p>}
        />
      </div>
      <StudentsRaportFilter/>
      <StudentRaportTable />
    </div>
  );
};

export default StudentRaportTab;
