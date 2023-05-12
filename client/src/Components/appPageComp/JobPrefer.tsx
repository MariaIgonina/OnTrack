import React from "react";


const JobPreferences = ({applicant}) => {

  return (
    <>
    <div
    className="flex-shrink-0 flex-col flex rounded-2xl shadow-md bg-white p-3 m-5 ">
      <h2
      className="text-lg font-semibold leading-6 text-[#026767] sm:text-3xl"
      >Job Preferences</h2>
      <p>{applicant.workingHours}</p>
      <p>{applicant.workingModal}</p>
      
    </div>
    </>
  );
};

export default JobPreferences;
