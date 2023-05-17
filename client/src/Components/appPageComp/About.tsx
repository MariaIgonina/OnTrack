import React from "react";
import { Applicant } from "../../Interfaces";
import InfoIcon from '@mui/icons-material/Info';
import { fontSize } from "@mui/system";

const About = ({applicant}:{applicant: Applicant}) => {


  return (
    <>
      <div
      className="flex wrap stretch flex-grow flex-col rounded-2xl shadow-md bg-[#D7E7E8] p-4 pr-8 m-1 ml-3">
        
        <div className="flex flex-row ">
          <InfoIcon
            fontSize="small"
            style={{ color: '#026767' }}
            className="mr-2"
          >
          </InfoIcon>
          <h2
            className="text-lg font-semibold leading-6 text-[#026767] text-base"
          >About</h2>
        </div>
        <p
        className="text-base break-words text-[#475569] text-base "
        >{applicant.about}</p>
        
      </div>
    </>
  );
};

export default About;
