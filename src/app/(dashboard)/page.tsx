import DashboardPage from "@/components/pages/dashboard/DashboardPage";
import InstallPrompt from "@/components/shared/PWAInstal";
import React from "react";

export default function Dashboard() {
  return (
    <>
      <DashboardPage />;
      <InstallPrompt />
    </>
  );
}
