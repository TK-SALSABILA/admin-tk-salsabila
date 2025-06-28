"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import { useUpdateSearchParams } from "@/utils/searchParams";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  options: FilterOption[];
  placeholder: string;
  searchKey: string;
  width?: string;
  defaultValue?: string;
}

export function FilterSelect({
  options,
  placeholder,
  searchKey,
  width = "w-[150px]",
  defaultValue = "",
}: FilterSelectProps) {
  const searchParams = useSearchParams();
  const { updateSearchParams } = useUpdateSearchParams();
  const currentValue = searchParams.get(searchKey) || defaultValue;

  const handleValueChange = (value: string) => {
    updateSearchParams({ [searchKey]: value });
  };

  return (
    <Select value={currentValue} onValueChange={handleValueChange}>
      <SelectTrigger className={width}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
