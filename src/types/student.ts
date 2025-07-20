export enum valueType {
  UJIAN_SEMESTER = "Ujian Semester",
  UJIAN_HARIAN = "Ujian Harian",
  NILAI_PRAKTEK = "Nilai Praktek",
  REMEDIAL = "Remedial"
}

export interface Student {
  id: string;
  fullName: string;
  nickName: string;
  nik: string;
  gender: string;
  dateBirth: string;
  birthOrder: string;
}