import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { extractItemsByOrder } from "../library";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Questionary, Sandbox, Track, Videocall } from "../Interfaces";
import { fetchTrack, fetchTracksByRecruiter } from "../store/trackSlice";
import { fetchQuestionaryTrack } from "../store/QuestionarySlice";
import { fetchSandboxesByTrack } from "../store/SandboxSlice";
import { fetchVideocallsByTrack } from "../store/VideoCallSlice";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import "react-datepicker/dist/react-datepicker.css";
import { allowedNodeEnvironmentFlags } from "process";
import { fetchApplicant } from "../store/applicantSlice";
import { fetchRecruiter } from "../store/recruiterSlice";

import moment from "moment";
import { format } from "date-fns";

export default function MyCalendar() {
  const datesArray = ["2023/05/13", "2023-05-16", "2023-05-19"];
  const [eventsToRender, setEventsToRender] = useState<any[]>([]);
  const currentDate = new Date();
  const work = () => {
    console.log("change");
  };

  const [datesForCalendar, setDatesForCalendar] = useState([]);

  const currentUser = useSelector((state: RootState) => state.currentUser);

  const getTracks = useSelector(
    (s: RootState) => s.track.track
  ) as unknown as Track[];

  const getVideocalls = useSelector(
    (s: RootState) => s.videocall.videocall
  ) as unknown as Videocall[];

  const getSandbox = useSelector(
    (s: RootState) => s.sandbox.sandbox
  ) as unknown as Sandbox[];

  const getQuestionary = useSelector(
    (s: RootState) => s.questionary.questionary
  ) as unknown as Questionary[];

  const dispatch = useDispatch<AppDispatch>();

  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const id = +currentUser.id!;
    console.log("please don't be undefined", id);
    if (currentUser.role === "recruiter") {
      dispatch(
        fetchTracksByRecruiter({
          getTrackByWhat: "getTracksByRecruiter",
          id: +id,
        })
      ).then((res) => console.log("whatis this", res));
    } else {
      dispatch(
        fetchTracksByRecruiter({
          getTrackByWhat: "getTracksByApplicant",
          id: +id,
        })
      ).then((res) => console.log("whatis this", res));
    }
  }, []);

  useEffect(() => {
    console.log("length of tracks ==> ", getTracks.length);
    if (!getTracks.length) return;
    console.log("GET TRACKS ==> ", getTracks);
    fetchAllEvents(getTracks);
    // then(() => normalData()).
    // then(() => getDatesOnly())
  }, [getTracks]);

  let allEvents: any[] = [];

  async function fetchAllEvents(tracks: Track[]) {
    const questionaryPromises = tracks.map((track) => {
      return dispatch(fetchQuestionaryTrack(track.id));
    });
    const videoCallPromises = tracks.map((track) => {
      return dispatch(fetchVideocallsByTrack(track.id));
    });
    const sandBoxPromises = tracks.map((track) => {
      return dispatch(fetchSandboxesByTrack(track.id));
    });
    await Promise.all(questionaryPromises).then((res) => {
      res = res.map((el) => el.payload[0]);
      allEvents = [...allEvents, ...res];
    });
    await Promise.all(videoCallPromises).then((res) => {
      res = res.map((el) => el.payload);
      allEvents = [...allEvents, ...res];
    });
    await Promise.all(sandBoxPromises).then((res) => {
      res = res.map((el) => el.payload[0]);
      allEvents = [...allEvents, ...res];
    });

    allEvents = await Promise.all(
      allEvents.filter(Boolean).map(async (event) => {
        const eventTrack = getTracks.find(
          (track) => track.id === event.trackId
        );
        const applicant = await dispatch(
          fetchApplicant(eventTrack?.applicantID!)
        );
        const recruiter = await dispatch(
          fetchRecruiter(eventTrack?.recruiterID!)
        );
        return {
          ...event,
          track: eventTrack,
          applicant: applicant.payload,
          recruiter: recruiter.payload,
        };
      })
    );
    console.log("allEvents:", allEvents);
    const sortedEvents = allEvents.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    setEventsToRender(sortedEvents);

    const datesOnly = allEvents.map((event) => {
      return new Date(event.date);
    });

    setDatesForCalendar(datesOnly);
  }

  // useEffect(() => {
  //   console.log("MARIA DATES ONLY ==> ", datesForCalendar)
  // },[])

  return (
    <div className="pt-10">
      <DatePicker
        dateFormat="MM/dd/yyyy"
        includeDates={datesForCalendar}
        onChange={work}
        inline
      />

      <ul>
        {eventsToRender.map((event) => {
          if (
            event.type !== "" ||
            event.type !== null ||
            event.type !== undefined
          ) {
            return (
              <li>
                <div className="flex flex-row rounded-2xl bg-[#D7E7E8] mt-4 w-64 items-center justify-center">
                  <div>
                    <p className="text-xl font-bold tracking-tight text-center text-[#026767] items-center justify-center">
                      {moment(event.date).format("MMM Do")}
                    </p>
                  </div>
                  <div className="flex flex-col rounded-2xl bg-white w-60 justify-center p-1 pl-4">
                    <p className="text-base mt-1 text-[#DF6831] text-base font-bold">
                      {moment(event.date).format("LT")}
                    </p>
                    {currentUser.role === "recruiter" ? (
                      <p className="text-base font-bold text-[#475569] text-base ">
                        {event.applicant.name} {event.applicant.familyName}
                      </p>
                    ) : (
                      <p className="text-base font-bold text-[#475569] text-base ">
                        {event.recruiter.recruiterName}
                      </p>
                    )}
                    <p className="text-sm text-[#475569] mb-1 text-base ">
                      {event.type}
                    </p>
                  </div>
                </div>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
}
