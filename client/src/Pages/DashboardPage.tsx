import React, { useRef } from "react";
import SideBar from "../Components/SideBar";
import AllUsers from "../Components/AllUsers";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { CurrentUserType } from "../Interfaces";
import Suggestion from "../Components/Suggestion";
import GoogleMaps from "../Components/googleMaps/GoogleMaps";
import TrackerComponent from "../Components/TrackerComponent";
import FilteredVacancies from "../Components/Vacancy/FilteredVacancies";
import MyCalendar from "../Components/Calendar"


const DashboardPage = () => {
  const searchRef = useRef(null);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <div>
          <SideBar></SideBar>
        </div>
        <div
          style={{
            overflow: "hidden",
            flex: 1,
            flexDirection: "row",
          }}
        >
          <TrackerComponent />
          <Suggestion></Suggestion>
        </div>
      </div>
      <div
        style={{
          overflow: "hidden",
          flex: 1,
          flexDirection: "row",
        }}
      >
        <GoogleMaps />
        <AllUsers searchRef={searchRef} />
    
      </div>
    </>
  );
};

export default DashboardPage;
