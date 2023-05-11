import React, { useCallback, useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import { Applicant, Recruiter } from "../Interfaces";
import { findUser, setCurrentUser } from "../store/CurrentUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { createApplicant } from "../store/applicantSlice";
import { createRecruiter } from "../store/recruiterSlice";

const CLIENT_ID = "Iv1.0f2124a7d7aa9dee";

type GithubBtnProps = {
  text: string;
};

export default function GithubBtn({ text }: GithubBtnProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");

  const newApplicant = useSelector(
    (state: RootState) => state.applicant.applicant
  );
  const newRecruiter = useSelector(
    (state: RootState) => state.recruiter.recruiter
  );
  const status = useSelector((state: RootState) => state.recruiter.status);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get("code");

  function extractApplicantData(userInfo: any) {
    const { avatar_url, bio, email, html_url, node_id, name } = userInfo;
    return {
      picture: avatar_url,
      about: bio,
      email,
      socialMedia: [html_url],
      idAuth: node_id,
      name,
    };
  }

  function extractRecruiterData(userInfo: any) {
    const { avatar_url, bio, email, node_id, name } = userInfo;
    return {
      picture: avatar_url,
      about: bio || "",
      email,
      idAuth: node_id,
      recruiterName: name,
      name: "",
      logo: "",
      founded: "",
      externalLinks: [],
      headOffice: "",
    };
  }

  async function AuthenticateUserfromGH() {
    console.log("HELLO");
    try {
      const tokenData = await fetchTokenData(codeParam!);
      const userInfo = await fetchUserData(tokenData.access_token);
      if (currentUser === "applicant") {
        const newUser: Applicant = extractApplicantData(userInfo);
        dispatch(createApplicant(newUser));
      } else {
        const newRecruiter: Recruiter = extractRecruiterData(userInfo);
        dispatch(createRecruiter(newRecruiter));
      }
      if (tokenData.access_token) {
        localStorage.setItem("accessToken", tokenData.access_token);
      }
    } catch (e) {
      console.log("error", e);
    }
  }

  useEffect(() => {
    redirectUser();
  }, [newRecruiter, newApplicant]);

  const redirectUser = () => {
    if (currentUser === "applicant") {
      const id = newApplicant.idDB;
      if (id) navigate(`/applicant/${id}`);
    } else if (currentUser === "recruiter") {
      const id = newRecruiter.id;
      console.log("status", status);
      console.log("LOOK HERE FOR NEW RECIRUTIER ==> ", newRecruiter);
      console.log("id from from end", id);
      if (id) navigate(`/recruiter/${id}`);
    }
  };

  async function fetchTokenData(codeParam: string) {
    const response = await fetch(
      "http://localhost:3000/getAccessToken?code=" + codeParam,
      { method: "GET" }
    );
    if (!response.ok) {
      throw new Error("Server error");
    }
    const data = await response.json();
    return data;
  }

  async function fetchUserData(accessToken: string) {
    const response = await fetch("http://localhost:3000/getUserData", {
      headers: {
        Method: "GET",
        Authorization: "Bearer " + accessToken,
      },
    });
    if (!response.ok) {
      throw new Error("Server error");
    }
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    if (codeParam && localStorage.getItem("accessToken") === null) {
      AuthenticateUserfromGH();
    }
  }, []);

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
