import React, { useCallback } from "react";
import AddApplicantPage from "./AddApplicantPage";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import DashboardPage from "./DashboardPage";
import { fetchApplicant, setApplicant } from "../store/applicantSlice";
import { fetchRecruiter, setRecruiter, createRecruiter, updateRecruiter } from "../store/recruiterSlice";
import { useNavigate } from "react-router-dom";
import RecruiterForm from "../Components/RecruiterForm";

// There's some thing strange with the type, we have to check, probably in the slice.

export default function RecruiterLogin() {
  const recruiter = useSelector((state: RootState) => state.recruiter.recruiter);
  const dispatch = useDispatch<AppDispatch>();
  const applicant = useSelector((state: RootState) => state.applicant.applicant);
  const navigate = useNavigate()

  const currentUser = useSelector((s: RootState) => s.currentUser);

  // const codeParam = window.location.pathname.split("/").reverse()[0];

  useEffect(() => {
    console.log("inside the user login page", currentUser);
    currentUser.role === undefined && navigate('/');
  }, []);

  useEffect(() => {
    console.log('currentUser => ', currentUser?.role, currentUser)
    if (currentUser.role !== "applicant") {
      // dispatch(setRecruiter(currentUser));
      dispatch(fetchRecruiter(+currentUser.id!));
    } else if (currentUser.role === "applicant") {
      // dispatch(setApplicant(recruiter));
      dispatch(fetchApplicant(+currentUser.id!));
    }
    console.log(recruiter)
  }, [dispatch]);

  return (
    <>
      {currentUser.role !== undefined ?
        currentUser?.role === "applicant"
          ? applicant?.familyName ? <DashboardPage /> : <AddApplicantPage />
          : recruiter?.name ? <DashboardPage /> : <RecruiterForm />
        :
        currentUser.role === undefined &&
        <div className="w-screen h-screen
        flex justify-center items-center text-lg text-green-800 bg-stone-100">Redirecting to login</div>
      }
    </>
  )
}
