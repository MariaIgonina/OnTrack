import React from "react";
import { Applicant } from "../../Interfaces";

const CurrentLocation = ({applicant}:{applicant: Applicant}) => {

  return (
    <>
      <div
      className="flex-shrink-0 flex-grow flex-col flex rounded-2xl shadow-md bg-white p-3 m-4 mt-8"
      >
      <h2
      className="text-lg font-semibold leading-6 text-[#026767] sm:text-3xl"
      >Current Location</h2>
      <p>{applicant.location}</p>

      {applicant.readyToMove === true ? (
        <p>Ready to move</p>
      ) : (
        <p>Not ready to move</p>
      )}
    </div>
    </>
  );
};

export default CurrentLocation;
