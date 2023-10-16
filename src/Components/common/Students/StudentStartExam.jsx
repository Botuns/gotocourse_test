import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StudentStartExam = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Fetch the exam duration from localStorage, adjust as needed
  const examDuration = parseInt(localStorage.getItem('examData')?.duration) || 60; // Default duration is 60 minutes

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update current time every second

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
                <h1 className='p-4 bg-gray-200 font-bold mt-[1cm] w-[150vh] mb-[2cm]'>EXCEL BASICS #123</h1>
                <div className="flex items-center justify-center bg-blue-100 p-2 rounded-lg w-[70%] py-4 ml-[4cm] ">
      <div className="text-center">
        <img src="https://i.ibb.co/B4Hw0BF/image-removebg-preview-5.png" alt="Student Image" className="w-36 h-36 mx-auto" />
        <div className=" font-bold text-black">DURATION: {examDuration} MIN</div>
        <div className=" font-bold text-black">MAXIMUM ATTEMPTS: 1</div>
        <div className=" font-bold text-black">DEADLINE DATE: YYYY-MM-DD</div>
        <div className=" font-bold text-black"> TIME: {currentTime.toLocaleTimeString()}</div>
        <Link to={'/attempt-questions'}>
        <button className="mt-4 py-3 px-6 bg-blue-800 text-white text- rounded-md">START EXAM</button>
        </Link>
      </div>
    </div>

    </div>
  );
};

export default StudentStartExam;
