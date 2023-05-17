import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchAllApplicants } from "../store/applicantSlice";
import { Applicant } from "../Interfaces";
import UserCard from "./UserCard";
import { CurrentUserType, Vacancy } from "../Interfaces";
import { fetchAllVacancies } from "../store/vacancySlice";
import VacancyCard from "./Vacancy/VacancyCard";

export default function AllUsers({ searchRef }) {
  const applicants = useSelector(
    (s: RootState) => s.applicant.applicant
  ) as unknown as Applicant[];
  const vacancy = useSelector(
    (state: RootState) => state.vacancy.vacancies
  ) as unknown as Vacancy[];
  const currentUser = useSelector(
    (state: RootState) => state.currentUser
  ) as unknown as CurrentUserType;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (currentUser.role === "recruiter") {
      dispatch(fetchAllApplicants());
    } else {
      dispatch(fetchAllVacancies);
    }
  }, []);

  return (
    <div
      ref={searchRef}
      className="bg-stone-100 py-24 sm:py-8 rounded-lg w-screen"
    >
      <div className="mx-auto max-w-10xl lg:px-8">
        <div className="mx-auto max-w-lg lg:mx-0">
          <h2 className="text-2xl font-bold tracking-tight text-[#026767] mb-2">
            Search everyone using OnTrack
          </h2>
        </div>
        <div className="overflow-x-scroll list-none flex my-8">
          {currentUser.role === "applicant" ? (
            vacancy.length ? (
              vacancy.map((vacancy) => (
                <VacancyCard vacancy={vacancy} key={vacancy.id} />
              ))
            ) : (
              <li className="list-none">
                <p className="p-4 text-gray-500">No vacancies found.</p>
              </li>
            )
          ) : (
            applicants.length &&
            applicants.map((applicant) => (
              <UserCard applicant={applicant} key={applicant.idAuth}></UserCard>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
