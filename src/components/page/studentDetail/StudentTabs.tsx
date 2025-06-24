import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import StudentRaportTab from "./raport/StudentRaportTab";
import StudentAbsenceTabs from "./absence/StudentAbsenceTab";
import StudentSavingTab from "./savings/StudentSavingTab";

const StudentTabs = () => {
  return (
    <Tabs defaultValue="raport" className="w-full">
      <TabsList>
        <TabsTrigger value="raport">Raport</TabsTrigger>
        <TabsTrigger value="absensi">Absensi</TabsTrigger>
        <TabsTrigger value="tabungan">Tabungan</TabsTrigger>
      </TabsList>
      <TabsContent value="raport">
        <StudentRaportTab />
      </TabsContent>
      <TabsContent value="absensi">
        <StudentAbsenceTabs />
      </TabsContent>
      <TabsContent value="tabungan">
        <StudentSavingTab/>
      </TabsContent>
    </Tabs>
  );
};

export default StudentTabs;
