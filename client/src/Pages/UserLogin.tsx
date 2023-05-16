import React, { useState } from "react";
import AddApplicantPage from "./AddApplicantPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import DashboardPage from "./DashboardPage";
import { fetchApplicant } from "../store/applicantSlice";
import { fetchRecruiter } from "../store/recruiterSlice";
import { useNavigate } from "react-router-dom";
import RecruiterForm from "../Components/RecruiterForm";
import Spinner from "../Components/Spinner";
import Loading from "../Components/Loading";
import userImg from "../assets/defaultAvatar.png";
// There's some thing strange with the type, we have to check, probably in the slice.

export default function RecruiterLogin() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [ispic, setIsPic] = useState(userImg);
  const [isName, setIsName] = useState("");

  const recruiter = useSelector(
    (state: RootState) => state.recruiter.recruiter
  );
  const applicant = useSelector(
    (state: RootState) => state.applicant.applicant
  );
  const currentUser = useSelector((s: RootState) => s.currentUser);

  useEffect(() => {
    currentUser.role === undefined && navigate("/");
  }, []);

  useEffect(() => {
    if (currentUser.role !== "applicant") {
      dispatch(fetchRecruiter(+currentUser.id!));
      setIsPic(recruiter.picture);
      setIsName(recruiter.recruiterName);
    } else if (currentUser.role === "applicant") {
      dispatch(fetchApplicant(+currentUser.id!));
      setIsPic(applicant.picture);
      setIsName(applicant.name);
    }
  }, [dispatch]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(delay);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading userImg={ispic} userName={isName} />
      ) : (
        <>
          {currentUser.role !== undefined ? (
            currentUser?.role === "applicant" ? (
              applicant?.familyName ? (
                <DashboardPage />
              ) : (
                <>
                  <div className="p-2 flex items-center justify-center mt-2">
                    <h1 className="text-3xl font-bold tracking-tight text-[#026767] text-big">
                      Create your account
                    </h1>
                  </div>
                  <AddApplicantPage />
                </>
              )
            ) : recruiter?.name ? (
              <DashboardPage />
            ) : (
              <>
                <div className="p-2 flex items-center justify-center mt-2">
                  <h1 className="text-3xl font-bold tracking-tight text-[#026767] text-big">
                    Create your recruiter account
                  </h1>
                </div>
                <RecruiterForm />
              </>
            )
          ) : (
            currentUser.role === undefined && (
              <div className="w-screen h-screen flex justify-center items-center text-lg text-green-800 bg-stone-100">
                Redirecting to login
              </div>
            )
          )}
        </>
      )}
    </>
  );
}
