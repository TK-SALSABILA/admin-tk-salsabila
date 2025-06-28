import React from "react";
import { Separator } from "@/components/ui/separator";

interface PageHeaderProps {
  pages: [string, ...string[]]; 
  pageDesc: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ pages, pageDesc }) => {
  const lastPage = pages[pages.length - 1];

  return (
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground">
        Main /
        {pages.map((page, index) => (
          <span key={index}>
            {" "}
            {index === pages.length - 1 ? (
              <span className="text-foreground font-medium">{page}</span>
            ) : (
              <span>{page} /</span>
            )}
          </span>
        ))}
      </div>
      <h1 className="text-2xl font-bold tracking-tight">{lastPage}</h1>
      <p className="text-sm text-muted-foreground">{pageDesc}</p>
      <Separator />
    </div>
  );
};

export default PageHeader;
