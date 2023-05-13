import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchAllApplicants } from "../store/applicantSlice";
import { Applicant } from "../Interfaces";
import UserCard from "./UserCard";
import { Link, useNavigate } from "react-router-dom";

export default function AllUsers() {
  const navigate = useNavigate();
  const applicants = useSelector(
    (s: RootState) => s.applicant.applicant
  ) as unknown as Applicant[]; //THIS IS BAD TYPESCRIPT REFACTOR THIS ROSIE
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllApplicants());
  }, []);

  return (
    <div className="bg-stone-100 py-24 sm:py-8 rounded-lg">
      <div className="mx-auto max-w-10xl lg:px-8">
        <div className="mx-auto max-w-lg lg:mx-0">
          <h2 className="text-lg font-bold tracking-tight text-[#026767] sm:text-lg mb-2">
            Search all the candidates using OnTrack
          </h2>
        </div>
        <div className="overflow-x-scroll flex   my-8 ">
          {applicants.length &&
            applicants.map((applicant) => (
              // <Link to="/applicant/">
              <button
                type="submit"
                onClick={() => navigate(`/applicant/${applicant.idDB}`)}
                key={applicant.idDB}
              >
                <UserCard
                  applicant={applicant}
                  key={applicant.idAuth}
                ></UserCard>
              </button>
              // </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
