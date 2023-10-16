import React, { useState } from 'react';
import Select from 'react-select';
import ExcelNavBar from './ExcelNavBar';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const options = [
  { value: 'session', label: 'Session' },
  { value: 'term', label: 'Term' },
  { value: 'program', label: 'Program' },
];

const durations = [10, 20, 30, 45, 60, 90,120];
const CreateExam = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title:'',
    maxQuestions: 1,
    duration: null,
    enrollment: null,
    allowMultipleAttempts: null,
    showScore: null,
    gradeAllocation: null,
    instructions: '',
  });

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if(formData){
        const examData={
          title:formData.title,
          maxQuestions: formData.maxQuestions,
          duration: formData.duration.value,
          enrollment: formData.enrollment.value,
          allowMultipleAttempts: formData.allowMultipleAttempts.value,
          showScore: formData.showScore.value,
          gradeAllocation: formData.gradeAllocation.value,
          instructions: formData.instructions,
          }
          localStorage.setItem('examData',JSON.stringify(examData))
        toast.success('Exam info has been saved');
        setTimeout(function() {
          navigate('/add-questions')
        }, 2000);
      }
      else{
        toast.error('Something occured')
      }
    } catch (error) {
      toast.error(error.message)
    }
};

  return (
    <>
    <Toaster/>
            <h1 className='p-4 bg-gray-200 font-bold mt-[1cm] w-[150vh] '>EXCEL BASICS #123</h1>
    <div className=" p-4 max-w-md mt-[.5cm] max-h-[100vh]">

        <ExcelNavBar/>

<form onSubmit={handleSubmit} className='mt-[1cm]'>
<div className="mb-6 flex gap-6 justify-between">
          <label className="text-black" htmlFor="maxQuestions">Please enter an exam title <i className='text-red-500'>*</i></label>
          <input
            id="title"
            type="text"
            className="w-full border-2 border-blue-700 h-[1cm]"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            required
          />
        </div>
        <div className="mb-6 flex gap-6 justify-between">
          <label className="text-black" htmlFor="maxQuestions">Max number of questions (max60) <i className='text-red-500'>*</i></label>
          <input
            id="maxQuestions"
            type="number"
            className="w-full border-2 border-blue-700 h-[1cm]"
            value={formData.maxQuestions}
            onChange={(e) => handleInputChange('maxQuestions', e.target.value)}
            max="60"
            required
          />
        </div>
        <div className="mb-6 flex gap-6 justify-between">
          <label className="text-black">Duration in minutes <i className='text-red-500'>*</i></label>
          <Select
            options={durations.map((min) => ({ value: min, label: `${min} minutes` }))}
            value={formData.duration}
            onChange={(selectedOption) => handleInputChange('duration', selectedOption)}
            className=' h-[1cm]'
            required
          />
        </div>
        <div className="mb-6 flex gap-6 justify-between">
          <label className="text-black">Enrollment <i className='text-red-500'>*</i></label>
          <Select
            options={options}
            value={formData.enrollment}
            onChange={(selectedOption) => handleInputChange('enrollment', selectedOption)}
            className='h-[1cm]'
            required

          />
        </div>
        <div className="mb-6 flex gap-6 justify-between">
          <label className="text-black">Allow multiple attempts <i className='text-red-500'>*</i></label>
          <Select
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}
            value={formData.allowMultipleAttempts}
            onChange={(selectedOption) => handleInputChange('allowMultipleAttempts', selectedOption)}
            className='h-[1cm]'
            required

          />
        </div>
        <div className="mb-6 flex gap-6 justify-between">
          <label className="text-black">Show score <i className='text-red-500'>*</i></label>
          <Select
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}
            value={formData.showScore}
            onChange={(selectedOption) => handleInputChange('showScore', selectedOption)}
            className=' h-[1cm]'
            required

          />
        </div>
        <div className="mb-6 flex gap-6 justify-between">
          <label className="text-black">Grade allocation <i className='text-red-500'>*</i></label>
          <Select
            options={[
              { value: 'exam', label: 'Exam' },
              { value: 'assessment1', label: 'Assessment 1' },
              { value: 'assessment2', label: 'Assessment 2' },
              { value: 'assessment3', label: 'Assessment 3' }
            ]}
            value={formData.gradeAllocation}
            required
            onChange={(selectedOption) => handleInputChange('gradeAllocation', selectedOption)}
            className=' h-[1cm]'

          />
        </div>
        <div className="mb-4 flex gap-6 justify-between">
          <label className="text-black">Instructions <i className='text-red-500'>*</i></label>
          <textarea
            className="w-full border-2 border-blue-700 min-h-[2cm]"
            value={formData.instructions}
            onChange={(e) => handleInputChange('instructions', e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-800 text-white p-2 ml-[2.8cm] ">Submit</button>
      </form>
    </div>
    </>
  );
};

export default CreateExam;
