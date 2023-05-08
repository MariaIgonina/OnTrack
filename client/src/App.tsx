import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from "./assets/logo.png"
import "./App.css"
import Navbar from "./Pages/Navbar";
import LoginPage from "./Pages/LoginPage";
import UserPage from "./Pages/UserPage";
import CompanyPage from "./Pages/CompanyPage";
import DashboardPage from "./Pages/DashboardPage";
import TrackPage from "./Pages/TrackPage";
import AddUserPage from "./Pages/AddUserPage";
import SettingsPage from "./Pages/SettingsPage";


import './App.css'

function App() {

  return (
    <BrowserRouter>
      <div className='all-app'>
        <img src={logo} alt="logo" id="logo" />
        <Navbar />
        <div className="main-container">
          <Routes>
            <Route path= '/' element={<LoginPage />} />
            <Route path= '/user' element={<UserPage />} />
            <Route path= '/company' element={<CompanyPage />} />
            <Route path= '/dashboard' element={<DashboardPage />} />
            <Route path= '/track' element={<TrackPage />} />
            <Route path= '/adduser' element={<AddUserPage />} />
            <Route path= '/settings' element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;