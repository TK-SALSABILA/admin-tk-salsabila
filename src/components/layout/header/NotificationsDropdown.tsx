import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Bell } from 'lucide-react';
import React from 'react'

const NotificationsDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {/* Notification Badge */}
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            3
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-96 overflow-y-auto">
          <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
            <div className="font-medium text-sm">Siswa baru terdaftar</div>
            <div className="text-xs text-gray-500">
              Ahmad Fauzi telah mendaftar di kelas 10 IPA 1
            </div>
            <div className="text-xs text-gray-400">2 jam yang lalu</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
            <div className="font-medium text-sm">Laporan nilai siap</div>
            <div className="text-xs text-gray-500">
              Laporan nilai semester 1 kelas 11 IPA 2
            </div>
            <div className="text-xs text-gray-400">5 jam yang lalu</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
            <div className="font-medium text-sm">Pembayaran SPP</div>
            <div className="text-xs text-gray-500">
              15 siswa belum melunasi SPP bulan ini
            </div>
            <div className="text-xs text-gray-400">1 hari yang lalu</div>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center text-sm text-blue-600 hover:text-blue-700">
          Lihat semua notifikasi
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NotificationsDropdown
