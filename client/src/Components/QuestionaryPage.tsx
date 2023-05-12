import React, { useEffect, useState } from "react";
import { 
  Stepper,
  StepLabel,
  Step,
  Button
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import { typeForStep } from "../library";

import PopupQuestionary from "./PopUpQuestionary";

export default function Questionary() {
  const navigate = useNavigate();

  const [stepsArray, setStepsArray] = useState([]);

  const handleAddStep = () => {
    const newStep = {
      title: '',
      type: '',
      durationInMs: '',
      order: 0,
      hidden: false,
    };

    setStepsArray([...stepsArray, newStep]);
  };

  const handleRemoveStep = () => {
    setStepsArray(stepsArray.slice(0, -1));
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSteps = [...stepsArray];
    updatedSteps[index][name] = value;
    setStepsArray(updatedSteps);
  };

  return (
    <>
      <div className="bg-stone-100 py-8 sm:py-32 rounded-lg w-full m-5 mt-8">
        <h3 className="text-1xl font-bold tracking-tight text-[#026767] sm:text-3xl mb-2">
          Here you can create the template of the admission process for this vacancy
        </h3>

        <ul className="flex flex-row">
          {stepsArray.map((step, index) => (
            <li key={index}>
              <article
                className="flex-shrink-0 flex-col flex rounded-2xl shadow-md bg-white p-3 m-5 "
                style={{ width: "400px", minHeight: "100px" }}
              >
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  STEP {index + 1}
                </h3>

                <label htmlFor={`title-${index}`}>Title</label>
                <input
                  type="text"
                  name="title"
                  id={`title-${index}`}
                  value={step.title}
                  onChange={(e) => handleChange(e, index)}
                  required
                />

                <label htmlFor={`type-${index}`}>Type</label>
                <input
                  type="text"
                  name="type"
                  id={`type-${index}`}
                  value={step.type}
                  onChange={(e) => handleChange(e, index)}
                  list="typeForStep"
                />
                <datalist id="typeForStep">
                  {typeForStep.map((step) => (
                    <option key={step} value={step} />
                  ))}
                </datalist>

                {step.type === "Questionary" && <PopupQuestionary />}

                <label htmlFor={`hidden-${index}`}>
                  Should we hide this step from an applicant?
                </label>
                <input
                  type="checkbox"
                  id={`hidden-${index}`}
                  checked={step.hidden}
                  onChange={(e) => handleChange(e, index)}
                />
              </article>
            </li>
          ))}
        </ul>

      <Button
       onClick={handleAddStep}
       sx={{ backgroundColor: "#568EA3" }}
       variant="contained"
       type="submit"
      >Add step</Button>

      {stepsArray.length > 0 && (
        <Button onClick={handleRemoveStep}
        sx={{ backgroundColor: "#568EA3" }}
        variant="contained"
        type="submit">
          Remove step
        </Button>
      )}

    </div>
    </>
  );
}
