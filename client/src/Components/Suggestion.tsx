import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { CurrentUserType } from "../Interfaces";
import FilteredVacancies from "./Vacancy/FilteredVacancies";
import FilteredApplicants from "./FilteredApplicants";

export default function Suggestion() {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser
  ) as unknown as CurrentUserType;

  return (
    <>
      {currentUser.role === "recruiter" ? (
        <div className="bg-stone-100 py-24 sm:py-8 rounded-lg justify-self-end w-screen">
          <div className="mx-auto max-w-lg lg:mx-0 ">
            <h2 className="text-2xl font-bold tracking-tight text-[#026767] mb-2 ml-8">
              Find the perfect match
            </h2>
            <p className="mt-2 text-base text-[#026767] leading-8 text-gray-600 ml-8">
              We think these applicants will catch your eye
            </p>
          </div>
          <FilteredApplicants />
        </div>
      ) : (
        <div className="bg-stone-100 py-24 sm:py-8 rounded-lg justify-self-end w-screen">
          <div className="mx-auto max-w-10xl lg:px-8">
            <div className="mx-auto max-w-lg lg:mx-0">
              <h2 className="text-2xl font-bold tracking-tight text-[#026767] mb-2">
                View all the vacancies posted on OnTrack
              </h2>
              <p className="mt-2 text-base text-[#026767] leading-8 text-gray-600 ">
                We think these will catch your eye
              </p>
            </div>
            <FilteredVacancies />
          </div>
        </div>
      )}
    </>
  );
}
