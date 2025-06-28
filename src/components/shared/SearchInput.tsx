"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, KeyboardEvent } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useUpdateSearchParams } from "@/utils/searchParams";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  searchKey?: string;
  defaultValue?: string;
}

export function SearchInput({
  placeholder = "Search...",
  className = "",
  searchKey = "search",
  defaultValue = "",
}: SearchInputProps) {
  const searchParams = useSearchParams();
  const { updateSearchParams } = useUpdateSearchParams();
  const [searchValue, setSearchValue] = useState(
    defaultValue || searchParams.get(searchKey) || ""
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateSearchParams({ [searchKey]: searchValue });
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="pl-9"
      />
    </div>
  );
}
