import React from "react";
import { Applicant } from "../../Interfaces";

const Hobbies = ({applicant}:{applicant: Applicant}) => {

  return (
    <>
      <div 
      className="flex-shrink-0 flex-grow flex-col flex rounded-2xl shadow-md bg-white p-3 mt-4">
      <h2 
      className="text-lg font-semibold leading-6 text-[#026767] sm:text-3xl"
      >Hobbies</h2>
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
