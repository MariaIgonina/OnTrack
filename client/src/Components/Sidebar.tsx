import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import App from "../App";

export default function SideBar() {
  return (
    <>
      {/* <AppBar
        position="relative"
        sx={{
          backgroundColor: "#568ea3",
          marginTop: "10px",
          width: "15%",
          height: "80%",
        }}
      >
        <div className="h-96 w-96 mt-8"></div>
        <div className="bg-blue-500 h-screen w-200">
          <h1>Hello</h1>
        </div>
      </AppBar> */}

      <div className="fixed right-0 w-200 top-0 h-screen w-1/4 bg-blue-500 z-20">
        <h1>Hello</h1>
      </div>
    </>
  );
}
