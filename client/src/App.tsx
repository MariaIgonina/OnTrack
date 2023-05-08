import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from "./assets/logo.png";
import "./App.css";
import Navbar from "./Pages/Navbar";
import LoginPage from "./Pages/LoginPage";
import ApplicantPage from "./Pages/ApplicantPage";
import CompanyPage from "./Pages/CompanyPage";
import DashboardPage from "./Pages/DashboardPage";
import TrackPage from "./Pages/TrackPage";
import AddApplicantPage from "./Pages/AddApplicantPage";
import SettingsPage from "./Pages/SettingsPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <img src={logo} alt="logo" id="logo" />
      <Navbar />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/user" element={<ApplicantPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/track" element={<TrackPage />} />
        <Route path="/adduser" element={<AddUserPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
