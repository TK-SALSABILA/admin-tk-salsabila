import PageHeader from "@/components/shared/PageHeder";
import React from "react";
import StudentsProfile from "./StudentProfile";
import StudentTabs from "./StudentTabs";

const StudentsPageDetail = ({ id }: { id: string }) => {
  return (
    <div className="space-y-6">
      <PageHeader
        pages={["Data Siswa", "Detail Siswa"]}
        pageDesc="Data detail siswa mengenai akademik dan keuangan"
      />
      <StudentsProfile />
      <StudentTabs id={id}/>
    </div>
  );
};

export default StudentsPageDetail;
