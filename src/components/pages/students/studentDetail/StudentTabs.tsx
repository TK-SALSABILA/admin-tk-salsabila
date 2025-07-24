"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import StudentRaportTab from "./raport/StudentRaportTab";
import StudentAbsenceTabs from "./absence/StudentAbsenceTab";
import PersonalDataTab from "./personal-data/PersonalDataTab";
import ParentDataTab from "./parent-data/ParentDataTab";
import {
  useGetParentStudentByStudentIdQuery,
  useGetStudentByIdQuery,
} from "@/hooks/query/useStudentQuery";
import { Button } from "@/components/ui/button";

const StudentTabs = ({ id }: { id: string }) => {
  const { data: student, isLoading: personalLoading } =
    useGetStudentByIdQuery(id);
  const { data: parent, isLoading: parentLoading } =
    useGetParentStudentByStudentIdQuery(id);
  return (
    <Tabs defaultValue="personal-data" className="w-full">
      <div className="flex justify-between w-full">
        <TabsList>
          <TabsTrigger value="personal-data">Data Pribadi</TabsTrigger>
          <TabsTrigger value="parent-data">Data Orang Tua</TabsTrigger>
          <TabsTrigger value="absensi">Absensi</TabsTrigger>
          <TabsTrigger value="raport">Raport</TabsTrigger>
          <Button>Edit Data</Button>
        </TabsList>
      </div>
      <TabsContent value="personal-data">
        <PersonalDataTab
          loading={personalLoading}
          personal={student?.data as any}
        />
      </TabsContent>
      <TabsContent value="parent-data">
        <ParentDataTab data={parent?.data as any} loading={parentLoading} />
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
