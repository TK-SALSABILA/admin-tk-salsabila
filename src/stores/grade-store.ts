import { ClassData } from "@/types/grade";
import { create } from "zustand";

interface GradeStore {
  selectedGrade: ClassData | null;
  setSelectedGrade: (grade: ClassData | null) => void;
}

export const useGradeStore = create<GradeStore>((set) => ({
  selectedGrade: null,
  setSelectedGrade: (grade) => set({ selectedGrade: grade }),
}));
