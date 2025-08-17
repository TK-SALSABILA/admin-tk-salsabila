"use client";

import { useState, useMemo, useEffect } from "react";
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
  const { data } = useGetStudentsQuery({ page: 1, rpp: 10 });
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Student | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const students: Student[] = data?.data || [];

  // Update search input when selectedStudent changes (for edit mode)
  useEffect(() => {
    if (selectedStudent) {
      setSelected(selectedStudent);
      setSearch(selectedStudent.fullName);
    } else {
      setSelected(null);
      setSearch("");
    }
  }, [selectedStudent]);

  const filteredStudents = useMemo(() => {
    return students.filter((s) =>
      s.fullName.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, students]);

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

    // If input is cleared, clear selection
    if (value === "") {
      setSelected(null);
    }
  };

  const handleInputFocus = () => {
    if (!disabled) {
      setShowDropdown(true);
    }
  };

  // Close dropdown when clicking outside
  const handleBlur = () => {
    // Delay to allow click on dropdown items
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
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
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
