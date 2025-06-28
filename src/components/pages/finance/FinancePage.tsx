import PageHeader from "@/components/shared/PageHeder";
import React from "react";
import FinanceTabs from "./FinanceTabs";

const FinancePage = () => {
  return (
    <section className="space-y-4">
      <PageHeader
        pages={["Keuangan"]}
        pageDesc="Daftar pembayaran bulanan, tabungan, dan kegiatan siswa"
      />
      <FinanceTabs />
    </section>
  );
};

export default FinancePage;
