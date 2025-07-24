import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import StudentSavingTab from "./savings/StudentSavingTab";
import AllTabsSection from "./all-finance/AllTabsFInance";
import OperationalTab from "./operational/OperationalTab";
import StudentActivityTab from "./activity/StudentActivityTab";

const FinanceTabs = () => {
  return (
    <Tabs className="w-full" defaultValue="operational">
      <TabsList className="bg-transparent border-b-2 border-gray-200">
        <TabsTrigger value="operational">Operasional</TabsTrigger>
        <TabsTrigger value="savings">Tabungan</TabsTrigger>
      </TabsList>
      <TabsContent value="operational">
        <OperationalTab />
      </TabsContent>
      <TabsContent value="savings">
        <StudentSavingTab />
      </TabsContent>
    </Tabs>
  );
};

export default FinanceTabs;
