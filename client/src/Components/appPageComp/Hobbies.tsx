import React from "react";
import { Applicant } from "../../Interfaces";
import SurfingIcon from '@mui/icons-material/Surfing';

const Hobbies = ({applicant}:{applicant: Applicant}) => {

  return (
    <>
      <div 
        className="flex-shrink-0 flex-grow flex-col flex rounded-2xl shadow-md bg-[#FFE8D1] p-3 m-1 mt-3">
      <div className="flex flex-row ">
        <SurfingIcon
          fontSize="small"
          style={{ color: '#026767' }}
          className="mr-2"
        ></SurfingIcon>
        <h2 
          className="text-lg font-semibold leading-6 text-[#026767] text-base"
          >
          Hobbies</h2>
        </div>
        <ul>
        {Array.isArray(applicant.hobbies) && applicant.hobbies.map((hobbie) => {
          return (
            <li >
              <p>{hobbie}</p>
            </li>
          )
        })}
        </ul>
      </div>
    </>
  );
};

export default Hobbies;
