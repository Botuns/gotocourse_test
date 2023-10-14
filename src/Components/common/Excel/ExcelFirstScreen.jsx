import React, { useState } from 'react';
import Select from 'react-select';
import ExcelNavBar from './ExcelNavBar';
import { useNavigate } from 'react-router-dom';

const ExcelFirstScreen = () => {
  const [titles, setTitles] = useState([
    { name: 'Exam' },
    { name: 'Assessment 1' },
    { name: 'Assessment 2' },
    { name: 'Assessment 3' },
  ]);

  const options = titles.map((title) => ({
    value: title.name,
    label: title.name,
  }));

  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate()
  function proceedCreation(e){
    e.preventDefault()
    navigate('/create-exams')
  }

  return (
    <>
      <div className='mt-[2cm]'>
        <ExcelNavBar />
        <div className='flex flex-row gap-12 mt-[1cm]'>
          <Select
            options={options}
            value={selectedOption}
            onChange={(selectedOption) => setSelectedOption(selectedOption)}
            className="border border-blue-500 p-2 mt-2 hover:bg-white"
          />
          <button className='w-[full] h-[1cm] px-2 bg-blue-800 mt-[.5cm] text-white' onClick={proceedCreation}>Continue</button>
        </div>
      </div>
    </>
  );
};

export default ExcelFirstScreen;
