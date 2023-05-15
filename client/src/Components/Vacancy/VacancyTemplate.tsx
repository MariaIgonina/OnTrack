import React, { useEffect, useState } from "react";

import { typeForStep } from "../../library";

import PopupQuestionary from "./PopUpQuestionary";

export default function VacancyTemplate({ onCancel }:any) {

  const [stepsArray, setStepsArray] = useState<{}[]>([]);
  const [isPopupQuestionaryOpen, setIsPopupQuestionaryOpen] = useState<Boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAddStep = () => {
    const newStep = {
      title: '',
      type: '',
      durationInMs: '',
      order: 0,
      hidden: false,
    };

    setStepsArray([...stepsArray, newStep]);
    console.log(stepsArray)
  };

  //Hidden toggle
  const handleHiddenChange = (index: number) => {
    const updatedSteps = [...stepsArray];
    updatedSteps[index].hidden = !updatedSteps[index].hidden;
    setStepsArray(updatedSteps);
  };
  
  const handleChange = (e:any, index:number) => {
    const { name, value } = e.target;

    const updatedSteps = [...stepsArray];
    updatedSteps[index][name] = value;
    setStepsArray(updatedSteps);

    if (updatedSteps[index].type === "Questionary") {
      setIsPopupQuestionaryOpen(true);
    };
  }

  const handleRemoveStep = () => {
    setStepsArray(stepsArray.slice(0, -1));
  };

  const saveTrack = () => {
    handleAddStep()
    onCancel()
  }

  return (
    <>
      <div className="rounded-lg w-full m-2 mt-8 flex flex-col items-center justify-center" >
        <h3 className="text-3xl font-bold tracking-tight text-[#026767] text-big flex items-center justify-center">
          Create the template of the admission process for this vacancy
        </h3>
      </div>
      <div className="h-80">
        {stepsArray.length > 0 && (

        <ul className="flex flex-row flex-start h-50">
          {stepsArray.map((step, index) => (
            <li key={index}>
              <article
                className="h-50 bg-orange-200 flex-shrink-0 flex-col flex rounded-2xl shadow-md p-3 m-4 items-center justify-center"
                style={{ width: "400px", minHeight: "100px" }}
              >
                <h3 className="mt-2 uppercase  font-semibold text-lg">
                  STEP {index + 1}
                </h3>
                <div className="flex flex-col">
                <label 
                className="mt-2 uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                htmlFor={`title-${index}`}>Title</label>
                <input
                  className="bg-orange-50 py-2 px-3 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                  type="text"
                  name="title"
                  id={`title-${index}`}
                  value={step.title}
                  onChange={(e) => handleChange(e, index)}
                  required
                />

                <label 
                  className="mt-2 uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                  htmlFor={`type-${index}`}>
                  Type
                </label>
                <select
                  className="bg-orange-50 py-2 px-3 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                  name="type"
                  id={`type-${index}`}
                  value={step.type}
                  onChange={(e) => handleChange(e, index)}
                  required
                >
                  <option value="">Select type</option>
                  {typeForStep.map((stepOption) => (
                    <option
                      key={stepOption}
                      value={stepOption}
                    >
                      {stepOption}
                    </option>
                  ))}
                </select>
                

                <label 
                className="mt-4 uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                htmlFor={`hidden-${index}`}>
                  Should we hide this step from an applicant?
                </label>
                <input
                  className="bg-orange-50 h-7 rounded-lg border color-grey-100 mt-1"
                  type="checkbox"
                  name="hidden"
                  id={`hidden-${index}`}
                  checked={step.hidden}
                  onChange={() => handleHiddenChange(index)}
                />
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
      </div>

      <div className="flex items-center justify-center flex-col">
        <div>
          <button onClick={handleRemoveStep}
            className="w-auto bg-green-100 hover:bg-dark-green rounded-lg shadow-xl font-medium text-white px-4 py-2"
            type="submit">
              Remove step
          </button>

          <button
            onClick={handleAddStep}
            className="mt-4 bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white py-2 px-6 ml-4 h-10 whitespace-nowrap"
              
            type="submit"
          >Add step</button>

          <button
            onClick={saveTrack}
            className="mt-4 ml-4 mb-6 w-44 bg-orange-100 hover:bg-orange-dark rounded-lg shadow-xl font-medium text-white px-4 py-2"
            type="submit"
          >Save track
        </button>
      </div>
    </div>
    {isPopupQuestionaryOpen && <PopupQuestionary />}
    </>
  );
}