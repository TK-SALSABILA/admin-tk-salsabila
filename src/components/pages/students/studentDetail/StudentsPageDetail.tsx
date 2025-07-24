import PageHeader from "@/components/shared/PageHeder";
import React from "react";
import StudentsProfile from "./StudentProfile";
import StudentTabs from "./StudentTabs";
import { Button } from "@/components/ui/button";
import ButtonOpenModal from "@/components/shared/ButtonOpenModal";

const StudentsPageDetail = ({ id }: { id: string }) => {
  return (
    <div className="space-y-6">
      <PageHeader
        pages={["Data Siswa", "Detail Siswa"]}
        pageDesc="Data detail siswa mengenai akademik dan keuangan"
      />
      <StudentsProfile />
      <div className="flex">
        <StudentTabs id={id} />
        
      </div>
    </div>
  );
};

export default StudentsPageDetail;
