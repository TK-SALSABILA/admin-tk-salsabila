import { SidebarItem } from "@/types/layout";
import {
  Activity,
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
  },
  {
    id: "keuangan",
    label: "Keuangan",
    icon: DollarSign,
    href: "/finance",
  },
  {
    id: "kegiatan",
    label: "Kegiatan",
    icon: Activity,
    href: "/activity",
  },
];
