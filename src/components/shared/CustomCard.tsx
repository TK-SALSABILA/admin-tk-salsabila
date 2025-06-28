import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ReactNode } from "react";

interface CustomCardProps {
  title?: string;
  children: ReactNode;
  headerRight?: ReactNode;
}

export default function CustomCard({
  title,
  children,
  headerRight,
}: CustomCardProps) {
  return (
    <Card>
      {title && (
        <CardHeader className="flex flex-row items-start justify-between pb-1">
          <h4 className="text-sm font-medium">{title}</h4>
          {headerRight}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
