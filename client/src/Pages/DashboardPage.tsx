import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AllUsers from "../Components/AllUsers";

import Suggestion from "../Components/Suggestion";
import GoogleMaps from "../Components/googleMaps/GoogleMaps";
import TrackerComponent from "../Components/TrackerComponent";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const DashboardPage = () => {
  //NEED TO SORT OUT AUTHENTICATION OF USER FOR THE BELOW
  const navigate = useNavigate();
  const trackURL = new URL('/track')
  const currentUser = useSelector((state: RootState) => state.currentUser.currentUser)

  trackURL.searchParams.append('trackId', currentUser.id!)

  return (
    <>
      <button onClick={() => navigate(trackURL.toString())}>test button for paola</button>
      <TrackerComponent />
      <Suggestion></Suggestion>
      <GoogleMaps />
      <AllUsers />
    </>
  );
};

export default DashboardPage;
