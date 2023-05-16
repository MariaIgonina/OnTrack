import React from "react";
import AddApplicantPage from "./AddApplicantPage";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import RecruiterForm from "../Components/RecruiterForm";
import DashboardPage from "./DashboardPage";
import { fetchApplicant, setApplicant } from "../store/applicantSlice";
import stock4 from "../assets/stock-4.jpeg";

import {
  fetchRecruiter,
  setRecruiter,
  createRecruiter,
  updateRecruiter,
} from "../store/recruiterSlice";

export default function SettingsPage() {
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
    return (
      <div className="bg-stone-100 py-8">
        <div className="flex flex-row bg-white m-8 rounded-lg">
          <img
            src={stock4}
            alt="stockphoto"
            style={{ width: "90%", height: 550 }}
            className="my-8"
          />
          <RecruiterForm />
        </div>
      </div>
    );
  }
}
