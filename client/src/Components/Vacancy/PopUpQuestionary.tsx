import React, { useEffect, useState } from "react";

import CloseIcon from '@mui/icons-material/Close';

import { Link, useNavigate } from "react-router-dom";


export default function PopupQuestionary({setQuestions, questions}) {
  const navigate = useNavigate();

  // const [questions, setQuestions] = useState<[]>([])
  const [question, setQuestion] = useState<string>('')
  const [popupOpen, setPopupOpen] = useState(true);

  const handleChange = (event:any) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = () => {
    if (question !== '') {
      console.log('FROM POPUP', [...questions, question])
      setQuestions([...questions, question])
      setQuestion('');
    }
  }

  const removeQuestion = () => {
    setQuestions(questions.slice(0, -1));
  };

  const handleClose = () => {
    setPopupOpen(false);
  };

  const handleCloseAndSendToDB = () => {
    handleSubmit()
    setPopupOpen(false);
    console.log(questions)
  };


  return (
    <>
    { popupOpen && (
    <div className="bg-stone-100 rounded-lg w-full m-5 m-8 p-4 pr-8 pl-8 shadow-md">
      <div
      className="flex grid justify-items-end">
        <CloseIcon
          onClick={handleClose}
          className="top-0 right-0 p-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none "
          >
        </CloseIcon>
      </div>

      <h3 
        className ="text-2xl font-bold tracking-tight text-[#026767] mb-2">
        
        Please add all the questions for the questions list
      </h3>
            
      <textarea
        className="py-2 px-3 w-80 rounded-lg border border-color-#F1F0EA mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
        type="text"
        name="question"
        value={question}
        onChange={handleChange}
        required
      />

      <ul 
      className="flex flex-col"
      >
      {questions.map((q, index) => (
        <li>
          <div className="flex flex-row">
            <button
              onClick={removeQuestion}
              className="ml-2 mt-3 mr-3 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 focus:outline-none"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-4 h-4 text-white"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

              <h3 
                className="mt-3 text-lg leading-6 text-gray-900 group-hover:text-gray-600"
                >
                {index+1}. {q}
              </h3>
            </div>
          </li>
        ))}

      </ul>

      <button
       onClick={handleSubmit}
       className="mr-4 mt-4 bg-gray-500 hover:bg-gray-700 rounded-lg p-8 shadow-xl font-medium text-white py-2 px-6 ml-4 h-10 whitespace-nowrap"
       type="submit"
      >Add question</button>

      

      <button
        onClick={handleCloseAndSendToDB}
        className="mt-4 ml-4 mb-6 w-44 bg-orange-100 hover:bg-orange-dark rounded-lg shadow-xl font-medium text-white px-4 py-2"
        type="submit"
        >Submit question list!
      </button>

      </div>
    ) }
    </>
  );
}