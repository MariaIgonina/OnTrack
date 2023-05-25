import React from "react";
import AddApplicantPage from "./AddApplicantPage";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import RecruiterForm from "../Components/RecruiterForm";
import { fetchApplicant, setApplicant } from "../store/applicantSlice";
import stock4 from "../assets/stock-4.jpeg";
import stock5 from "../assets/stock-5.jpeg";
import { useNavigate } from "react-router-dom";
import { fetchRecruiter } from "../store/recruiterSlice";

export default function SettingsPage() {
  const recruiter = useSelector((state: RootState) => state.recruiter);
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((s: RootState) => s.currentUser);

  useEffect(() => {
    if (currentUser.role !== "applicant") {
      dispatch(fetchRecruiter(+currentUser.id));
    } else {
      dispatch(fetchApplicant(+currentUser.id));
    }
  }, [dispatch]);

  if (currentUser.role === "applicant") {
    return (
      <div className="bg-stone-100 py-8">
        <div className="flex flex-col bg-white m-8 rounded-lg ">
          <div className="flex flex-row bg-white m-8 rounded-lg items-center justify-center">
            <img
              src={stock5}
              alt="stockphoto"
              style={{ width: "30%", height: "30%" }}
              className="my-2 "
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#026767] text-big text-center mt-4">
            Update your account details
          </h1>
          <AddApplicantPage />
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-stone-100 py-8">
        <div className="flex flex-row bg-white m-8 rounded-lg items-center justify-center">
          <img
            src={stock4}
            alt="stockphoto"
            style={{ width: "90%", height: 550 }}
            className="my-8 flex-1"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight text-[#026767] text-big text-center mt-4">
              Update your account details
            </h1>
            <RecruiterForm />
          </div>
        </div>
      </div>
    );
  }
}
