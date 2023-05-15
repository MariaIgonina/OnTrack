import { useState, useEffect } from "react";
import { languages, levelLanguages } from "../library";

export function LanguageBlock({setLanguageArray}: { setLanguageArray: React.Dispatch<React.SetStateAction<(string | undefined)[]>>} ) {

    const [language, setLanguage] = useState(" - ");

    function handleAddLanguage (e: React.ChangeEvent<HTMLSelectElement>) {
      e.preventDefault();
      setLanguage(prevLanguage => {
        const level = prevLanguage.split("-")[1].trim();
        return `${e.target.value} - ${level}` 
      });
    }

    function handleAddLevel (e: React.ChangeEvent<HTMLSelectElement>) {
      e.preventDefault();
      setLanguage(prevLanguage => {
        const language = prevLanguage.split("-")[0].trim();
        return `${language} - ${e.target.value}` 
      });
    }

    function handleDeletelanguage(event : React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      event.preventDefault();
      setLanguage(" - ")
    }
    function handleSubmitLanguage(event : React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      event.preventDefault();
      setLanguageArray(prevState => [...prevState, language])
      setLanguage(" - ");
    }

    useEffect(() => {
      console.log(language)
    }, [language])

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
          <div className="grid grid-cols-1 mt-5 ">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Language
            </label>
            <select
              className="py-2 px-3 rounded-lg border-2 bordercolor-#F1F0EA mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
              onChange={handleAddLanguage}
              defaultValue={"DEFAULT"}
            >
              <option
                disabled
                value="DEFAULT"
                style={{ color: "gray", fontStyle: "italic" }}
              >
                Choose languages
              </option>
              {languages.map((language) => (
                <option key={language}>{language}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 mt-5">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Level
            </label>
            <select
              className="py-2 px-3 rounded-lg border-2 bordercolor-#F1F0EA mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
              onChange={handleAddLevel}
              defaultValue={"DEFAULT"}
            >
              <option
                disabled
                value="DEFAULT"
                style={{ color: "gray", fontStyle: "italic" }}
              >
                Choose level
              </option>
              {levelLanguages.map((level, index) => (
                <option key={index}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
          <div className="grid grid-cols-1 ml-9">
            
              {language !== " - " && <li  style={{ listStyleType: "none" }}>
                {language}
                <button
                  onClick={handleDeletelanguage}
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
              <button
                  onClick={handleSubmitLanguage}
                  className="ml-2 mt-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 focus:outline-none"
                  style={{ backgroundColor:"#00AB66", color: "#FFFFFF"}}
                >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-check-circle">
                  <path d="M22 11.07V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </button>
            </li>}
             
          </div>
        </div>
      </>
    );
  }