import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from "../store/store";

import { fetchApplicant, fetchAllApplicants, setApplicant, updateApplicant } from "../store/applicantSlice";




const ApplicantPage = () => {
  const applicant = useSelector((state:RootState) => state.applicant)
  const dispatch = useDispatch<AppDispatch>();

  useEffect (() => {
    dispatch(setApplicant(applicant));
    dispatch(fetchApplicant(1))
  }, [dispatch])






  return (
    <>
      <div>
       {JSON.stringify(applicant)}
      </div>
    </>
  );
};

export default ApplicantPage;