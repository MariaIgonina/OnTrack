import React from "react";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

import { fetchRecruiter, setRecruiter } from "../store/recruiterSlice";
import VacancyList from "../Components/VacancyList";

const RecruiterProfilePage = () => {
  const recruiter = useSelector((state: RootState) => state.recruiter);
  const dispatch = useDispatch<AppDispatch>();
  const codeParam = window.location.pathname.split("/").reverse()[0];
  console.log("recruiter", recruiter);
  useEffect(() => {
    dispatch(setRecruiter(recruiter));
    dispatch(fetchRecruiter(+codeParam!));
  }, [dispatch]);

  return (
    <div className="mt-[80px]">
      <div className="flex ml-20 ">
        <div className="mr-8">
          <img
            src={recruiter.recruiter.logo}
            alt="Logo picture not found"
            className="w-32 h-32 "
          />
          <p className="mt-2">{recruiter.recruiter.email}</p>
          <p>{recruiter.recruiter.externalLinks}</p>
        </div>
        <div className="ml-20">
          <h1 className="text-4xl font-bold">{recruiter.recruiter.name}</h1>
          <div className="grid grid-cols-2 gap-x-4 mt-2">
            <div>
              <p>Founded:</p>
              <p>{recruiter.recruiter.founded}</p>
            </div>
            <div>
              <p>Head Office:</p>
              <p>{recruiter.recruiter.headOffice}</p>
            </div>
          </div>
          <p className="mt-4">Recruiter: {recruiter.recruiter.recruiterName}</p>
          <p className="mt-4">{recruiter.recruiter.about}</p>
        </div>
      </div>
      <div className="mt-20 ml-10 mr-10">
        <VacancyList />
      </div>
    </div>
  );
};

export default RecruiterProfilePage;
