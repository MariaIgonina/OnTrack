import React from "react";
import { Applicant } from "../../Interfaces";
import TranslateIcon from '@mui/icons-material/Translate';

const Languages = ({applicant}:{applicant: Applicant}) => {

  return (
    <>
    <div 
    className="flex-shrink-0 flex-grow flex-col flex rounded-2xl shadow-md bg-white p-4 pr-10 m-1">
      <div className="flex flex-row ">
        <TranslateIcon
          fontSize="small"
          style={{ color: '#026767' }}
          className="mr-2"
        ></TranslateIcon>
        <h2
                className="text-base text-[#475569] text-base "
        >Languages</h2>
      </div>
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
