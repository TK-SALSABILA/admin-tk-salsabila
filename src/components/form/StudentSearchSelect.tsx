"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetStudentsQuery } from "@/hooks/query/useStudentQuery";
import { Student } from "@/types/student";

interface Props {
  onSelect: (student: Student) => void;
}

const StudentSearchSelect = ({ onSelect }: Props) => {
  const { data } = useGetStudentsQuery({ page: 1, rpp: 10 });
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Student | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const students: Student[] = data?.data || [];

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

  return (
    <div className="w-full space-y-2">
      <Label>Nama Siswa</Label>
      <Input
        placeholder="Masukan nama siswa"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
      />
      {showDropdown && search.length > 0 && (
        <div className="border rounded bg-white shadow max-h-60 overflow-y-auto z-50">
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
