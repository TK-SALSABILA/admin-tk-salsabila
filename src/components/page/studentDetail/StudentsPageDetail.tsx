import PageHeader from '@/components/shared/PageHeder';
import React from 'react';
import StudentsProfile from './StudentProfile';
import StudentTabs from './StudentTabs';

const StudentsPageDetail = ({id}: {id: string}) => {
  return (
    <div className='space-y-6'>
      <PageHeader pageDesc='Data detail siswa mengenai akademik dan keuangan' pageName='Data Siswa' page2='Detail Siswa'/>
      <StudentsProfile/>
      <StudentTabs/>
    </div>
  )
}

export default StudentsPageDetail
