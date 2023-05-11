import React from "react";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchEducationByApplicant, setEducation } from "../../store/educationSlice";
import { Education } from "../../Interfaces";


const EducationComp = ({applicant}) => {

  const educations = useSelector(
    (s: RootState) => s.education.education
  ) as unknown as Education[]; 
  const dispatch = useDispatch<AppDispatch>();


  console.log("!!!!!!!!!!", educations)
  useEffect(() => {
    dispatch(fetchEducationByApplicant(54));
}, []);

  return (
    <>
      <div className="grid gap-8 md:grid-rows-2 lg:grid-cols-2">
        <ul>
        {Array.isArray(educations) && educations.map((edu) => {
          return (
            <li key={edu.id}>
              <h3>{edu.place}</h3>
              <h4>{edu.degree}</h4>
              <h4>{edu.speciality}</h4>
            </li>
          )
        })}
        </ul>
      </div>
    </>
  );
};

export default EducationComp;
