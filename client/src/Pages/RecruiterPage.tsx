import React from "react";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import RecruiterForm from "../Components/RecruiterForm";
import DashboardPage from "../Pages/DashboardPage";

import {
  fetchRecruiter,
  setRecruiter,
  createRecruiter,
  updateRecruiter,
} from "../store/recruiterSlice";

export default function RecruiterPage() {
  const recruiter = useSelector((state: RootState) => state.recruiter);
  const dispatch = useDispatch<AppDispatch>();

  const codeParam = window.location.pathname.split("/").reverse()[0];

  useEffect(() => {
    dispatch(setRecruiter(recruiter));
    dispatch(fetchRecruiter(+codeParam!));
  }, [dispatch]);

  if (!recruiter.recruiter.name) {
    return <RecruiterForm />;
  } else {
    return <DashboardPage />;
  }
}
