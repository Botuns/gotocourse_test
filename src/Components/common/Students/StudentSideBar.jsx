import React from 'react';
import { PlusSmallIcon ,EllipsisVerticalIcon,ComputerDesktopIcon,PlayIcon,PrinterIcon } from "@heroicons/react/24/outline";
import '../teacher_sidebar/teacher-sidebar.css'

const StudentSideBar = () => {
  return (
    <div className="bg-blue-800 w-1/6 min-h-[100vh] flex flex-col p-3 containera">
      {/* Logo */}
      <div className="flex items-center ">
  <img src={'https://gotocourse.com/logo.svg'} alt="Logo" className="p-2 h-full w-[3cm]" />
</div>


      {/* Call to Action */}
      <div className="my-4 text-blue-500">
        <button className="py-1 px-4 rounded-md w-full text-white  bg-blue-500 opacity-60 text-[10px] cta-cont">
          Get help from G-mind AI 
        </button>
      </div>

      {/* Course Content Section */}
      <div className="my-4 text-white cta-cont">
        <p className="font-bold">Course Content:</p>
        <button className="bg-blue-500 opacity-60 py-2 px-4 rounded-md w-full my-2 hover:bg-opacity-80 flex items-center mb-4 ">
        <PlayIcon class="h-6 w-6 text-white mr-2"/>
          Excel Basics
        </button>
        
        {/* <button className="bg-blue-500 opacity-60 py-2 px-4 rounded-md w-full my-2 hover-bg-opacity-80">
          Excel Course
        </button> */}
      </div>

      {/* Bottom Buttons */}
      <div className="flex-grow flex flex-col justify-end">
        
        <button className="bg-white text-blue-700 py-2 px-4 font-bold rounded-md w-full my-2 hover:bg-blue-400 hover:text-white text-sm flex items-center">
        <ComputerDesktopIcon class="h-6 w-6 text-blue-500 mr-1"/>

          <p className='cta-cont'>CBT</p>
        </button>
        <button className="bg-orange-500 text-white font-bold py-2 px-4 rounded-md w-full my-2 hover:bg-blue-400 hover:text-white text-xs flex items-center justify-center cta-cont">
         Back to Console
        </button>
      </div>
    </div>
  );
};

export default StudentSideBar;
