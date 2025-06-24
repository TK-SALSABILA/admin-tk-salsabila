"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SidebarTooltip from "./sidebar/SidebarTooltip";
import { SidebarItem } from "@/types/layout";
import { sidebarItems } from "@/data/sidebarData";


interface DashboardSidebarProps {
  defaultCollapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  defaultCollapsed = false,
  onCollapseChange,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  const handleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapseChange?.(newCollapsed);

    // Reset expanded items when collapsed
    if (newCollapsed) {
      setExpandedItems([]);
    }
  };

  const handleItemClick = (item: SidebarItem) => {
    if (item.href) {
      router.push(item.href);
    }

    // Handle sub-items expansion
    if (item.subItems && !isCollapsed) {
      setExpandedItems((prev) =>
        prev.includes(item.id)
          ? prev.filter((id) => id !== item.id)
          : [...prev, item.id]
      );
    }
  };

  const isItemActive = (item: SidebarItem): boolean => {
    if (item.href === "/" && pathname === "/") return true;
    if (item.href !== "/" && pathname.startsWith(item.href)) return true;
    return (
      item.subItems?.some((subItem) => pathname.startsWith(subItem.href)) ||
      false
    );
  };

  const SidebarItemComponent = ({
    item,
    isSubItem = false,
  }: {
    item: SidebarItem;
    isSubItem?: boolean;
  }) => {
    const isActive = isItemActive(item);
    const isExpanded = expandedItems.includes(item.id);
    const hasSubItems = item.subItems && item.subItems.length > 0;

    const ItemContent = (
      <div
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group",
          isActive
            ? "bg-yellow-500 text-white shadow-sm"
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
          isSubItem && "ml-4 text-sm",
          isCollapsed && "justify-center px-2"
        )}
        onClick={() => handleItemClick(item)}
      >
        <item.icon
          className={cn(
            "flex-shrink-0 transition-colors",
            isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700",
            isCollapsed ? "h-5 w-5" : "h-4 w-4"
          )}
        />

        {!isCollapsed && (
          <>
            <span className="flex-1 font-medium truncate">{item.label}</span>

            {item.badge && (
              <span
                className={cn(
                  "px-2 py-0.5 text-xs rounded-full font-medium",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-yellow-100 text-yellow-500"
                )}
              >
                {item.badge}
              </span>
            )}

            {hasSubItems && (
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-transform",
                  isExpanded && "rotate-90",
                  isActive ? "text-white" : "text-gray-400"
                )}
              />
            )}
          </>
        )}
      </div>
    );

    if (isCollapsed) {
      return (
       <SidebarTooltip item={item} key={item.id} ItemContent={ItemContent}/>
      );
    }

    return ItemContent;
  };

  return (
    <div
      className={cn(
        "min-h-[90vh] bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="font-semibold text-gray-900">Menu</h2>
              <p className="text-xs text-gray-500">Navigasi Admin</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCollapse}
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => (
          <div key={item.id}>
            <SidebarItemComponent item={item} />

            {/* Sub Items */}
            {!isCollapsed &&
              item.subItems &&
              expandedItems.includes(item.id) && (
                <div className="mt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <SidebarItemComponent
                      key={subItem.id}
                      item={subItem}
                      isSubItem
                    />
                  ))}
                </div>
              )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <p>School Admin v1.0</p>
            <p>© 2024 Logoipsum Academy</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardSidebar;
