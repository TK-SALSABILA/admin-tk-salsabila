"use client";

import { ReactNode } from "react";
import { SearchInput } from "./SearchInput";
import { FilterSelect } from "./FilterSelect";
import GradeFilterSelect from "./GradeFilterSelect";

type FilterType = "search" | "select" | "grade";

export interface FilterConfig {
  type: FilterType;
  key: string;
  placeholder: string;
  options?: {
    value: string;
    label: string;
  }[];
  width?: string;
  searchKey?: string;
}

interface ReusableFilterProps {
  filters: FilterConfig[];
  searchConfig?: {
    placeholder: string;
    searchKey: string;
    width?: string;
  };
  actions?: ReactNode;
  className?: string;
}

export function ReusableFilter({
  filters,
  searchConfig,
  actions,
  className = "",
}: ReusableFilterProps) {
  return (
    <div
      className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${className}`}
    >
      {/* Left side - Filters */}
      <div className="flex flex-wrap gap-2 w-full md:w-auto">
        {filters.map((filter) => {
          if (filter.type === "select") {
            return (
              <FilterSelect
                key={filter.key}
                options={filter.options || []}
                placeholder={filter.placeholder}
                searchKey={filter.key}
                width={filter.width}
              />
            );
          }
          if (filter.type === "grade") {
            return (
              <GradeFilterSelect
                key={filter.key}
                placeholder={filter.placeholder}
                searchKey={filter.key}
                width={filter.width}
              />
            );
          }
          return null;
        })}
      </div>

      {/* Right side - Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
        {searchConfig && (
          <SearchInput
            placeholder={searchConfig.placeholder}
            searchKey={searchConfig.searchKey}
            className={searchConfig.width || "w-full md:w-[250px]"}
          />
        )}
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
    </div>
  );
}
