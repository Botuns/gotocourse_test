import React from 'react'
import StudentSideBar from './StudentSideBar'

const StudentLayout = ({children}) => {
  return (
    <>
    <div className="">
      
      <div className="flex flex-row gap-10">
        <StudentSideBar />
        <main className="">
        {children}
      </main>
      </div>
      
    </div>
    </>
  )
}

export default StudentLayout