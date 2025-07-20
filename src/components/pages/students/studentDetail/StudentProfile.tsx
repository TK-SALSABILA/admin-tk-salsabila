import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

const StudentsProfile = () => {
  return (
    <div className='flex items-center gap-2'>
      <Avatar className='w-[100px] h-[100px]'>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="">
        <h2 className='font-bold text-2xl'>Kenzo Sutrisno</h2>
        <p className='text-muted-foreground font-medium'>2025-2026 | Kelas TK C</p>
      </div>
    </div>
  )
}

export default StudentsProfile
