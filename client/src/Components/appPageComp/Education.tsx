import React from "react";

import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchEducationByApplicant, setEducation } from "../../store/educationSlice";
import { Education } from "../../Interfaces";


const EducationComp = ({applicant}) => {

  const educations = useSelector(
    (s: RootState) => s.applicant.education
  ) as unknown as Education[]; 
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    dispatch(fetchEducationByApplicant(54));
    console.log(educations)
}, []);

  return (
    <>

    </>
  );
};

export default EducationComp;
