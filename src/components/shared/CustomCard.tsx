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
    <div className="rounded-2xl border bg-white text-black shadow-sm">
      {title && (
        <div className="flex flex-row items-start justify-between p-4 pb-2">
          <h4 className="text-sm font-medium">{title}</h4>
          {headerRight}
        </div>
      )}
      <div className="px-4 pb-4">{children}</div>
    </div>
  );
}
