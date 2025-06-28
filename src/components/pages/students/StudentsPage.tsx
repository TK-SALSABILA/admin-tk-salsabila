import PageHeader from '@/components/shared/PageHeder'
import React from 'react'
import StudentTable from './StudentsTable'
import StudentsFilter from './StudentsFilter'

const StudentsPage = () => {
  return (
    <div className='space-y-6'>
      <PageHeader pages={["Data Siswa"]} pageDesc="Pilih tahun ajaran dan kelas siswa untuk ditampilkan" />
      <StudentsFilter/>
      <StudentTable/>
    </div>
  )
}

export default StudentsPage
