"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const StudentsSearch = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("q") || "";
  const [value, setValue] = useState(query);

  useEffect(() => {
    setValue(query);
  }, [query]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
      router.push(`?${params.toString()}`);
    }, 500); // 0.5 detik

    return () => clearTimeout(delayDebounce);
  }, [value, searchParams, router]);

  return (
    <div className="relative w-full md:w-[250px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
      <Input
        placeholder="Cari nama siswa..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-9 pr-3"
      />
    </div>
  );
};

export default StudentsSearch;
