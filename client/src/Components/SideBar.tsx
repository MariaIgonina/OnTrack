import { width } from "@mui/system";
import React, { useEffect } from "react";
import stock1 from "../assets/stock-1.jpeg";
import { fetchApplicant } from "../store/applicantSlice";
import { useSelector, useDispatch } from "react-redux";
import { CurrentUserType } from "../Interfaces";
import { RootState } from "../store/store";
import { fetchRecruiter } from "../store/recruiterSlice";
import MyCalendar from "./Calendar";

export default function SideBar() {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.currentUser
  ) as unknown as CurrentUserType;
  const recruiter = useSelector((state: RootState) => state.recruiter);
  const applicant = useSelector((state: RootState) => state.applicant);

  useEffect(() => {
    console.log("this is the state variable for current user", currentUser);
    if (currentUser.role === "recruiter") {
      dispatch(fetchRecruiter(+currentUser.id));
    } else {
      dispatch(fetchApplicant(+currentUser.id));
    }
  }, [currentUser]);

  return (
    <>
      <div
        className="relative overflow-y-hidden bg-green-100 
          flex flex-col items-center shadow-md shadow-gray w-80 h-full"
      >
       
        {currentUser.role === "recruiter" ? (
          <div className="flex rounded-2xl bg-[#D7E7E8] p-3 mt-10 w-60 items-center justify-center">
            <text className="text-2xl  tracking-tight text-[#475569] m-2 text-center justify-center">
              You have
              <span className="text-3xl font-bold tracking-tight text-[#DF6831] m-2 items-center justify-center">
              {
          recruiter.recruiter.Track?.filter(
            (track) => track.applicantID !== null
          ).length
        }
              </span>{" "}
              tracks open for <br></br>
              <span className="text-3xl font-bold tracking-tight text-[#DF6831] m-2 items-center justify-center">
                {recruiter.recruiter.vacancies?.length}
              </span>
              vacancies
            </text>
          </div>
        ) : (
          <div className="flex rounded-2xl bg-[#D7E7E8] p-3 mt-10 w-60 items-center justify-center">
            <text className="text-2xl text-center font-bold tracking-tight text-[#026767] mb-2 items-center justify-center">
              You have 
              <span className="text-3xl font-bold tracking-tight text-[#DF6831] m-2 items-center justify-center">
              {applicant.applicant.track?.length} 
              </span>
              tracks open
            </text>
          </div>
        )}

        <MyCalendar></MyCalendar>
      </div>
    </>
  );
}
