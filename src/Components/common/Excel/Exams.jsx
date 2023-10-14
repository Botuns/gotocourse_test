import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ColorRing } from 'react-loader-spinner';
import { getExams } from '../../../services/teacher_services/getCreatedExams';
import ExcelNavBar from './ExcelNavBar';

const Exams = () => {
  const [examdata, setExamData] = useState([]);
  const [showData, setShowData] = useState(false);

  // The `getdata` function is an asynchronous function that is used to fetch data from the server.
  const getdata = async () => {
    try {
      const dataToRender = await getExams("null");
      if (dataToRender) {
        setExamData(dataToRender);
      } else {
        toast.error('Unable to get data');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // Call the getdata function when the component mounts.
    getdata();
  }, []);

  return (
    <>
      <div>
        <Toaster />
        <h1 className='p-4 bg-gray-200 font-bold mt-[1cm] w-[150vh] mb-[1cm]'>EXCEL BASICS #123</h1>
        <ExcelNavBar />
        <p className='mt-[.5cm]'>Number of questions: {examdata.length || 0}</p>
        {examdata.map((data, index) => (
          <div className='bg-blue-200 p-4 rounded max-w-[80%]' key={index}>
            <p className='font-bold'>{index + 1}. {data.question}</p>
            {data.img_url&&(<img src={data.img_url} alt={`Exam ${index}`} className='max-h-[3cm] max-w-[6cm] mt-[1cm]'/>)}
            <div>
              {data.options.map((option, optionIndex) => (
                <p className='bg-white p-2 rounded flex flex-col mt-6 ' key={optionIndex}>
                  {optionIndex+1}. {option}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Exams;
