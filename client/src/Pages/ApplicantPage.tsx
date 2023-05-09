import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

import { fetchApplicant, setApplicant } from "../store/applicantSlice";

// import { PaperClipIcon } from "@heroicons/react/20/solid";

const ApplicantPage = () => {
  const applicant = useSelector((state: RootState) => state.applicant);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setApplicant(applicant));
    dispatch(fetchApplicant());
  }, [dispatch]);

  return (
    <>
      <div>{JSON.stringify(applicant)}</div>
    </>
  );
};

export default ApplicantPage;
