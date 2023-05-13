import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Track } from "../Interfaces";
import { fetchTracksByRecruiter } from "../store/trackSlice";
import { useNavigate } from "react-router-dom";
import { minHeight } from "@mui/system";

export default function TrackerComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.currentUser);

  useEffect(() => {
    console.log("inside the track comp", currentUser);
  }, [currentUser]);

  //getTracksByRecruiter
  const tracksbyRecruiter = useSelector(
    (s: RootState) => s.track.track
  ) as unknown as Track[];

  useEffect(() => {
    const id = +currentUser.id;
    dispatch(
      fetchTracksByRecruiter({ getTrackByWhat: "getTracksByRecruiter", id: 2 }) //This is 2 because it is the only recruiter with tracks ATM but it should be id in Line 18
    );
  }, []);

  return (
    <>
      <div className=" my-8 bg-stone-100">
        <h2 className="text-3xl font-bold tracking-tight text-[#026767] sm:text-4xl m-8">
          Monitor the progress of your applicants in one place
        </h2>
        <div className="overflow-x-scroll flex flex-nowrap">
          {tracksbyRecruiter.length &&
            tracksbyRecruiter.map((x) => (
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
                  <h1>NAME's track for VACANCY {x.id}</h1>
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
