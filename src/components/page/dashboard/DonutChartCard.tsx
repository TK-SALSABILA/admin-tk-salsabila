"use client";

import DashboardCard from "../../shared/CustomCard";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import TooltipInfo from "@/components/shared/TooltipInfo";

const data = [
  { name: "Product 1", value: 400 },
  { name: "Product 2", value: 300 },
  { name: "Product 3", value: 300 },
  { name: "Product 4", value: 200 },
];

const COLORS = ["#1e40af", "#9333ea", "#f472b6", "#0ea5e9"];

export default function DonutChartCard() {
  return (
    <DashboardCard
      title="PRIMARY TEXT"
      headerRight={<TooltipInfo text="lorem ipsom asasasas" />}
    >
      <div className="text-3xl font-bold">5.987,34</div>
      <p className="text-sm text-muted-foreground mb-2">Secondary text</p>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </DashboardCard>
  );
}
