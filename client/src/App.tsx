import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import logo from "./assets/logo.png";
import "./App.css";

import Navbar from "./Pages/Navbar";
import LoginPage from "./Pages/LoginPage";
import ApplicantPage from "./Pages/ApplicantPage";
import RecruiterForm from "./Components/RecruiterForm";
import DashboardPage from "./Pages/DashboardPage";
import TrackPage from "./Pages/TrackPage";
import AddApplicantPage from "./Pages/AddApplicantPage";
import SettingsPage from "./Pages/SettingsPage";
import VacancyCreate from "./Components/VacancyCreate";
import VacancyDetails from "./Components/VacancyDetails";
import VacancyList from "./Components/VacancyList";
import LogedWithGoogle from "./Components/LogedWithGoogle";
import SignInWithGoogle from "./Components/SignInWithGoogle";
import RecruiterProfilePage from "./Pages/RecruiterProfilePage";
import RecruiterPage from "./Pages/RecruiterPage";
import "./index.css";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

function App() {
  const currentUser = useSelector((state: RootState) => state.currentUser);

  useEffect(() => {
    console.log("i am a", currentUser.role);
  }, [currentUser]);

  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Routes>
          <>
            {/* <Route
              path="/"
              element={
                !currentUser.role ? (
                  <LoginPage />
                ) : currentUser.role === "applicant" ? (
                  //put applicant roles here

                  <Route path="/dashboard" element={<DashboardPage />} />
                ) : currentUser.role === "recruiter" ? (
                  //put recruiter roots here
                  <Route path="/dashboard" element={<DashboardPage />} />
                ) : (
                  <LoginPage />
                )
              }
            /> */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/user" element={<ApplicantPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/track" element={<TrackPage />} />
            {/* <Route path="/adduser" element={<AddApplicantPage />} /> */}
            <Route
              path="/recruiterProfile"
              element={<RecruiterProfilePage />}
            />
            <Route path="/applicant/:id" element={<ApplicantPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/addapplicant" element={<AddApplicantPage />} />
            <Route path="/create-vacancy" element={<VacancyCreate />} />
            <Route path="/vacancy/:vacancyId" element={<VacancyDetails />} />
            <Route path="/vacancyList" element={<VacancyList />} />
            <Route path="/logedWithGoogle" element={<LogedWithGoogle />} />
            <Route path="/signInWithGoogle" element={<SignInWithGoogle />} />
            <Route path="/recruiter/:id" element={<RecruiterProfilePage />} />
            {/* /recruiter/?id=${id}` */}
          </>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
