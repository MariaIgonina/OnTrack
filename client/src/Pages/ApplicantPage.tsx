import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Avatar from "../Components/appPageComp/Avatar";
import CurrentLocation from "../Components/appPageComp/CurrLocation";
import EducationComp from "../Components/appPageComp/Education";
import ExperienceComp from "../Components/appPageComp/Experience";
import Hobbies from "../Components/appPageComp/Hobbies";
import JobPreferences from "../Components/appPageComp/JobPrefer";
import Languages from "../Components/appPageComp/Languages";
import PersonalInfo from "../Components/appPageComp/PersonalInfo";
import Skills from "../Components/appPageComp/Skills";
import Video from "../Components/appPageComp/Video";
import About from "../Components/appPageComp/About";

import { Applicant, CurrentUserType } from "../Interfaces";

import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  fetchApplicant,
  fetchAllApplicants,
  setApplicant,
  updateApplicant,
} from "../store/applicantSlice";
import { current } from "@reduxjs/toolkit";

const ApplicantPage = () => {
  const applicant = useSelector(
    (state: RootState) => state.applicant.applicant
  );

  const currentUser = useSelector(
    (state: RootState) => state.currentUser
  ) as unknown as CurrentUserType;
  const dispatch = useDispatch<AppDispatch>();
  const codeParam = window.location.pathname.split("/").reverse()[0];

  useEffect(() => {
    if (currentUser.id === +codeParam) {
      console.log("cureent ysfter", currentUser.id);
      dispatch(fetchApplicant(+currentUser.id));
      console.log("WE CALLED AN APPLICANT", applicant)
    } else {
      dispatch(fetchApplicant(+codeParam));
    }
  }, [dispatch, currentUser]);

  return (
    <>
      <div className=" bg-[#FFFEF5] h-full ">
        <div className=" flex flex-row wrap ">
          <div className=" flex flex-col wrap  items-stretch">
            <div className=" flex flex-row wrap  items-stretch">
              <Avatar applicant={applicant} />

              <PersonalInfo applicant={applicant} />

              <div className=" flex flex-col wrap items-stretch ">
                <CurrentLocation applicant={applicant} />
                <JobPreferences applicant={applicant} />
              </div>

              <div className="flex flex-col wrap  items-stretch">
                <Hobbies applicant={applicant} />
                <Languages applicant={applicant} />
              </div>
            </div>

          <div className=" flex flex-row wrap items-stretch">
            <EducationComp
            applicant = {applicant}/>
            <ExperienceComp 
            applicant = {applicant}/>
          </div>
          </div>
          <Skills applicant={applicant} />
        </div>
       
      <div className=" flex flex-row  wrap items-stretch">
        <About applicant={applicant} />
      
        <Video 
        applicant = {applicant}/>
      </div>
      
      
      </div>
      



    </>
    
  );
};

export default ApplicantPage;
