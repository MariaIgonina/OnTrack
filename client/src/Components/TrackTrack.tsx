import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { CurrentUserType } from "../Interfaces";
import { getVacancy, getRecruiter, getApplicant } from "../api.fetch";
import TrackBanner from "./TrackBanner";

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
    getApplicant(track.applicantID, null).then((res) => setApplicant(res));
  }, []);

  useEffect(() => {
    setStepArr(extractItemsByOrder(track));
  }, []);

  function extractItemsByOrder(track) {
    const orderedItems: any[] = [];
    if (track.hasOwnProperty("CodeSandbox")) {
      const codeSandBoxItems = track.CodeSandbox;
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
      {track.reject === false ? (
        <>
          {stepArr.map((step, index) => (
            <React.Fragment key={index}>
              <div className="bg-yellow-100 rounded-lg py-5 h-200">
                <p className="text-xl text-[#026767] font-semibold pb-2 tracking-widest">
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
            </React.Fragment>
          ))}
          <div className="bg-yellow-100 rounded-lg py-5 mb-8">
            <p>all steps completed</p>
          </div>
        </>
      ) : (
        <>
          <div className="bg-blue-100 rounded-lg py-5 mb-8">
            <p>Track closed for {vacancy.title}</p>
          </div>
        </>
      )}
    </>
  );
}
