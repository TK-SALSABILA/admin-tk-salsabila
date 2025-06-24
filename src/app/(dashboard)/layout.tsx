import DashboardSidebar from "@/components/layout/DashboardSidebar";
import React from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="h-screen bg-white">
        <DashboardHeader />
        <div className="flex-1 flex overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6">
            {children}
          </main>
        </div>
      </div>
    </main>
  );
}
