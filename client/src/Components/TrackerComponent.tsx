import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Track } from "../Interfaces";
import { fetchTracksByRecruiter } from "../store/trackSlice";
import TrackTrack from "./TrackTrack";
import { useNavigate } from "react-router-dom";
import TrackBanner from "./TrackBanner";

export default function TrackerComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.currentUser);

  const gettracks = useSelector(
    (s: RootState) => s.track.track
  ) as unknown as Track[];

  const sortTracksByRejected = (tracks: Track[]) => {
    const sortedtracks = tracks.filter((track) => !track.reject);
    const rejectedtracks = tracks.filter((track) => track.reject);
    const finalArray = sortedtracks.concat(rejectedtracks);
    const filteredFinalArray = finalArray.filter((track) => track.applicantID);
    return filteredFinalArray;
  };

  useEffect(() => {
    const id = +currentUser.id;
    if (currentUser.role === "recruiter") {
      dispatch(
        fetchTracksByRecruiter({
          getTrackByWhat: "getTracksByRecruiter",
          id: +id,
        })
      );
    } else {
      dispatch(
        fetchTracksByRecruiter({
          getTrackByWhat: "getTracksByApplicant",
          id: +id,
        })
      );
    }
  }, [dispatch]);
  ("");

  return (
    <>
      <div className="bg-stone-100 ">
        <h2 className="text-2xl font-bold tracking-tight text-[#026767] pt-8 pl-8 mb-2">
          Monitor progress in one place
        </h2>
        <div className="overflow-x-scroll flex flex-nowrap mt-4">
          {gettracks.length ? (
            sortTracksByRejected(gettracks).map((track) => (
              <>
                <div className="flex flex-col mb-4">
                  <div className="flex-shrink-0 flex-col flex rounded-t-2xl shadow-md bg-white p-3 mx-5 text-center">
                    <TrackBanner track={track}></TrackBanner>
                  </div>
                  <div
                    className="flex-shrink-0 flex-col flex rounded-b-2xl shadow-md bg-white p-3 mx-5 overflow-y-scroll flex-column flex-nowrap scroll-snap-y-mandatory"
                    style={{
                      minWidth: "300px",
                      height: "400px",
                      width: "200px",
                    }}
                    key={track.id}
                  >
                    <TrackTrack key={track.id} track={track}></TrackTrack>
                  </div>
                </div>
              </>
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
