import React from "react";

import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchExperienceByApplicant } from "../../store/experienceSlice";
import { Experience } from "../../Interfaces";
import moment from 'moment'


const ExperienceComp = ({applicant}) => {

  const experiences = useSelector(
    (s: RootState) => s.experience.experience
  ) as unknown as Experience[]; 
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    dispatch(fetchExperienceByApplicant(54));
    console.log("EXPERIENCE", experiences)
}, []);

  return (
    <>
    <div 
    className="flex-shrink-0 flex-col flex rounded-2xl shadow-md bg-white p-3 m-5 ">
      <h2
      className="text-lg font-semibold leading-6 text-[#026767] sm:text-3xl"
      >Experience</h2>
          <ul>
          {Array.isArray(experiences) && experiences.map((exp) => {
            return (
              <li key={exp.id}>
                <h3>{exp.jobTitle}</h3>
                <h4>{exp.company}</h4>
                <h4>{exp.description}</h4>
                <p>{`${moment(exp.startDate).format("MMM YYYY")} - ${moment(exp.endDate).format("MMM YYYY")}`}</p>
              </li>
            )
          })}
          </ul>
      </div>
    </>
  );
};

export default ExperienceComp;
