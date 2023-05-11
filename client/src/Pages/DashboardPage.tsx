import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AllUsers from "../Components/AllUsers";
import Suggestion from "../Components/Suggestion";

const DashboardPage = () => {
  //NEED TO SORT OUT AUTHENTICATION OF USER FOR THE BELOW

  return (
    <>
      <Suggestion></Suggestion>
      <AllUsers />
    </>
  );
};

export default DashboardPage;
