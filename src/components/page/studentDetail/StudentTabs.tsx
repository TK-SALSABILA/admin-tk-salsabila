import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import StudentRaportTab from "./raport/StudentRaportTab";
import StudentAbsenceTabs from "./absence/StudentAbsenceTab";
import StudentSavingTab from "./savings/StudentSavingTab";
import PersonalDataTab from "./personal-data/PersonalDataTab";
import ParentDataTab from "./parent-data/ParentDataTab";

const StudentTabs = () => {
  return (
    <Tabs defaultValue="personal-data" className="w-full">
      <TabsList>
        <TabsTrigger value="personal-data">Data Pribadi</TabsTrigger>
        <TabsTrigger value="parent-data">Data Orang Tua</TabsTrigger>
        <TabsTrigger value="absensi">Absensi</TabsTrigger>
        <TabsTrigger value="raport">Raport</TabsTrigger>
      </TabsList>
      <TabsContent value="personal-data">
        <PersonalDataTab />
      </TabsContent>
      <TabsContent value="parent-data">
        <ParentDataTab />
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
