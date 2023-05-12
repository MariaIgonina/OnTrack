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
      <div className="h-96 my-8 bg-stone-100">
        <h1 className="my-8">This is the components for the Trackers </h1>
        <div className="overflow-x-scroll flex flex-nowrap">
          {tracksbyRecruiter.length &&
            tracksbyRecruiter.map((x) => (
              // <TrackDashboard track={x} ></TrackDashboard>
              <div
                style={{
                  minWidth: "300px",
                  minHeight: "300px",
                  backgroundColor: "white",
                }}
                className=" m-2 rounded-2xl "
              >
                <button
                  type="submit"
                  onClick={() =>
                    navigate(
                      `/track/?vacancyId=${x.vacancyId}&trackId=${x.id}&userRole=${currentUser.role}`
                    )
                  }
                >
                  <h1>This is a track {x.id}</h1>
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
