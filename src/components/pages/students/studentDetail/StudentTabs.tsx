"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import StudentRaportTab from "./raport/StudentRaportTab";
import StudentAbsenceTabs from "./absence/StudentAbsenceTab";
import PersonalDataTab from "./personal-data/PersonalDataTab";
import ParentDataTab from "./parent-data/ParentDataTab";
import { Button } from "@/components/ui/button";
import { Parent, Student } from "@/types/student";
import { useRouter } from "next/navigation";

interface StudentTabsProps {
  student: Student;
  parent: Parent;
  personalLoading: boolean;
  parentLoading: boolean;
}

const StudentTabs = ({
  student,
  parent,
  personalLoading,
  parentLoading,
}: StudentTabsProps) => {
  const [activeTab, setActiveTab] = useState("personal-data");
  const router = useRouter();

  const handleEdit = () => {
    if (activeTab === "personal-data") {
      router.push(`/students/${student.id}/edit-personal`);
    } else if (activeTab === "parent-data") {
      router.push(`/students/${student.id}/edit-parent`);
    } else {
      console.log("Tidak ada form edit untuk tab ini");
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex justify-between w-full">
        <TabsList>
          <TabsTrigger value="personal-data">Data Pribadi</TabsTrigger>
          <TabsTrigger value="parent-data">Data Orang Tua</TabsTrigger>
          <TabsTrigger value="absensi">Absensi</TabsTrigger>
          <TabsTrigger value="raport">Raport</TabsTrigger>
        </TabsList>
        {(activeTab === "personal-data" || activeTab === "parent-data") && (
          <Button onClick={handleEdit}>Edit Data</Button>
        )}
      </div>
      
      <TabsContent value="personal-data">
        <PersonalDataTab loading={personalLoading} personal={student} />
      </TabsContent>

      <TabsContent value="parent-data">
        <ParentDataTab data={parent} loading={parentLoading} />
      </TabsContent>

      <TabsContent value="absensi">
        <StudentAbsenceTabs />
      </TabsContent>

      <TabsContent value="raport">
        <StudentRaportTab />
      </TabsContent>
    </Tabs>
  );
};

export default StudentTabs;
