import React from "react";
import { Applicant } from "../../Interfaces";
import LaptopIcon from '@mui/icons-material/Laptop';

const Skills = ({applicant}:{applicant: Applicant}) => {

  return (
    <>
      <div className="flex-shrink-0 flex-grow flex-col flex rounded-2xl shadow-md bg-white p-3 m-1 mt-3 mr-3">
        <div className="flex flex-row ">
          <LaptopIcon
            fontSize="small"
            style={{ color: '#026767' }}
            className="mr-2"
          >
          </LaptopIcon>
          <h2
            className="text-lg font-semibold leading-6 text-[#026767] text-base"
          >Skills</h2>
          </div>

        <div>
          <h2
          className=" text-lg font-semibold leading-8 text-[#374151] text-sm "
          >Computer Languages</h2>
          <ul>
          {Array.isArray(applicant.compLanguages) && applicant.compLanguages.map((cl) => {
            return (
              <li >
                <p>{cl}</p>
              </li>
            )
          })}
          </ul>
        </div>

        <div>
          <h2
          className="mt-3 text-lg font-semibold leading-6 text-[#374151] text-sm"
          >Professional skills</h2>
          <ul>
          {Array.isArray(applicant.skillsProf) && applicant.skillsProf.map((pr) => {
            return (
              <li >
                <p>{pr}</p>
              </li>
            )
          })}
          </ul>
        </div>

        <div>
          <h2
          className="mt-3 text-lg font-semibold leading-6 text-[#374151] text-sm"
          >Stack</h2>
          <ul>
            {Array.isArray(applicant.stack) && applicant.stack.map((st) => {
              return (
                <li >
                  <p>{st}</p>
                </li>
              )
            })}
            </ul>
        
        </div>
      </div>
    </>
  );
};

export default Skills;
