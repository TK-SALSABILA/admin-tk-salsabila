import DashboardCard from "../../shared/CustomCard";
import { CheckCircle } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <DashboardCard
      title={title}
      headerRight={<CheckCircle className="w-4 h-4 text-muted-foreground" />}
    >
      <div className="text-2xl font-bold">{value.toLocaleString()}</div>
    </DashboardCard>
  );
}
