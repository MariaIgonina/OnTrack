import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

import {
  fetchApplicant,
  fetchAllApplicants,
  setApplicant,
  updateApplicant,
} from "../store/applicantSlice";

// import { PaperClipIcon } from "@heroicons/react/20/solid";

const ApplicantPage = () => {
  const applicant = useSelector((state: RootState) => state.applicant);
  const dispatch = useDispatch<AppDispatch>();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get("id");

  useEffect(() => {
    dispatch(setApplicant(applicant));
    dispatch(fetchApplicant(+codeParam!));
  }, [dispatch]);

  return (
    <>
      <div>{JSON.stringify(applicant)}</div>
    </>
  );
};

export default ApplicantPage;
