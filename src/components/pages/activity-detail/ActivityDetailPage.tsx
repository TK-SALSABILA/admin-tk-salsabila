import React from "react";
import PageHeader from "@/components/shared/PageHeder";
import ActivityDetailTabs from "./ActivityDetailTabs";

const ActivityDetailPage = ({ id }: { id: string }) => {
  return (
    <div>
      <PageHeader
        pages={["Keuangan", "Kegiatan", "Detail Kegiatan"]}
        pageDesc="Detail kegiatan beserta daya yang dibutuhkan dan dikumpulkan"
      />
      <div className="space-y-4">
        <div className="mt-5">
          <h2 className="text-xl font-semibold">Nama Kegiatan</h2>
          <p className="text-muted-foreground font-semibold text-sm">
            2-5 April 2026
          </p>
        </div>
        <ActivityDetailTabs />
      </div>
    </div>
  );
};

export default ActivityDetailPage;
