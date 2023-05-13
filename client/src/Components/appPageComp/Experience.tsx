import React from "react";

import { useState, useEffect } from "react";
import { Applicant } from "../../Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchExperienceByApplicant } from "../../store/experienceSlice";
import { Experience } from "../../Interfaces";
import moment from "moment";
import LegendToggleIcon from "@mui/icons-material/LegendToggle";

const ExperienceComp = ({ applicant }: { applicant: Applicant }) => {
  const experiences = useSelector(
    (s: RootState) => s.experience.experience
  ) as unknown as Experience[];
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchExperienceByApplicant(applicant.idDB));
    console.log(applicant.idDB);
    console.log("EXPERIENCE", experiences);
  }, []);

  return (
    <>
      <div className="flex-shrink-0 flex-grow flex-col flex rounded-2xl shadow-md bg-white p-3 m-1">
        <div className="flex flex-row ">
          <LegendToggleIcon
            fontSize="small"
            style={{ color: "#026767" }}
            className="mr-2"
          ></LegendToggleIcon>
          <h2 className="text-lg font-semibold leading-6 text-[#026767] text-base">
            Experience
          </h2>
        </div>

        <ul>
          {Array.isArray(experiences) &&
            experiences.map((exp) => {
              return (
                <li key={exp.id}>
                  <h3 className=" font-semibold leading-2 ">{exp.jobTitle}</h3>
                  <h4>{exp.company}</h4>
                  <h4>{exp.description}</h4>
                  <p>{`${moment(exp.startDate).format("MMM YYYY")} - ${moment(
                    exp.endDate
                  ).format("MMM YYYY")}`}</p>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default ExperienceComp;
