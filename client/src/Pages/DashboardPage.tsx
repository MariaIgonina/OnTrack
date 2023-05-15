import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SideBar from "../Components/SideBar";
import AllUsers from "../Components/AllUsers";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { CurrentUserType } from "../Interfaces";
import Suggestion from "../Components/Suggestion";
import GoogleMaps from "../Components/googleMaps/GoogleMaps";
import TrackerComponent from "../Components/TrackerComponent";

const DashboardPage = () => {
  const searchRef = useRef(null);

  const currentUser = useSelector(
    (s: RootState) => s.currentUser
  ) as unknown as CurrentUserType;

  useEffect(() => {
    console.log("this is from state in dashboard", currentUser);
  }, [currentUser]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          overflow: "hidden",
        }}
      >
        <div>
          <SideBar></SideBar>
        </div>
        <div
          style={{
            overflow: "hidden",
          }}
        >
          <TrackerComponent />
          <Suggestion></Suggestion>
          <GoogleMaps />
          <AllUsers searchRef={searchRef} />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
