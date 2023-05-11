import React from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Avatar from "../Components/appPageComp/Avatar";
import CurrentLocation from "../Components/appPageComp/CurrLocation";
import Education from "../Components/appPageComp/Education";
import Experience from "../Components/appPageComp/Experience";
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

const ApplicantPage = () => {
  const applicant = useSelector((state: RootState) => state.applicant);
  const dispatch = useDispatch<AppDispatch>();
  const codeParam = window.location.pathname.split("/").reverse()[0];

  useEffect(() => {
    dispatch(setApplicant(applicant));
    if (codeParam) {
      dispatch(fetchApplicant(+codeParam!));
    }
  }, [dispatch]);

  return (
    <>
      <Avatar 
      applicant = {applicant}/>
      <PersonalInfo 
      applicant = {applicant}/>
      <CurrentLocation 
      applicant = {applicant}/>
      <JobPreferences 
      applicant = {applicant}/>
      <Skills 
      applicant = {applicant}/>
      <About 
      applicant = {applicant}/>
      <Video 
      applicant = {applicant}/>
      <Experience 
      applicant = {applicant}/>
      <Education 
      applicant = {applicant}/>
      <Languages 
      applicant = {applicant}/>
      <Hobbies 
      applicant = {applicant}/>
    </>
  );
};

export default ApplicantPage;
