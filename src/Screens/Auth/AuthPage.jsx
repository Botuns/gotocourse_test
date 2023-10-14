import React, { useState } from 'react';
import { Login } from '../../services/auth_services/auth';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [userInput, setUserInput] = useState('');
  const navigate = useNavigate();

  /**
   * The handleLogin function is used to handle the login process, including preventing the default
   * form submission, calling the Login function with the userInput, and displaying an error message if
   * an error occurs.
   */
  const handleLogin = (e) => {
    e.preventDefault()
    try {
      if (userInput === 'teacher123') {
          navigate('/teacher-home');
        } else if (userInput === 'student123') {
          navigate('/student-dashboard');
        } else {
          toast.error('Invalid login. Please enter a valid username.');
        }
  } catch (error) {
      toast.error(error.message)
  }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-blue-100'>
      <Toaster/>
      <div className="bg-white p-4 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="text"
        className="border p-2 mb-2"
        placeholder="Enter username"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button className="bg-blue-800 text-white p-2  ml-4" onClick={handleLogin}>
        Login
      </button>
    </div>
    </div>
  );
};

export default AuthPage;
