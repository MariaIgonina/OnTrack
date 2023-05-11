import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import logo from "./assets/logo.png";
import "./App.css";
import Navbar from "./Pages/NavBar";
import LoginPage from "./Pages/LoginPage";
import ApplicantPage from "./Pages/ApplicantPage";
import CompanyPage from "./Pages/CompanyPage";
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
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      {localStorage.getItem("login") === "recruiter" ? (
        <>
          <div className="container">
            <Navbar></Navbar>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/user" element={<ApplicantPage />} />
              <Route path="/company" element={<CompanyPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/track" element={<TrackPage />} />
              {/* <Route path="/adduser" element={<AddApplicantPage />} /> */}
              <Route
                path="/recruiterProfile"
                element={<RecruiterProfilePage />}
              />
              <Route path="/applicant/:id" element={<ApplicantPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              {/* <Route path="/addapplicant" element={<AddApplicantPage />} /> */}
              <Route path="/create-vacancy" element={<VacancyCreate />} />
              <Route path="/vacancy/:vacancyId" element={<VacancyDetails />} />
              <Route path="/vacancyList" element={<VacancyList />} />
              <Route path="/logedWithGoogle" element={<LogedWithGoogle />} />
              <Route path="/signInWithGoogle" element={<SignInWithGoogle />} />
              <Route path="/recruiter/:id" element={<CompanyPage />} />
            </Routes>
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <Navbar />

            <Routes>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/user" element={<ApplicantPage />} />
                <Route path="/company" element={<CompanyPage />} />
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
                <Route
                  path="/vacancy/:vacancyId"
                  element={<VacancyDetails />}
                />
                <Route path="/vacancyList" element={<VacancyList />} />
                <Route path="/logedWithGoogle" element={<LogedWithGoogle />} />
                <Route
                  path="/signInWithGoogle"
                  element={<SignInWithGoogle />}
                />
                <Route path="/recruiter/:id" element={<CompanyPage />} />
              </Routes>
            </Routes>
          </div>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
