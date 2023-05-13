import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Navbar from "./Pages/Navbar";
import LoginPage from "./Pages/LoginPage";
import ApplicantPage from "./Pages/ApplicantPage";
import DashboardPage from "./Pages/DashboardPage";
import TrackPage from "./Pages/TrackPage";
import AddApplicantPage from "./Pages/AddApplicantPage";
import SettingsPage from "./Pages/SettingsPage";
import VacancyDetails from "./Components/Vacancy/VacancyDetails";
import VacancyList from "./Components/Vacancy/VacancyList";
import LogedWithGoogle from "./Components/LogedWithGoogle";
import SignInWithGoogle from "./Components/SignInWithGoogle";
import RecruiterProfilePage from "./Pages/RecruiterProfilePage";
import UserLogin from "./Pages/UserLogin";
import "./index.css";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/user" element={<ApplicantPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/track" element={<TrackPage />} />
        {/* <Route path="/adduser" element={<AddApplicantPage />} /> */}
        <Route path="/recruiterProfile" element={<RecruiterProfilePage />} />
        <Route path="/applicant/:id" element={<ApplicantPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/addapplicant" element={<AddApplicantPage />} />
        <Route path="/create-vacancy" element={<VacancyCreate />} />
        <Route path="/vacancy/:vacancyId" element={<VacancyDetails />} />
        <Route path="/vacancyList" element={<VacancyList />} />
        <Route path="/logedWithGoogle" element={<LogedWithGoogle />} />
        <Route path="/signInWithGoogle" element={<SignInWithGoogle />} />
        <Route path="/recruiter/:id" element={<RecruiterProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
