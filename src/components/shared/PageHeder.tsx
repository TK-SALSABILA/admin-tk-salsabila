import React from "react";
import { Separator } from "@/components/ui/separator";

interface PageHeaderProps {
  pageName: string;
  pageDesc: string;
  page2?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  pageName,
  pageDesc,
  page2,
}) => {
  return (
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground">
        Main /{" "}
        {!page2 ? (
          <span className="text-foreground font-medium">{pageName}</span>
        ) : (
          <>
            <span>{pageName}</span>
            <span className="text-foreground font-medium"> / {page2}</span>
          </>
        )}
      </div>
      <h1 className="text-2xl font-bold tracking-tight">
        {page2 ? page2 : pageName}
      </h1>
      <p className="text-sm text-muted-foreground">{pageDesc}</p>
      <Separator />
    </div>
  );
};

export default PageHeader;
