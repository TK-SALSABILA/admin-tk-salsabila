import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const createBadgeRenderer = (getVariant: (value: string) => string) => {
  return (value: string) => (
    <Badge variant="default" className={getVariant(value)}>
      {value}
    </Badge>
  );
};

export const createCurrencyRenderer = (currency = "Rp") => {
  return (value: number | string) => {
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    return `${currency}${numValue.toLocaleString("id-ID")}`;
  };
};

export const createAvatarRenderer = (
  nameKey = "name",
  avatarKey = "avatar",
  classKey = "class",
  academicYearKey = "academicYear"
) => {
  return (value: any, row: any) => {
    // Format detail: "2025-2026 | Kelas TK A"
    const academicYear = row[academicYearKey];
    const className = row[classKey];

    let details = "";
    if (academicYear && className) {
      details = `${academicYear} | Kelas ${className}`;
    } else if (academicYear) {
      details = academicYear;
    } else if (className) {
      details = `Kelas ${className}`;
    }

    return (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={row[avatarKey]} />
          <AvatarFallback>
            {row[nameKey]?.charAt(0)?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{row[nameKey]}</p>
          {details && (
            <p className="text-xs text-muted-foreground">{details}</p>
          )}
        </div>
      </div>
    );
  };
};
