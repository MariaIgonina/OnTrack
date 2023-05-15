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
          className="text-base mt-2 text-[#DF6831] text-base font-bold"
          >Computer Languages</h2>
          <ul>
          {Array.isArray(applicant.compLanguages) && applicant.compLanguages.map((cl) => {
            return (
              <li >
                <p
                className="text-base text-[#475569] text-base "
                >{cl}</p>
              </li>
            )
          })}
          </ul>
        </div>

        <div>
          <h2
          className="text-base mt-2 text-[#DF6831] text-base font-bold"
          >Professional skills</h2>
          <ul>
          {Array.isArray(applicant.skillsProf) && applicant.skillsProf.map((pr) => {
            return (
              <li >
                <p
                className="text-base text-[#475569] text-base "
                >{pr}</p>
              </li>
            )
          })}
          </ul>
        </div>

        <div>
          <h2
          className="text-base mt-2 text-[#DF6831] text-base font-bold"
          >Stack</h2>
          <ul>
            {Array.isArray(applicant.stack) && applicant.stack.map((st) => {
              return (
                <li >
                  <p
                  className="text-base text-[#475569] text-base "
                  >{st}</p>
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
