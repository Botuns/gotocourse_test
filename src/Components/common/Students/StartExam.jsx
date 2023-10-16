import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ColorRing } from 'react-loader-spinner';
import { getExams } from '../../../services/teacher_services/getCreatedExams';

const StartExam = () => {
  const [examdata, setExamData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [timer, setTimer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);

  // Retrieve duration from local storage or set a default value (in minutes)
  const initialQuestionDuration = parseInt(localStorage.getItem('examData')?.duration) || 60; // Default duration is 60 minutes

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
  useEffect(() => {
    if (examdata.length > 0) {
      setAnswers(Array(examdata.length).fill(undefined)); // Initialize answers array
      startTimer(initialQuestionDuration * 60); // Start the timer for the first question (in seconds)
    }
  }, [examdata]);

  const handleAnswerClick = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
    setAnsweredCount(newAnswers.filter((answer) => typeof answer !== 'undefined').length);
    startTimer(initialQuestionDuration); // Start the timer for the next question

  };

  const handleNextClick = () => {
    if (currentPage < examdata.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  // Function to start the timer for the current question
  const startTimer = (duration) => {
    if (timer) {
      clearInterval(timer);
    }
    setTimer(setInterval(() => {
      if (duration > 0) {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = duration % 60;
        setTimeRemaining(`${hours}:${minutes}:${seconds}`);
        duration--;
      } else {
        // Time's up for the current question
        clearInterval(timer);
        setTimeRemaining('0:00:00');
        // Display a message
        toast('Time\'s Up for this question!', { icon: '⏰' });
        // Move to the next question
        handleNextClick();
      }
    }, 1000));
  };

  return (
    <>
      <div>
        <Toaster />
        <h1 className='p-4 bg-gray-200 font-bold mt-[1cm] w-[150vh] mb-[1cm]'>
          EXCEL BASICS #123
        </h1>
        {/* <ExcelNavBar /> */}
        <p className='mt-[.5cm] text-xl font-bold'>Question {currentPage + 1} of {examdata.length || 0}</p>
        <div className="mb-[.2cm] mt-[.5cm] ">
        <p>Number of questions answered: {answeredCount}</p>
          <p>Number of questions clicked: {answers.length}</p>
        </div>
        {timeRemaining !== null && (
            <span style={{ marginLeft: '14.8cm' }}>
              Time Remaining: {timeRemaining} minutes
            </span>
          )}
        {examdata[currentPage] && (
          <div className='bg-blue-200 p-4 rounded max-w-[80%]'>
            <p className='font-bold'>
              {currentPage + 1}. {examdata[currentPage].question}
            </p>
            {examdata[currentPage].img_url && (
              <img
                src={examdata[currentPage].img_url}
                alt={`Exam ${currentPage}`}
                className='max-h-[3cm] max-w-[6cm] mt-[1cm]'
              />
            )}
            <div>
              {examdata[currentPage].options.map((option, optionIndex) => (
                <p
                  className={`bg-white p-2 rounded flex flex-col mt-6 ${
                    answers[currentPage] === optionIndex ? 'bg-green-200' : ''
                  }`}
                  key={optionIndex}
                  onClick={() => handleAnswerClick(currentPage, optionIndex)}
                >
                  {optionIndex + 1}. {option}
                </p>
              ))}
            </div>
          </div>
        )}
        <div className='flex flex-row justify-end gap-4 mt-[1cm] mb-[1cm] mr-[5cm]'>
          <button className='py-2 px-3 border border-blue-800' onClick={handlePrevClick} disabled={currentPage === 0}>
            Previous Question
          </button>
          <button onClick={handleNextClick} className='py-2 px-3 bg-blue-800 text-white' disabled={currentPage === examdata.length - 1}>
            Next Question
          </button>
        </div>
      </div>
    </>
  );
};

export default StartExam;
