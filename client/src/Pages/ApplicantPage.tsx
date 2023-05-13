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

import { Applicant } from "../Interfaces";

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
  const currentUser = useSelector((state: RootState) => state.currentUser.id);
  const dispatch = useDispatch<AppDispatch>();
  const codeParam = window.location.pathname.split("/").reverse()[0];

  useEffect(() => {
    console.log("cureent ysfter", currentUser);
    dispatch(fetchApplicant(+currentUser));
    //dispatch(fetchApplicant(+currentUser.id));
    //dispatch(setApplicant(applicant));
    // console.log("App", applicant);
  }, [dispatch]);

  return (
    <>
      <div className="mt-20 bg-stone-100 h-full m-0">
        <div className=" flex flex-row">
          <div className=" flex flex-col">
            <div className=" flex flex-row">
              <Avatar applicant={applicant} />

              <PersonalInfo applicant={applicant} />

              <div className=" flex flex-col">
                <CurrentLocation applicant={applicant} />
                <JobPreferences applicant={applicant} />
              </div>

              <div className="flex flex-col">
                <Languages applicant={applicant} />
                <Hobbies applicant={applicant} />
              </div>
            </div>

            <About applicant={applicant} />
          </div>
          <Skills applicant={applicant} />
        </div>

        <div className=" flex flex-row">
          <EducationComp applicant={applicant} />
          <ExperienceComp applicant={applicant} />

          <Video applicant={applicant} />
        </div>
      </div>
    </>
  );
};

export default ApplicantPage;
