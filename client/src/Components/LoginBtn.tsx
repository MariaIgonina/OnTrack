import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";

export default function LoginBtn() {
  //find the corrosponding user from the database

  // if good then set Logged in user state as the creds

  return (
    <Button
      onClick={() => console.log("hello")}
      sx={{ backgroundColor: "#568EA3", margin: "5px" }}
      variant="contained"
      className="btn"
      type="submit"
    >
      Login With GitHub
    </Button>
  );
}
