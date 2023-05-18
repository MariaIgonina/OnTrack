import React from "react";
import { Applicant } from "../../Interfaces";
import WorkIcon from '@mui/icons-material/Work';

const JobPreferences = ({applicant}:{applicant: Applicant}) => {

  return (
    <>
    <div
    className="flex-shrink-0 flex-grow flex-col flex rounded-2xl shadow-md bg-[#FFE8D1] p-4 pr-10 m-1">
      <div className="flex flex-row ">
        <WorkIcon
          fontSize="small"
          style={{ color: '#026767' }}
          className="mr-2"
        ></WorkIcon>
        <h2
        className="text-lg font-semibold leading-8 text-[#026767] text-base"
        >Job Preferences</h2>
      </div>

      <p
      className="text-base text-[#475569] text-base "
      >{applicant.workingHours}</p>
      <p
      className="text-base text-[#475569] text-base "
      >{applicant.workingModal}</p>
      
    </div>
    </>
  );
};

export default JobPreferences;
