"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, Loader2 } from "lucide-react";
import { TableColumn, DataTableProps } from "@/types/table";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function DataTable({
  columns,
  data,
  actions = [],
  loading = false,
  clickTRoute = false,
  pathRoute = "",
  emptyMessage = "Tidak ada data",
  className = "",
  showHeader = true,
  rowClassName,
}: DataTableProps) {
  const router = useRouter();

  const renderCell = (column: TableColumn, row: any, index: number) => {
    const mainContent = column.render
      ? column.render(row[column.key], row, index)
      : row[column.key];

    // Check if this column has subtext logic
    if (column.subtext) {
      const subtextContent = column.subtext(row[column.key], row, index);

      return (
        <div className="flex flex-col">
          <div>{mainContent}</div>
          {subtextContent && (
            <div className="text-xs text-muted-foreground mt-1">
              {subtextContent}
            </div>
          )}
        </div>
      );
    }

    return mainContent;
  };

  const getAlignment = (align?: string) => {
    switch (align) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border ${className}`}>
      <Table>
        {showHeader && (
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={`${getAlignment(column.align)} ${
                    column.width || ""
                  }`}
                >
                  {column.sortable ? (
                    <button className="flex justify-between w-full gap-1 hover:text-foreground">
                      {column.title}
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  ) : (
                    column.title
                  )}
                </TableHead>
              ))}
              {actions.length > 0 && (
                <TableHead className="text-center"></TableHead>
              )}
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                className="text-center py-8 text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow
                onClick={
                  clickTRoute
                    ? () => router.push(`/${pathRoute}/${row.id}`)
                    : undefined
                }
                key={index}
                className={rowClassName ? rowClassName(row, index) : ""}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className={getAlignment(column.align)}
                  >
                    {renderCell(column, row, index)}
                  </TableCell>
                ))}
                {actions.length > 0 && (
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      {actions.map((action, actionIndex) => (
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          key={actionIndex}
                          onClick={() => action.onClick(row, index)}
                          className={`p-1 hover:bg-gray-100 rounded ${
                            action.className || ""
                          }`}
                          title={action.tooltip}
                        >
                          {action.icon}
                        </Button>
                      ))}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
