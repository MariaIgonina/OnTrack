import React, { useEffect, useInsertionEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
import CodeSandbox from "./Pages/CodeSandbox";
import SearchApplicantForm from "./Components/SearchApplicantForm/SearchApplicantForm";
import { currentUserSlice, setCurrentUser } from "./store/CurrentUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import Protected from "./Components/Protected";
import QuestionnaryForm from "./Components/QuestionnaryForm";


function App() {
  const [userIsLogedIn, setUserIsLogedIn] = useState<string | null>(
    localStorage.getItem('accessToken') || localStorage.getItem('gt')
  );
  const dispatch = useDispatch<AppDispatch>()
  const currentUser = useSelector((state: RootState) => state.currentUser)
  
  // if (localStorage.getItem('id')) dispatch(setCurrentUser({id: localStorage.getItem('id'), role: localStorage.getItem('currentUser')}))
  
  useEffect(() => {
    console.log('app re-check', localStorage.getItem('accessToken') || localStorage.getItem('gt'))
    setUserIsLogedIn(localStorage.getItem('accessToken')
      || localStorage.getItem('gt'))
  }, [localStorage, currentUser])


  useEffect(() => {
    const id = localStorage.getItem('id');
    if (id) {
      dispatch(setCurrentUser({ id, role: localStorage.getItem('currentUser') }));
    }
  }, [dispatch, currentUser.id]);



  // const handleBeforeUnload = (event: any) => {
  //   dispatch(setCurrentUser(currentUser))
  //   event.preventDefault();
  //   return event.returnValue = '';
  // }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <>
          <Route path="/" element={<LoginPage />} />

          <Route path="/user" element={
            <Protected isLoggedIn={userIsLogedIn?.length! > 0}>
              <ApplicantPage />
            </Protected>}
          />

          <Route path="/dashboard" element={
            <Protected isLoggedIn={userIsLogedIn?.length! > 0}>
              <DashboardPage />
            </Protected>
          } />
          <Route path="/track" element={
            <Protected isLoggedIn={userIsLogedIn?.length! > 0}>
              <TrackPage />
            </Protected>
          } />

          {/* <Route path="/adduser" element={<AddApplicantPage />} /> */}
          <Route path="/recruiterProfile" element={
            <Protected isLoggedIn={userIsLogedIn?.length! > 0}>
              <RecruiterProfilePage />
            </Protected>
          } />
          <Route path="/applicant/:id" element={
            <Protected isLoggedIn={userIsLogedIn?.length! > 0}>
              <ApplicantPage />
            </Protected>
          } />

          <Route path="/settings" element={
            <Protected isLoggedIn={userIsLogedIn?.length! > 0}>
              <SettingsPage />
            </Protected>
          } />

          <Route path="/addapplicant" element={
            <Protected isLoggedIn={userIsLogedIn?.length! > 0}>
              <AddApplicantPage />
            </Protected>
          } />

          <Route path="/vacancy/:vacancyId" element={
            <Protected isLoggedIn={userIsLogedIn?.length! > 0}>
              <VacancyDetails />
            </Protected>
          } />

          <Route path="/vacancyList" element={
            <Protected isLoggedIn={userIsLogedIn?.length! > 0}>
              <VacancyList />
            </Protected>
          } />

          <Route path="/logedWithGoogle" element={<LogedWithGoogle />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/recruiter/:id" element={
            <Protected isLoggedIn={userIsLogedIn?.length! > 0}>
              <RecruiterProfilePage />
            </Protected>

          } />

          <Route path="/codeSandbox" element={<CodeSandbox />} />
          <Route path="/searchApplicant" element={<QuestionnaryForm />} />
        </>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
