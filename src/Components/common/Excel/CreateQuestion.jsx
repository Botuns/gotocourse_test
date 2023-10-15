import React, { useState, useEffect, useRef } from 'react';
import ExcelNavBar from './ExcelNavBar';
import toast, {Toaster} from 'react-hot-toast'
import {PlusSmallIcon} from '@heroicons/react/24/outline'
import { saveToCloudinary } from '../../../services/teacher_services/cloudinaryUpload';
import { ColorRing } from 'react-loader-spinner';

const CreateQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const[showoptiontext,setshoeoptiontext] = useState(false)
  const [images, setImages] = useState([null]);
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState('');
  const [loader, setloader]= useState(false)
  const [questionnumber, setquestionnumber]= useState(0)
  const [maxNumber, setMaxNumber] = useState(3);
  const [maxNumberReached, setMaxNumberReached] = useState(false);




  const fileInputRef = useRef(null); //reference for the button to beclicked

const accessFile = (e) => { //when the button is clicked, it accesses the file on the system
    e.preventDefault()
  try {
    fileInputRef.current.click();
  } catch (error) {
    toast.error('Something just happened pls try again')
  }
  };
/**
 *opens text to add option - max(4)
 *
 * @param {*} e
 */
 const addOption = (e) => {
  e.preventDefault();
  if (newOption === '') {
    setshoeoptiontext(true);
    toast("Options can't be empty");
    return; // Exit the function if newOption is empty
  }

  try {
    if (options.length < 4) {
      setOptions([...options, newOption]);
      setNewOption('');
    } else {
      toast('Only four options are allowed');
      setshoeoptiontext(false);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  /**
   *When ever an image is uploaded, this function handles the image change and sets the image url for preview
   *
   * @param {*} e
   */
  const handleImageChange = (e) => {
    try {
      setImage(e.target.files[0]);
      const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
    else{
      toast.error('Upload was invalid, pls try again')
    }
    } catch (error) {
      toast.error(error.message)
    }
  };


  /**
   * The `saveProgress` function is an asynchronous function that saves the progress of a question and
   * its options, including an optional image, to a list of questions and stores it in  storage.
   * @returns The function `saveProgress` is not returning anything.
   */
  const saveProgress = async (e) => {
    e.preventDefault();
    // Check if the maximum number of questions is reached
    if (questions.length + 1 >= maxNumber) {
      // Disable the "Add New Question" button and show the "Submit Questions" button
      toast('Max number of questions reached')
      setMaxNumberReached(true);
    }
    setloader(true);
    setquestionnumber(questions.length)
  
    try {
      if(question&&options){
        let newQuestion = {
          question,
          options,
        };
    
        // Check if an image is provided
        if (image) {
          const img_url = await saveToCloudinary(image);
          if (img_url) {
            newQuestion = {
              ...newQuestion,
              img_url,
            };
            toast.success('stored')
            
          } else {
            toast.error('Unable to save image');
            setloader(false);
            return;
          }
        }
    
        setQuestions([...questions, newQuestion]);
        toast('saved')
    
        
        localStorage.setItem('questions', JSON.stringify([...questions, newQuestion]));
        // Clear the form after saving
      setQuestion('');
      setImage(null);
      setSelectedImage(null);
      setOptions([]);
      setNewOption('');

      
      }
      else{
        toast.error('one or two fields are empty')
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloader(false);
    }
  };
  
  const addNewQuestion =async (e) => {
    await saveProgress(e)
    setQuestion('');
    setImage(null);
    setSelectedImage(null)
    setOptions([]);
    setNewOption('');
    
    // Implement logic to limit the number of questions to a maximum of 60.
  };
  const submitQuestions = () => {
    console.log(questions)
  };


    return (
      <>
      <Toaster/>
                <h1 className='p-4 bg-gray-200 font-bold mt-[1cm] w-[150vh] mb-[1cm]'>EXCEL BASICS #123</h1>
                <ExcelNavBar/>

    <div className="bg-blue-200 mt-[1cm] p-4 rounded-md max-w-[80%]">
      <div className='flex flex-col'>
      {selectedImage && <img src={selectedImage} alt="Uploaded" className='max-w-[40%] max-h-[4cm] w-[auto] h-[auto]'/>}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef} // Reference to the file input element
        style={{ display: 'none' }} // Hide the file input
      />
      <label className='text-sm'>Write your question -question({questionnumber})</label>
      <div className='flex justify-between'>
      <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} className='h-[1cm] w-[80%] rounded-md' />
      <button onClick={accessFile} className='border p-1 border-blue-800'>Add Image</button>
      </div>
      </div>
      
      <div className='grid grid-cols-2 gap-4 mt-[1cm]'>
  {options.map((option, index) => (
    <div className='flex  gap-4'>
      <input type='checkbox' value={option}/>
      <p className='bg-white text-blue-800  min-w-[4cm] rounded-md text-center justify-start py-2 px-4 ' key={index}>{`${index + 1}: ${option}`}</p>

    </div>
))}
</div>
{showoptiontext&&(
       <input type="text" value={newOption} placeholder=' write options here' onChange={(e) => setNewOption(e.target.value)} className='h-[1cm] w-[20%] rounded-md mt-6' />
      )}

      <button onClick={addOption} className='py-1 px-20 border border-blue-800 mt-6 ml-4 text-blue-800 flex rounded'>
      <PlusSmallIcon class="h-6 w-6 text-blue-500 mr-1"/>
        Add </button>
      
      
    </div>
    <div className='flex flew-row justify-end mr-[5.4cm] mt-[1cm] gap-4'>
      <button onClick={saveProgress} className='py-2 px-10 border border-blue-800 text-blue-800'>Save</button>
      {maxNumberReached ? (
          <button onClick={submitQuestions} className="py-2 px-10 border border-blue-800 bg-blue-800 text-white">
            Submit Questions
          </button>
        ) : (
          <button onClick={addNewQuestion} className="py-2 px-10 border border-blue-800 bg-blue-800 text-white">
            Add New Question
          </button>
        )}    </div>
    {/* loader */}
    {
        loader&&(
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-80'>
            <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>

          </div>
        )
      }
    </>
  );
};

export default CreateQuestions
