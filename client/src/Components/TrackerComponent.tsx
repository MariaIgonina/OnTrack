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
  );
  const track = useSelector(
    (state: RootState) => state.track.track);

  useEffect(() => {
    // console.log("inside the track comp", currentUser.currentUser);
  }, [currentUser.currentUser]);

  //getTracksByRecruiter
  const tracksbyRecruiter = useSelector(
    (s: RootState) => s.track.track
  ) as unknown as Track[];

  useEffect(() => {
    const id = +currentUser.currentUser?.id!;
    dispatch(
      fetchTracksByRecruiter({ getTrackByWhat: "getTracksByRecruiter", id: id}) //This is 2 because it is the only recruiter with tracks ATM but it should be id in Line 18
    );
  }, []);

  return (
    <>
      <div className=" my-8 bg-stone-100">
        <h2 className="text-lg font-bold tracking-tight text-[#026767] sm:text-lg m-8">
          Monitor the progress of your applicants in one place
        </h2>
        <div className="overflow-x-scroll flex flex-nowrap">
          {tracksbyRecruiter.length ? (
            tracksbyRecruiter.map((x) => (
              <div
                className="flex-shrink-0 flex-col flex rounded-2xl shadow-md bg-white p-3 m-5 "
                style={{ minWidth: "300px", height: "300px", width: "400px" }}
                key={track.id}
              >
                <button
                  type="submit"
                  onClick={() =>
                    navigate(
                      `/track/?trackId=${track.id}&vacancyId=${track.vacancyId}`
                    )
                  }
                >
                  <h1>NAME's track for VACANCY {track.id}</h1>
                </button>
              </div>
            ))
          ) : (
            <div className="max-w-10xl pl-8 pb-6">
              <p className="mt-2 text-lg text-[#026767] leading-8 text-gray-600 ">
                There are no applicants for your vacancies yet...
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
