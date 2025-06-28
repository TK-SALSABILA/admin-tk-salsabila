import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle, CheckCircle2Icon } from "lucide-react";
import { ReactNode } from "react";

interface CustomCardProps {
  title?: string;
  total: string | number;
  desc: string;
  headerRight?: ReactNode;
  noCurrnecy?: boolean;
}

export default function CustomCardFinance({
  title,
  total,
  desc,
  noCurrnecy,
}: CustomCardProps) {
  return (
    <Card className="w-full h-full flex flex-col">
      {title && (
        <CardHeader className="flex flex-row items-start justify-between pb-2">
          <h4 className="text-sm font-medium">{title}</h4>
          <CheckCircle2Icon className="w-5 h-5" />
        </CardHeader>
      )}
      <CardContent className="flex-1 pt-0">
        <h2 className="text-2xl font-bold mb-1">
          {noCurrnecy ? (
            total
          ) : (
            <>
              Rp{" "}
              {typeof total === "number"
                ? total.toLocaleString("id-ID")
                : total}
            </>
          )}
        </h2>
        <p className="text-muted-foreground text-xs">{desc}</p>
      </CardContent>
    </Card>
  );
}
