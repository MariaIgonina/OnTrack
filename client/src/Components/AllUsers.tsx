import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchAllApplicants } from "../store/applicantSlice";
import { Applicant } from "../Interfaces";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";

export default function AllUsers() {
  const applicants = useSelector(
    (s: RootState) => s.applicant.applicant
  ) as unknown as Applicant[]; //THIS IS BAD TYPESCRIPT REFACTOR THIS ROSIE
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllApplicants());
  }, []);

  return (
    <div className="bg-stone-100 py-24 sm:py-32 rounded-lg m-4 ">
      <div className="mx-auto max-w-7xl lg:px-8 ">
        <div className="mx-auto max-w-2xl lg:mx-0  ">
          <p className="mt-2 text-lg text-[#026767] leading-8 text-gray-600 ">
            Search all the candidates using OnTrack
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl grid-cols-3 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 lg:grid-cols-3 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {applicants.length &&
            applicants.map((applicant) => (
              <Link to="/applicant">
                <UserCard
                  applicant={applicant}
                  key={applicant.idAuth}
                ></UserCard>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
