"use client";

import CustomCard from "@/components/shared/CustomCard";
import { CircleCheck } from "lucide-react";
import React from "react";
import { StudentFundingTable } from "./StudentFundingTable";
import CustomCardFinance from "@/components/shared/CustomCardFinance";
import ActivityFundingFilters from "./ActivityFundingFIlter";

const ActivityFunding = () => {
  return (
    <div className="w-full space-y-4">
      <div className="w-full grid grid-cols-3 gap-4">
        <CustomCardFinance
          total={"50 Anak"}
          noCurrnecy={true}
          title="Jumlah Partisipan"
          desc="dari 3 kelas"
        />
        <CustomCardFinance
          title="Dana Terkumpul"
          desc="20% dari yang dibutuhkan"
          total={3040000}
        />
        <CustomCardFinance
          total={14040000}
          title="Jumlah Partisipan"
          desc="dari 3 kelas"
        />
      </div>
      <ActivityFundingFilters/>
      <StudentFundingTable />
    </div>
  );
};

export default ActivityFunding;
