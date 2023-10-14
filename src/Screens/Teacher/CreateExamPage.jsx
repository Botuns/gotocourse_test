import React from 'react'
import { ExcelFirstScreen, TeacherLayout } from '../../Components'
import CreateExam from '../../Components/common/Excel/CreateExam'

const CreateExamPage = () => {
  return (
    <>
    <TeacherLayout>
        <CreateExam/>
    </TeacherLayout>
    </>
  )
}

export default CreateExamPage