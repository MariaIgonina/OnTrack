import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

import {
  fetchApplicant,
  fetchAllApplicants,
  setApplicant,
  updateApplicant,
} from "../store/applicantSlice";

const ApplicantPage = () => {
  const applicant = useSelector((state: RootState) => state.applicant);
  const dispatch = useDispatch<AppDispatch>();
  const codeParam = window.location.pathname.split("/").reverse()[0];

  useEffect(() => {
    dispatch(setApplicant(applicant));
    if (codeParam) {
      dispatch(fetchApplicant(+codeParam!));
    }
  }, [dispatch]);

  return (
    <>
      <div>{JSON.stringify(applicant)}</div>
    </>
  );
};

export default ApplicantPage;
