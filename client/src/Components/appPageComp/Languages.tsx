import React from "react";
import { Applicant } from "../../Interfaces";

const Languages = ({applicant}:{applicant: Applicant}) => {

  return (
    <>
    <div 
    className="flex-shrink-0 flex-grow flex-col flex rounded-2xl shadow-md bg-white p-3 mt-8">
      <h2
      className="text-lg font-semibold leading-6 text-[#026767] sm:text-3xl"
      >Languages</h2>
          <ul>
          {Array.isArray(applicant.languages) && applicant.languages.map((language) => {
            return (
              <li >
                <p>{language}</p>
              </li>
            )
          })}
          </ul>
      </div>
    </>
  );
};

export default Languages;
