import React from "react";
import PageHeader from "@/components/shared/PageHeder";
import StatCard from "./StatCard";
import DonutChartCard from "./DonutChartCard";
import LineChartCard from "./LineChartCard";
const DashboardPage = () => {
  return (
    <section className="space-y-6">
      <PageHeader
        pages={["Dashboard"]}
        pageDesc="Data sekolah dan pembelajaran terkini"
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard title="Total Siswa Tahun ini" value={1060} />
        <StatCard title="Siswa Aktif" value={1055} />

        {/* Chart Cards */}
        <LineChartCard />
        <DonutChartCard />
      </div>
    </section>
  );
};

export default DashboardPage;
