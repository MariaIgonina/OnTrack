import React, { useEffect, useState } from "react";
import { Button} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";


export default function PopupQuestionary() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<[]>([])
  const [question, setQuestion] = useState<string>('')
  const [popupOpen, setPopupOpen] = useState(true);

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = () => {
    if (question !== '') {
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
    setPopupOpen(false);
    //ADD PUT/POST
  };


  return (
    <>
    { popupOpen && (
    <div className="bg-stone-100 py-8 sm:py-32 rounded-lg w-full m-5 mt-8">
      <h3 
        className="text-1xl font-bold tracking-tight text-[#026767] sm:text-3xl mb-2"
        >
        Please add all the questions for the questions list
      </h3>
            
      <input
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
            <h3 
              className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
              >
              {index+1}. {q}
            </h3>
          </li>
        ))}

      </ul>

      <Button
       onClick={handleSubmit}
       sx={{ backgroundColor: "#568EA3" }}
       variant="contained"
       type="submit"
      >Add question</Button>

      {questions.length > 0 && (
        <Button onClick={removeQuestion}
        sx={{ backgroundColor: "#568EA3" }}
        variant="contained"
        type="submit">
          Remove question
        </Button>
      )}

      <Button
        onClick={handleClose}
        sx={{ backgroundColor: "#568EA3" }}
        variant="contained"
        type="submit"
        >Close this window
      </Button>

      <Button
        onClick={handleCloseAndSendToDB}
        sx={{ backgroundColor: "#568EA3" }}
        variant="contained"
        type="submit"
        >Submit question list!
      </Button>

      </div>
    ) }
    </>
  );
}
