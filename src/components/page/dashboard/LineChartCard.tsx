"use client";
import DashboardCard from "../../shared/CustomCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import TooltipInfo from "@/components/shared/TooltipInfo";

const data = [
  { year: 2020, sem1: -60, sem2: 20 },
  { year: 2021, sem1: 10, sem2: -30 },
  { year: 2022, sem1: 100, sem2: -50 },
  { year: 2023, sem1: 70, sem2: -30 },
  { year: 2024, sem1: 40, sem2: 0 },
  { year: 2025, sem1: -70, sem2: 10 },
];

export default function LineChartCard() {
  return (
    <DashboardCard
      title="Rata-rata Nilai Raport"
      headerRight={<TooltipInfo text="Data tahun ajaran berjalan" />}
    >
      <div className="text-3xl font-bold">85</div>
      <p className="text-sm text-muted-foreground mb-2">
        tahun ajaran berjalan
      </p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sem1" stroke="#2563eb" />
          <Line type="monotone" dataKey="sem2" stroke="#9333ea" />
        </LineChart>
      </ResponsiveContainer>
    </DashboardCard>
  );
}
