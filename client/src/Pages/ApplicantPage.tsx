import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../store/store";

import { fetchApplicant, setApplicant } from "../store/applicantSlice";




const ApplicantPage = () => {
  // const applicant = useSelector((state:RootState) => state.applicant)
  // const dispatch = useDispatch();

  // useEffect (() => {
  //   dispatch(setApplicant(applicant));
  // }, [dispatch])




  return (
    <>
      <div>

      </div>
    </>
  );
};

export default ApplicantPage;