import { SidebarItem } from "@/types/layout";
import { Book, DollarSign, FileText, GraduationCap, LayoutDashboard, Users } from "lucide-react";

export const sidebarItems: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    id: "data-siswa",
    label: "Data Siswa",
    icon: GraduationCap,
    href: "/students",
    // badge: "1060",
  },
  // {
  //   id: "data-guru",
  //   label: "Data Guru",
  //   icon: Users,
  //   href: "/teachers",
  // },
  // {
  //   id: "kelas",
  //   label: "Kelas",
  //   icon: BookOpen,
  //   href: "/classes",
  // },
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