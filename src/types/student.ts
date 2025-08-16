export enum valueType {
  UJIAN_SEMESTER = "Ujian Semester",
  UJIAN_HARIAN = "Ujian Harian",
  NILAI_PRAKTEK = "Nilai Praktek",
  REMEDIAL = "Remedial",
}

export interface Student {
  id: string | null;
  fullName: string;
  nickName: string;
  nik: string;
  gender: "Laki-laki" | "Perempuan";
  dateBirth: string;
  birthOrder: string;
  tribe: string;
  address: string;
  height: string;
  weight: string;
  gradeClass: {
    academicYear: string;
    isCurrent: boolean;
    gradeLog: {
      id: string;
      gradeLevel: string;
    };
  };
}

export interface Parent {
  id: string | null;

  // Ayah
  fatherName: string;
  fatherDateBirth: string;
  fatherNik: string;
  fatherEducation: string;
  fatherJob: string;
  fatherCitizen: string; // contoh: "WNI" | "WNA"
  fatherIncome: number;
  fatherAddress: string;
  fatherPhone: string;

  // Ibu
  motherName: string;
  motherDateBirth: string;
  motherNik: string;
  motherEducation: string;
  motherCitizen: string;
  motherIncome: number;
  motherAddress: string;
  motherPhone: string;
}
