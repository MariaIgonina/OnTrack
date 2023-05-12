import React from "react";
import { Applicant } from "../../Interfaces";


const About = ({applicant}:{applicant: Applicant}) => {

  return (
    <>
      <div
      className="flex-shrink-0 flex-col flex rounded-2xl shadow-md bg-white p-3 m-5 ">
        <h2
        className="text-lg font-semibold leading-6 text-[#026767] sm:text-3xl"
        >About</h2>
        {applicant.about}
      </div>
    </>
  );
};

export default About;
