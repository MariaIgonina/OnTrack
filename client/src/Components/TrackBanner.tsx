import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { CurrentUserType } from "../Interfaces";
import { getVacancy, getRecruiter, getApplicant } from "../api.fetch";
import Spinner from "./Spinner";

export default function TrackBanner({ track }) {
  const [vacancy, setVacancy] = useState({});
  const [recruiter, setRecruiter] = useState({});
  const [applicant, setApplicant] = useState({});

  const currentUser = useSelector(
    (s: RootState) => s.currentUser
  ) as unknown as CurrentUserType;

  useEffect(() => {
    getVacancy(track.vacancyId, null).then((res) => setVacancy(res.data));
    getRecruiter(track.recruiterID, null).then((res) => {
      setRecruiter(res);
    });
    getApplicant(track.applicantID, null).then((res) => setApplicant(res));
  }, []);

  return (
    <>
      {currentUser.role === "applicant" ? (
        vacancy === undefined || recruiter === undefined ? (
          <Spinner />
        ) : (
          <div>
            <p className="text-[#026767] ">{vacancy.title}</p>
            <p className="text-[#026767] mb-2"> at {recruiter.name}</p>
          </div>
        )
      ) : vacancy === undefined || recruiter === undefined ? (
        <Spinner />
      ) : (
        <div>
          <p className="text-[#026767] ">{applicant.name}</p>
          <p className="text-[#026767] mb-2"> for {vacancy.title}</p>
        </div>
      )}
    </>
  );
}
