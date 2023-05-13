import { width } from "@mui/system";
import React, { useEffect } from "react";
import stock1 from "../assets/stock-1.jpeg";
import { fetchApplicant } from "../store/applicantSlice";
import { useSelector, useDispatch } from "react-redux";
import { CurrentUserType } from "../Interfaces";
import { RootState } from "../store/store";
import { fetchRecruiter } from "../store/recruiterSlice";

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
        <img
          src={stock1}
          alt="stockphoto"
          style={{ width: "max", height: 250, marginTop: "5px" }}
        />

        <div
          // className="flex rounded-full bg-blue-100 "
          style={{
            display: "flex",
            width: "300px",
            height: "300px",
            backgroundColor: "#68C3D4",
            borderRadius: "50%",
            marginTop: "25px",
          }}
        >
          {currentUser.role === "recruiter" ? (
            <text
              style={{ margin: "auto", alignItems: "center" }}
              className="text-center"
            >
              You have {recruiter.recruiter.Track?.length} tracks open for{" "}
              <br></br>
              {recruiter.recruiter.vacancies?.length} vacancies
            </text>
          ) : (
            <text style={{ margin: "auto" }}>
              You have {applicant.applicant.track?.length} tracks open
            </text>
          )}
        </div>
      </div>
    </>
  );
}
