import React from "react";
import AddApplicantPage from "./AddApplicantPage";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import RecruiterForm from "../Components/RecruiterForm";
import DashboardPage from "./DashboardPage";
import { fetchApplicant, setApplicant } from "../store/applicantSlice";

import {
  fetchRecruiter,
  setRecruiter,
  createRecruiter,
  updateRecruiter,
} from "../store/recruiterSlice";

export default function RecruiterLogin() {
  const recruiter = useSelector((state: RootState) => state.recruiter);
  const dispatch = useDispatch<AppDispatch>();
  const applicant = useSelector((state: RootState) => state.applicant);
  const role = 'applicant' // cCURRENT USER STATE REDUX

  const codeParam = window.location.pathname.split("/").reverse()[0];

  useEffect(() => {
    if (role === 'applicant') {
      dispatch(setRecruiter(recruiter));
      dispatch(fetchRecruiter(+codeParam!));
    } else {
      dispatch(setApplicant(recruiter));
      dispatch(fetchApplicant(+codeParam!));
    }
  }, [dispatch]);

  if (role !== 'applicant') {
    if (!recruiter.recruiter.name) {
      return <RecruiterForm />;
    } else {
      return <DashboardPage />;
    }
  } else {
    if (!applicant.applicant.skillsProf?.length) {
      return <AddApplicantPage />;
    } else {
      return <DashboardPage />;
    }
  }
}
