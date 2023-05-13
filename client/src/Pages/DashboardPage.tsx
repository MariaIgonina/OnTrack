import React, { useCallback, useEffect } from "react";
import AllUsers from "../Components/AllUsers";
import Suggestion from "../Components/Suggestion";
import GoogleMaps from "../Components/googleMaps/GoogleMaps";
import TrackerComponent from "../Components/TrackerComponent";


const DashboardPage = () => {
  //NEED TO SORT OUT AUTHENTICATION OF USER FOR THE BELOW

  return (
    <>
      <TrackerComponent />
      <Suggestion></Suggestion>
      <GoogleMaps />
      <AllUsers />
    </>
  );
};

export default DashboardPage;
