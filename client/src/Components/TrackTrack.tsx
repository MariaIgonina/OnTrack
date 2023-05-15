import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { CurrentUserType, Recruiter, Track, Vacancy } from "../Interfaces";

import { getVacancy, getRecruiter, getApplicant } from "../api.fetch";
import Spinner from "./Spinner";

export default function TrackTrack({ track }) {
  const [stepArr, setStepArr] = useState([]);
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
    getApplicant(track.applicantID, null).then((res) => setApplicant(res.data));
  }, []);

  useEffect(() => {
    console.log("HELLO", track);
    setStepArr(extractItemsByOrder(track));
  }, []);

  function extractItemsByOrder(track) {
    const orderedItems: any[] = [];
    if (track.hasOwnProperty("CodeSandBox")) {
      const codeSandBoxItems = track.CodeSandBox;
      codeSandBoxItems.forEach((item) => {
        orderedItems.push(item);
      });
    }
    if (track.hasOwnProperty("Videocall")) {
      const videoCallItems = track.Videocall;
      videoCallItems.forEach((item) => {
        orderedItems.push(item);
      });
    }
    if (track.hasOwnProperty("Questionaries")) {
      const questionariesItems = track.Questionaries;
      questionariesItems.forEach((item) => {
        orderedItems.push(item);
      });
    }
    return orderedItems
      .sort((a, b) => a.order - b.order)
      .filter((item) => item.hidden !== true);
  }

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

      {stepArr.map((step, index) => (
        <>
          <div className="bg-yellow-100 rounded-lg py-5 scroll-snap-align-end h-200">
            <p className="text-xl text-[#026767] font-semibold pb-2">
              Step {index + 1}
            </p>
            <p> {step.type}</p>
          </div>
          <div
            style={{
              width: "5px",
              backgroundColor: "#026767",
              height: "100px",
              display: "flex",
              justifyContent: "center",
              alignSelf: "center",
              marginLeft: "130px",
            }}
          ></div>
        </>
      ))}
      <div className="bg-yellow-100 rounded-lg py-5 mb-8">
        <p>all steps completed</p>
      </div>
    </>
  );
}
