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
  // const role = "recruiter"; // cCURRENT USER STATE REDUX

  const currentUser = useSelector((s: RootState) => s.currentUser);

  const codeParam = window.location.pathname.split("/").reverse()[0];

  useEffect(() => {
    console.log("inside the user login page", currentUser);
  }, []);

  useEffect(() => {
    if (currentUser.role !== "applicant") {
      // dispatch(setRecruiter(currentUser.));
      dispatch(fetchRecruiter(+currentUser.id));
    } else {
      // dispatch(setApplicant(recruiter));
      dispatch(fetchApplicant(+currentUser.id));
    }
  }, [dispatch]);

  if (currentUser.role !== "applicant") {
    console.log("we are inside the check");
    if (!recruiter.recruiter.name) {
      return <RecruiterForm />;
    } else {
      return <DashboardPage />;
    }
  } else {
<<<<<<< HEAD
    if (applicant.applicant.familyName === "" || applicant.applicant.familyName === null) {
      console.log(applicant);
=======
    if (applicant.familyName === "") {
      // console.log(applicant);
>>>>>>> Development
      console.log("i am hitting the correct block in uerlogin");
      return <AddApplicantPage />;
    } else {
      return <DashboardPage />;
    }
  }
}
