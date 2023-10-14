import React from 'react'
import TeacherSidebar from './teacher_sidebar/TeacherSidebar'

const TeacherLayout = ({children}) => {
  return (
    <>
    <div className="">
      
      <div className="flex flex-row gap-10">
        <TeacherSidebar />
        <main className="">
        {children}
      </main>
      </div>
      
    </div>
    </>
  )
}

export default TeacherLayout