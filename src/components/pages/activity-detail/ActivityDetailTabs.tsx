import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import ActivityFunding from "./activity-funding/ActivityFunding";
import ActivityPartisipanTab from "./activity-partisipan/ActivityPartisipanTab";

const ActivityDetailTabs = () => {
  return (
    <section>
      <Tabs defaultValue="funding" className="w-full">
        <TabsList>
          <TabsTrigger value="funding">Funding</TabsTrigger>
          <TabsTrigger value="participants">Daftar Partisipasipan</TabsTrigger>
        </TabsList>
        <TabsContent value="funding">
          <ActivityFunding />
        </TabsContent>
        <TabsContent value="participants">
          <ActivityPartisipanTab />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ActivityDetailTabs;
