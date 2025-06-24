import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SidebarItem } from "@/types/layout";
import React from "react";

const SidebarTooltip = ({
  item,
  ItemContent,
}: {
  item: SidebarItem;
  ItemContent: React.ReactNode;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{ItemContent}</TooltipTrigger>
        <TooltipContent side="right" className="font-medium">
          {item.label}
          {item.badge && (
            <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">
              {item.badge}
            </span>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarTooltip;
