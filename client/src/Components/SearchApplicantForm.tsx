import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchCities, fetchFilteredApplicants } from "../store/applicantSlice";
// import { URLSearchParams } from 'url';
import React, { useEffect, useState } from "react";
// import 'url-search-params-polyfill';
import {
  languages,
  profSkills,
  compLanguages,
  stack,
  workingModals,
  workingHours,
  levelLanguages,
} from "../library";
import { LanguageBlock } from "./LanguageBlock";

export default function SearchApplicantForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [locations, setLocations] = useState<Array<string>>([]);
  const [languageArray, setLanguageArray] = useState<(string | undefined)[]>(
    []
  );
  const [levelArray, setLevelArray] = useState<(string | undefined)[]>([]);
  const [stackArray, setStackArray] = useState<(string | undefined)[]>([]);
  const [profSkillsArray, setProfSkillsArray] = useState<
    (string | undefined)[]
  >([]);
  const [workModal, setWorkModal] = useState<string | undefined>("");
  const [workHour, setWorkHour] = useState<string | undefined>("");
  const [loc, setLoc] = useState<string | undefined>("");
  const [numLanguages, setNumLanguages] = useState(1);

  useEffect(() => {
    const fetchLocations = async () => {
      const cities = await dispatch(fetchCities());
      setLocations(cities.payload);
    };
    fetchLocations();
  }, []);

  const handleDeletelevel = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    event.preventDefault();
    const updateLevel = [...levelArray];
    updateLevel.splice(index, 1);
    setLevelArray(updateLevel);
    console.log(levelArray);
  };

  // const handleAddLevel = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedLevel = event.target.value;
  //   setLevelArray((preLevel) => [...preLevel, selectedLevel]);
  // };

  // const handleDeletelanguage = (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  //   index: number
  // ) => {
  //   event.preventDefault();
  //   const updateLang = [...languageArray];
  //   updateLang.splice(index, 1);
  //   setLanguageArray(updateLang);
  //   console.log(languageArray);
  // };

  // const handleAddLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedLanguage = event.target.value;
  //   setLanguageArray((preLanguage) => [...preLanguage, selectedLanguage]);
  // };

  function handleDeleteLangAfterSubmit (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, language: string) {
    e.preventDefault();
    setLanguageArray(prevState => {
      console.log(prevState[0] == language)
      return prevState.filter(lang => lang !== language)
    })
  }

  useEffect(() => {
    console.log("MIRAR AQUI ==> ", languageArray)
  }, [languageArray])

  const handleDeleteStack = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    event.preventDefault();
    const updateStack = [...stackArray];
    updateStack.splice(index, 1);
    setStackArray(updateStack);
  };

  const handleAddStack = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStack = event.target.value;
    setStackArray((preStack) => [...preStack, selectedStack]);
  };

  const handleDeleteProfSkills = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    event.preventDefault();
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

  const handleAddLocation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectLoc = e.target.value;
    setLoc(selectLoc);
    console.log(locations);
  };

  const handleDeleteloc = () => {
    setLoc("");
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

  const url = new URL("http://localhost:3000/filterApplicants");

  if (workModal) url.searchParams.set("workingModal", workModal);
  if (workHour) url.searchParams.set("workingHours", workHour);
  if (loc) url.searchParams.set("desiredLocation", loc);
  if (languageArray.length)
    url.searchParams.set("languages", languageArray.join(","));
  if (stackArray.length) url.searchParams.set("stack", stackArray.join(","));
  if (profSkillsArray.length)
    url.searchParams.set("skillsProf", profSkillsArray.join(","));

  const handleSearchApplicants = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    const response = await dispatch(fetchFilteredApplicants(url));
    console.log(response);
  };

  function handleAddLanguageBlock(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    setNumLanguages(numLanguages + 1);
  }

  function handleDeleteLanguageBlock(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    setNumLanguages(numLanguages - 1);
  }

  

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
          {[...Array(numLanguages)].map((_, index) => (
            <LanguageBlock
              key={index}
              setLanguageArray={setLanguageArray}
            />
          ))}

          <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5">
            <button
              onClick={(e) => handleAddLanguageBlock(e)}
              className="w-auto bg-orange-100 hover:bg-orange-dark rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              Add a language
            </button>
            {numLanguages > 1 && (
              <button
                onClick={(e) => handleDeleteLanguageBlock(e)}
                className="w-auto bg-orange-100 hover:bg-orange-dark rounded-lg shadow-xl font-medium text-white px-4 py-2"
              >
                Delete language
              </button>
            )}
          </div>
          {languageArray.map((language, i) => {
            return (
              <>
                <div>{language}</div>
                <button
                  onClick={(e) => handleDeleteLangAfterSubmit(e, language!)}
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
              </>
            )
          })}

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Working Modals
            </label>
            <select
              className="py-2 px-3 rounded-lg border-2 bordercolor-#F1F0EA mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
              onChange={handleAddWorkingModals}
              defaultValue={"DEFAULT"}
            >
              <option
                disabled
                value="DEFAULT"
                style={{ color: "gray", fontStyle: "italic" }}
              >
                Choose working modal
              </option>
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
              defaultValue={"DEFAULT"}
            >
              <option
                disabled
                value="DEFAULT"
                style={{ color: "gray", fontStyle: "italic" }}
              >
                Choose working hours
              </option>
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
              defaultValue={"DEFAULT"}
            >
              <option
                disabled
                value="DEFAULT"
                style={{ color: "gray", fontStyle: "italic" }}
              >
                Choose stack skills
              </option>
              {stack.map((element, index) => (
                <option key={index}>{element}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 ml-9 mx-7">
            {stackArray.map((stack, index) => (
              <li key={index} style={{ listStyleType: "none" }}>
                {stack}
                <button
                  onClick={(event) => handleDeleteStack(event, index)}
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
              defaultValue={"DEFAULT"}
            >
              <option
                disabled
                value="DEFAULT"
                style={{ color: "gray", fontStyle: "italic" }}
              >
                Choose professional skills
              </option>
              {profSkills.map((skill, index) => (
                <option key={index}>{skill}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 ml-9 mx-7">
            {profSkillsArray.map((skill, index) => (
              <li key={index} style={{ listStyleType: "none" }}>
                {skill}
                <button
                  onClick={(event) => handleDeleteProfSkills(event, index)}
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
              Location
            </label>
            <select
              className="py-2 px-3 rounded-lg border-2 bordercolor-#F1F0EA mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
              onChange={handleAddLocation}
              defaultValue={"DEFAULT"}
            >
              <option
                disabled
                value="DEFAULT"
                style={{ color: "gray", fontStyle: "italic" }}
              >
                Choose location
              </option>
              {locations.map((city, index) => (
                <option key={index}>{city}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 ml-9 mx-7">
            {loc && (
              <ul>
                <li>
                  {loc}
                  <button
                    onClick={() => handleDeleteloc()}
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

          <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
            <button
              onClick={(e) => handleSearchApplicants(e)}
              className="w-auto bg-orange-100 hover:bg-orange-dark rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
