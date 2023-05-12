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
    <div className="bg-stone-100 py-8 sm:py-32 rounded-lg w-full m-5 mt-8">
      <div className="mx-auto max-w-10xl lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-[#026767] sm:text-4xl mb-2">
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
