import { SidebarItem } from "@/types/layout";
import {
  Book,
  BookOpen,
  DollarSign,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Users,
} from "lucide-react";

export const sidebarItems: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    id: "academic",
    label: "Akademik",
    icon: BookOpen,
    href: "",
    subItems: [
      {
        id: "class-list",
        label: "Daftar Kelas",
        icon: Users,
        href: "/academic/class-list",
      },
      {
        id: "subjects",
        label: "Mata Pelajaran",
        icon: Book,
        href: "/academic/subjects",
      },
    ],
  },
  {
    id: "data-siswa",
    label: "Data Siswa",
    icon: GraduationCap,
    href: "/students",
    // badge: "1060",
  },
  {
    id: "laporan",
    label: "Raport",
    icon: Book,
    href: "/raport",
    //   subItems: [
    //     {
    //       id: "laporan-nilai",
    //       label: "Laporan Nilai",
    //       icon: BarChart3,
    //       href: "/reports/grades",
    //     },
    //     {
    //       id: "laporan-kehadiran",
    //       label: "Laporan Kehadiran",
    //       icon: FileText,
    //       href: "/reports/attendance",
    //     },
    //   ],
  },
  {
    id: "keuangan",
    label: "Keuangan",
    icon: DollarSign,
    href: "/finance",
  },
  // {
  //   id: "pengaturan",
  //   label: "Pengaturan",
  //   icon: Settings,
  //   href: "/settings",
  // },
];
