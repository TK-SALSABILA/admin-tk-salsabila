"use client";

import React from "react";
import {
  Bell,
  ChevronDown,
  Menu,
  Search,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import NotificationsDropdown from "./header/NotificationsDropdown";
import UserDropdown from "./header/UserDropdown";
import LogoTaud from "../shared/LogoTaud";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
  showMobileMenu?: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onMenuClick,
  showMobileMenu = false,
}) => {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleDisplayName = (role: string) => {
    const roleMap = {
      super_admin: "Super Admin",
      admin: "Admin",
      staff: "Staff",
    };
    return roleMap[role as keyof typeof roleMap] || role;
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        {showMobileMenu && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        {/* Logo & School Name */}
        <div className="flex items-center gap-3">
          <LogoTaud />
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-gray-900">
              TAUD SALSABILA
            </h1>
            <p className="text-sm text-gray-500">SISTEM ADMIN</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Settings */}
        <NotificationsDropdown />
        <UserDropdown />
      </div>
    </header>
  );
};

export default DashboardHeader;
