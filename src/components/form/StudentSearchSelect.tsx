"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetStudentsQuery } from "@/hooks/query/useStudentQuery";
import { Student } from "@/types/student";

interface Props {
  onSelect: (student: Student) => void;
  selectedStudent?: Student | null;
  disabled?: boolean;
}

const StudentSearchSelect = ({
  onSelect,
  selectedStudent,
  disabled = false,
}: Props) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Student | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Debounce state untuk search
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // delay 0.5s
    return () => clearTimeout(handler);
  }, [search]);

  // Query ke BE langsung dengan param q
  const { data, isFetching } = useGetStudentsQuery({
    page: 1,
    rpp: 10,
    q: debouncedSearch || undefined,
  });

  const students: Student[] = data?.data || [];

  // Update search input kalau ada selectedStudent (edit mode)
  useEffect(() => {
    if (selectedStudent) {
      setSelected(selectedStudent);
      setSearch(selectedStudent.fullName);
    } else {
      setSelected(null);
      setSearch("");
    }
  }, [selectedStudent]);

  const handleSelect = (student: Student) => {
    setSelected(student);
    setSearch(student.fullName);
    onSelect(student);
    setShowDropdown(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setShowDropdown(true);

    if (value === "") {
      setSelected(null);
    }
  };

  const handleInputFocus = () => {
    if (!disabled) {
      setShowDropdown(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  return (
    <div className="w-full space-y-2 relative">
      <Label>Nama Siswa</Label>
      <Input
        placeholder="Masukan nama siswa"
        value={search}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleBlur}
        disabled={disabled}
        className={disabled ? "bg-gray-50" : ""}
      />
      {showDropdown && search.length > 0 && !disabled && (
        <div className="absolute top-full left-0 right-0 border rounded bg-white shadow-lg max-h-60 overflow-y-auto z-50 mt-1">
          {isFetching ? (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              Mencari...
            </div>
          ) : students.length > 0 ? (
            students.map((student) => (
              <div
                key={student.id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(student)}
              >
                {student.fullName}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              Tidak ada hasil
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentSearchSelect;
