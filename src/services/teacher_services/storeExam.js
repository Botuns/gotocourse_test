import axios from 'axios';
import { BASE_URL } from '../URL';
import toast from 'react-hot-toast';

const storeExam = async (questionsData) => {
  try {
    // Get the exam data from local storage
    const examData = JSON.parse(localStorage.getItem('examData'));

    if (!examData) {
      toast.error('Exam data not found in local storage');
    }

    if (!questionsData) {
      toast.error('No questions data provided');
    }

    // Combine the exam data with the questions data
    // const combinedData = { ...examData, questions: questionsData };

    // Perform the API request to create the exam
    const response = await axios.post(`${BASE_URL}/create`, { examData, questionsData });
    console.log(examData,questionsData)

    // Check if the request was successful
    if (response.status === 201) {
      // Optionally, you can return or handle the response data here
      toast.success("Exam Create succesfully")
      
      return response.data;
    } else {
      toast.error(`Failed to create the exam. Status code: ${response.status}`);
    }
  } catch (error) {
    // Handle any errors that may occur during the process
    console.log(error)
    toast.error('Error while storing the exam:', error.message);
    // You can throw or handle the error as needed
    // throw error;
  }
};

const getExams = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/exams`);
      if (response.status === 200) {
        return response.data;
      } else {
        toast.error('Failed to retrieve exams');
      }
    } catch (error) {
      toast.error('Error while retrieving exams:', error.message);
    }
  };
  
  /**
   * The function `getAllExamTitles` is an asynchronous function that retrieves exam titles from a
   * server using an HTTP GET request.
   * @returns The function `getAllExamTitles` returns the exam titles data if the API request is
   * successful. If the API request fails, it displays an error message using the `toast.error`
   * function.
   */
  const getAllExamTitles = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/titles`);
      if (response.status === 200) {
        return response.data;
      } else {
        toast.error('Failed to retrieve exam titles');
      }
    } catch (error) {
      toast.error('Error while retrieving exam titles:', error.message);
    }
  };
  
  /**
   * The function `getExamByTitle` is an asynchronous function that retrieves an exam by its title from
   * a server using an HTTP GET request.
   * @param title - The `title` parameter is a string that represents the title of the exam you want to
   * retrieve.
   * @returns The function `getExamByTitle` returns the exam data if it is successfully retrieved from
   * the server. If the exam is not found (status 404), it returns `null`. If there is an error while
   * retrieving the exam, it displays an error message using the `toast.error` function.
   */
  const getExamByTitle = async (title) => {
    try {
      if(title){
        const response = await axios.get(`${BASE_URL}/exams/${title}`);
      if (response.status === 200) {
        return response.data;
      } else if (response.status === 404) {
        return null;
      } else {
        toast.error(`Failed to retrieve exam with title: ${title}`);
      }
      
      }
      else{
        toast.error('no title provided')
      }
    } catch (error) {
      toast.error('Error while retrieving exam:', error.message);
    }
  };
  
  export { storeExam, getExams, getAllExamTitles, getExamByTitle };