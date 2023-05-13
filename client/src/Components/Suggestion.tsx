import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  fetchAllApplicants,
  fetchFilteredApplicants,
} from "../store/applicantSlice";
import UserCard from "./UserCard";
import { Applicant } from "../Interfaces";
import { useNavigate } from "react-router-dom";

export default function Suggestion() {
  const navigate = useNavigate();
  //THIS WILL BE THE FILTERED RESULT FROM BackEnd!
  const applicants = useSelector(
    (s: RootState) => s.applicant.applicant
  ) as unknown as Applicant[];

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchFilteredApplicants("?location=Barcelona"));
    // dispatch(fetchAllApplicants);
  }, []);

  return (
    <>
      <div className="bg-stone-100 py-24 sm:py-8 rounded-lg">
        <div className="mx-auto max-w-10xl lg:px-8">
          <div className="mx-auto max-w-lg lg:mx-0">
            <h2 className="text-lg font-bold tracking-tight text-[#026767] sm:text-lg mb-2">
              Your Personalized Suggestions
            </h2>
            <p className="mt-2 text-sm text-[#026767] leading-8 text-gray-600 ">
              We think these applicants will catch your eye
            </p>
          </div>
          <div className="overflow-x-scroll flex flex-nowrap  my-8 ">
            {applicants.length &&
              applicants.map((applicant) => (
                <button
                  type="submit"
                  onClick={() => navigate(`/applicant/${applicant.idDB}`)}
                  key={applicant.idAuth}
                >
                  <UserCard
                    applicant={applicant}
                    key={applicant.idAuth}
                  ></UserCard>
                </button>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
