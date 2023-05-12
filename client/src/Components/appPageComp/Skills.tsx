import React from "react";
import { Applicant } from "../../Interfaces";

const Skills = ({applicant}:{applicant: Applicant}) => {

  return (
    <>
      <div className="flex-shrink-0  flex-grow flex-col flex rounded-2xl shadow-md bg-white p-3 p-3 mt-8 mr-8">
        <div>
          <h2
          className=" text-lg font-semibold leading-6 text-[#026767] sm:text-3xl"
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
          className="mt-3 text-lg font-semibold leading-6 text-[#026767] sm:text-3xl"
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
          className="mt-3 text-lg font-semibold leading-6 text-[#026767] sm:text-3xl"
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
