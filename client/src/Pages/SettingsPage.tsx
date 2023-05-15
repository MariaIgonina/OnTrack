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

export default function SettingsPage () {
  const recruiter = useSelector((state: RootState) => state.recruiter);
  const dispatch = useDispatch<AppDispatch>();
  const applicant = useSelector((state: RootState) => state.applicant);

  const currentUser = useSelector((s: RootState) => s.currentUser);

  const codeParam = window.location.pathname.split("/").reverse()[0];

  useEffect(() => {
    if (currentUser.role !== "applicant") {
      dispatch(fetchRecruiter(+currentUser.id));
    } else {
      dispatch(fetchApplicant(+currentUser.id));
    }
  }, [dispatch]);

  if (currentUser.role === "applicant") {
    return <AddApplicantPage />;
  } else {
    return <RecruiterForm />;
  }
}