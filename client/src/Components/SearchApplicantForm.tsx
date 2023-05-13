import React from "react";
import { useState } from "react";
import {
  languages,
  profSkills,
  compLanguages,
  stack,
  workingModals,
  workingHours,
  levelLanguages,
} from "../library";

export default function SearchApplicantForm() {
  const [languageArray, setLanguageArray] = useState<(string | undefined)[]>(
    []
  );
  const [stackArray, setStackArray] = useState<(string | undefined)[]>(
    []
  );
  const [profSkillsArray, setProfSkillsArray] = useState<(string | undefined)[]>(
    []
  );
  const [workModal, setWorkModal] = useState<string | undefined>("");
  const [workHour, setWorkHour] = useState<string | undefined>("");

  const handleDeletelanguage = (index: number) => {
    const updateLang = [...languageArray];
    updateLang.splice(index, 1);
    setLanguageArray(updateLang);
  };

  const handleAddLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    setLanguageArray((preLanguage) => [...preLanguage, selectedLanguage]);
  };

  const handleDeleteStack = (index: number) => {
    const updateStack = [...stackArray];
    updateStack.splice(index, 1);
    setStackArray(updateStack);
  };

  const handleAddStack = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStack = event.target.value;
    setStackArray((preStack) => [...preStack, selectedStack]);
  };

  const handleDeleteProfSkills = (index: number) => {
    const updateSkills = [...profSkillsArray];
    updateSkills.splice(index, 1);
    setProfSkillsArray(updateSkills);
  };

  const handleAddProfSkills = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSkill = event.target.value;
    setProfSkillsArray((preSkill) => [...preSkill, selectedSkill]);
  };

  const handleAddWorkingModals = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedWorkModal = event.target.value;
    setWorkModal(selectedWorkModal);
  };

  const handleDeleteWorkingModals = () => {
    setWorkModal("");
  };

  const handleAddWorkingHours = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedWorkHour = event.target.value;
    setWorkHour(selectedWorkHour);
  };

  const handleDeleteWorkingHours = () => {
    setWorkHour("");
  };

  return (
    <>
      <div className="p-2 flex items-center justify-center w-full">
        <form>
          <div className="">
            <div className="p-2 flex items-center justify-center">
              <h1 className="text-3xl font-bold tracking-tight text-[#026767] text-big  ">
                Search a profile
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Language
            </label>
            <select
              className="py-2 px-3 rounded-lg border-2 bordercolor-#F1F0EA mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
              onChange={handleAddLanguage}
            >
              {languages.map((language) => (
                <option key={language}>{language}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 ml-9 mx-7">
            {languageArray.map((language, index) => (
              <li key={index} style={{ listStyleType: "none" }}>
                {language}
                <button
                  onClick={() => handleDeletelanguage(index)}
                  className="ml-2 mt-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 focus:outline-none"
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
              </li>
            ))}
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Working Modals
            </label>
            <select
              className="py-2 px-3 rounded-lg border-2 bordercolor-#F1F0EA mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
              onChange={handleAddWorkingModals}
            >
              {workingModals.map((modal, index) => (
                <option key={index}>{modal}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 ml-9 mx-7">
            {workModal && (
              <ul>
                <li>
                  {workModal}
                  <button
                    onClick={() => handleDeleteWorkingModals()}
                    className="ml-2 mt-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 focus:outline-none"
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
                </li>
              </ul>
            )}
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Working Hours
            </label>
            <select
              className="py-2 px-3 rounded-lg border-2 bordercolor-#F1F0EA mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
              onChange={handleAddWorkingHours}
            >
              {workingHours.map((hourmodal, index) => (
                <option key={index}>{hourmodal}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 ml-9 mx-7">
            {workHour && (
              <ul>
                <li>
                  {workHour}
                  <button
                    onClick={() => handleDeleteWorkingHours()}
                    className="ml-2 mt-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 focus:outline-none"
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
                </li>
              </ul>
            )}
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Stack
            </label>
            <select
              className="py-2 px-3 rounded-lg border-2 bordercolor-#F1F0EA mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
              onChange={handleAddStack}
            >
              {stack.map((element,index) => (
                <option key={index}>{element}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 ml-9 mx-7">
            {stackArray.map((stack, index) => (
              <li key={index} style={{ listStyleType: "none" }}>
                {stack}
                <button
                  onClick={() => handleDeleteStack(index)}
                  className="ml-2 mt-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 focus:outline-none"
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
              </li>
            ))}
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
            Professional Skills
            </label>
            <select
              className="py-2 px-3 rounded-lg border-2 bordercolor-#F1F0EA mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
              onChange={handleAddProfSkills}
            >
              {profSkills.map((skill,index) => (
                <option key={index}>{skill}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 ml-9 mx-7">
            {profSkillsArray.map((skill, index) => (
              <li key={index} style={{ listStyleType: "none" }}>
                {skill}
                <button
                  onClick={() => handleDeleteProfSkills(index)}
                  className="ml-2 mt-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 focus:outline-none"
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
              </li>
            ))}
          </div>       

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label
              htmlFor="externalLinks"
              className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
            >
              Add your external Links
            </label>
            <div className="flex flex-row items-center">
              <input
                className="py-2 px-3 w-full rounded-lg border border-#F1F0EA mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                type="text"
                id="externalLinks"
                name="externalLinks"
                // value={externalLink}
                // onChange={handleExtLinkChange}
              />
              <button
                // onClick={handleAddLink}
                className="bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white py-2 px-6 ml-4 h-10 mt-1 whitespace-nowrap"
              >
                Add more
              </button>
            </div>
            <ul></ul>
          </div>

          <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
            <button
              // onClick={onCancel}
              className="w-auto bg-green-100 hover:bg-dark-green rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              Cancel
            </button>
            <button
              // onClick={(e) => handleCreateRecruiter(e)}
              className="w-auto bg-orange-100 hover:bg-orange-dark rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
