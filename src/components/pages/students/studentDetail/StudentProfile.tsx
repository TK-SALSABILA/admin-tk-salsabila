import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Student } from "@/types/student";
import React from "react";

const StudentsProfile = ({ student }: { student: Student }) => {
  return (
    <div className='flex items-center gap-2'>
      <Avatar className='w-[100px] h-[100px]'>
        <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className=''>
        <h2 className='font-bold text-2xl'>{student?.fullName}</h2>
        <p className='text-muted-foreground font-medium'>
          {`${student?.gradeClass?.academicYear} | Kelas: ${student?.gradeClass?.gradeLog?.gradeLevel}`}
        </p>
      </div>
    </div>
  );
};

export default StudentsProfile;
