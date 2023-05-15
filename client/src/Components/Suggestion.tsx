import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  fetchAllApplicants,
  fetchFilteredApplicants,
} from "../store/applicantSlice";
import UserCard from "./UserCard";
import { CurrentUserType, Vacancy } from "../Interfaces";
import { Applicant } from "../Interfaces";
import { fetchAllVacancies } from "../store/vacancySlice";
import VacancyCard from "./Vacancy/VacancyCard";
import FilteredVacancies from "./Vacancy/FilteredVacancies";

export default function Suggestion() {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(
    (state: RootState) => state.currentUser
  ) as unknown as CurrentUserType;

  //THIS WILL BE THE FILTERED RESULT FROM BackEnd!
  const applicants = useSelector(
    (s: RootState) => s.applicant.applicant
  ) as unknown as Applicant[];
  const vacancy = useSelector(
    (state: RootState) => state.vacancy.vacancies
  ) as unknown as Vacancy[];

  useEffect(() => {
    if (currentUser.role === "recruiter") {
      //dispatch(fetchFilteredApplicants("?location=Barcelona"));
      dispatch(fetchAllApplicants);
    } else {
      dispatch(fetchAllVacancies);
    }
  }, []);

  useEffect(() => {
    console.log("this should be an array of vacancies", vacancy);
  }, [dispatch]);

  return (
    <>
      <div className="bg-stone-100 py-24 sm:py-8 rounded-lg">
        <div className="mx-auto max-w-10xl lg:px-8">
          <div className="mx-auto max-w-lg lg:mx-0">
            <h2 className="text-2xl font-bold tracking-tight text-[#026767] mb-2">
              Your Personalized Suggestions
            </h2>
            <p className="mt-2 text-base text-[#026767] leading-8 text-gray-600 ">
              We think these applicants will catch your eye
            </p>
          </div>
          <div className="overflow-x-scroll flex flex-nowrap  my-8 ">
            {applicants.length &&
              applicants.map((applicant) => (
                <UserCard
                  applicant={applicant}
                  key={applicant.idAuth}
                ></UserCard>
              ))}

            <FilteredVacancies />
          </div>
        </div>
      </div>
    </>
  );
}
