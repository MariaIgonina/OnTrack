import React from "react";
import { Applicant } from "../../Interfaces";
import PlaceIcon from '@mui/icons-material/Place';

const CurrentLocation = ({applicant}:{applicant: Applicant}) => {

  return (
    <>
      <div
      className="flex-shrink-0 flex-grow flex-col flex rounded-2xl shadow-md bg-white p-3 m-1 mt-3"
      >

      <div className="flex flex-row ">
        <PlaceIcon
          fontSize="small"
          style={{ color: '#026767' }}
          className="mr-2"
        ></PlaceIcon>
        <h2
        className="text-lg font-semibold leading-6 text-[#026767] text-base"
        >Current Location</h2>
      </div>
      <p
      className="text-base text-[#475569] text-base "
      >{applicant.location}</p>

      {applicant.readyToMove === true ? (
        <p
        className="text-base text-[#475569] text-base "
        >Ready to move</p>
      ) : (
        <p
        className="text-base text-[#475569] text-base "
        >Not ready to move</p>
      )}
    </div>
    </>
  );
};

export default CurrentLocation;
