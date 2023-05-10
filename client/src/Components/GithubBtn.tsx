import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";

const CLIENT_ID = "Iv1.0f2124a7d7aa9dee";

type GithubBtnProps = {
  text: string;
};

export default function GithubBtn({ text }: GithubBtnProps) {
  function loginWithGitHub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
    );
  }

  return (
    <Button
      onClick={loginWithGitHub}
      sx={{ backgroundColor: "#568EA3", margin: "5px" }}
      variant="contained"
      className="btn"
      type="submit"
    >
      {text}
    </Button>
  );
}
