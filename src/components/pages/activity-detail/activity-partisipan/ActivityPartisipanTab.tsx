"use client";

import React from "react";
import CustomCardFinance from "@/components/shared/CustomCardFinance";
import { StudentPartisipanTable } from "./ActivityPartipisanTable";
import ActivityPartisipanFilters from "./ActivityPartisipanFilters";

const ActivityPartisipanTab = () => {
  return (
    <div className="w-full space-y-4">
      <div className="w-full grid grid-cols-3 gap-4">
        <CustomCardFinance
          total={"50 Anak"}
          noCurrnecy={true}
          title="Jumlah Partisipan"
          desc=""
        />
        <CustomCardFinance
          total={"2 Kelas"}
          noCurrnecy={true}
          title="Jumlah Kelas"
          desc=""
        />
      </div>
      <ActivityPartisipanFilters/>
      <StudentPartisipanTable/>
    </div>
  );
};

export default ActivityPartisipanTab;
