import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { CurrentUserType, Track } from "../Interfaces";
import { fetchTracksByRecruiter } from "../store/trackSlice";

import { useNavigate } from "react-router-dom";
import { minHeight } from "@mui/system";

export default function TrackerComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(
    (state: RootState) => state.currentUser
  ) as unknown as CurrentUserType;

  useEffect(() => {
    console.log("inside the track comp", currentUser);
  }, [currentUser]);

  const gettracks = useSelector(
    (s: RootState) => s.track.track
  ) as unknown as Track[];

  useEffect(() => {
    const id = +currentUser.id;
    if (currentUser.role === "recruiter") {
      dispatch(
        fetchTracksByRecruiter({ getTrackByWhat: "getTracksByRecruiter", id })
      );
    } else {
      dispatch(
        fetchTracksByRecruiter({
          getTrackByWhat: "getTracksByApplicant",
          id,
        })
      );
    }
    console.log("tracks ==> ", gettracks);
    // gettracks.forEach((x) =>
    //   console.log(`for track with ID ${x.id} there are ${countSteps(x)} steps`)
    // );
  }, []);

  function countSteps(track: Track) {
    const { CodeSandbox, Questionaries, Videocall } = track;
    return CodeSandbox.length + Questionaries.length + Videocall.length;
  }

  return (
    <>
      <div className=" my-8 bg-stone-100">
        <h2 className="text-2xl font-bold tracking-tight text-[#026767] m-8 mb-2">
          Monitor the progress of your applicants in one place
        </h2>
        <div className="overflow-x-scroll flex flex-nowrap">
          {gettracks.length ? (
            gettracks.map((x) => (
              <div
                className="flex-shrink-0 flex-col flex rounded-2xl shadow-md bg-white p-3 m-5 "
                style={{ minWidth: "300px", height: "300px", width: "400px" }}
                key={x.id}
              >
                <button
                  type="submit"
                  onClick={() =>
                    navigate(
                      `/track/?vacancyId=${x.vacancyId}&trackId=${x.id}&userRole=${currentUser.role}`
                    )
                  }
                >
                  <p>There are {countSteps(x)} Steps</p>
                </button>
              </div>
            ))
          ) : (
            <div className="max-w-10xl pl-8 pb-6">
              <p className="mt-2 text-lg text-[#026767] leading-8 text-gray-600 ">
                You have no active tracks...
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
