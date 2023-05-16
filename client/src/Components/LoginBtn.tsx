import React, { useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import { setCurrentUser } from "../store/CurrentUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { findUser } from "../store/CurrentUserSlice";
import { createApplicant } from "../store/applicantSlice";
import { extractApplicantData, extractRecruiterData } from "../lib/extractInfo";
import { createRecruiter } from "../store/recruiterSlice";
import { clear } from "console";

const CLIENT_ID = "Iv1.0f2124a7d7aa9dee";

type LoginBtnProps = {
  text: string;
};

export default function LoginBtn({ text }: LoginBtnProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const currentUserID = useSelector((s: RootState) => s.currentUser);

  // useEffect(() => {
  //   console.log("this is from state", currentUserID);
  // }, [currentUserID]);

  // const firstUpdate = useRef(true);
  // useEffect(() => {
  //   if (firstUpdate.current) {
  //     // firstUpdate.current = false;
  //     return;
  //   }
  //   console.log("this is from state", currentUserID);
  // });

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get("code");

  useEffect(() => {
    dispatch(findUser("U_kgDOB0L6_A"));
    // console.log("IDDDDD!!!", currentUserID);
  }, []);

  async function AuthenticateUserfromGH() {
    try {
      const tokenData = await fetchTokenData(codeParam!);
      const userInfo = await fetchUserData(tokenData.access_token);
      const gitHubID = userInfo.node_id;
      const returnedRole = await dispatch(findUser(gitHubID));

      if (!returnedRole.payload) {
        console.log(
          "if we hit here, user does not exist therefore we must create it."
        );
        const isApplicant = localStorage.getItem("currentUser") == "applicant";
        if (isApplicant) {
          const applicantCreated = await dispatch(
            createApplicant(extractApplicantData(userInfo))
          );
          // console.log(applicantCreated);
          dispatch(
            setCurrentUser({
              id: applicantCreated.payload.idDB,
              role: "applicant",
            })
          );
          localStorage.setItem("id", applicantCreated.payload.idDB + "");
          //navigate(`/applicant/${applicantCreated.payload.idDB}`);
          navigate(`/login`);
          ///${applicantCreated.payload.idDB}`);
        } else {
          const recruiterCreated = await dispatch(
            createRecruiter(extractRecruiterData(userInfo))
          );
          // console.log(recruiterCreated);
          dispatch(
            setCurrentUser({
              id: recruiterCreated.payload.id,
              role: "recruiter",
            })
          );
          localStorage.setItem("id", recruiterCreated.payload.id + "");

          // navigate(`/recruiter/${recruiterCreated.payload.id}`);
          navigate(`/login`);
          ///${recruiterCreated.payload.id}`);
        }
      }

      if (returnedRole.payload && returnedRole.payload.recruiterName) {
        console.log("local storate???");
        localStorage.setItem("id", returnedRole.payload.id + "");
        localStorage.setItem("currentUser", "recruiter");
        dispatch(
          setCurrentUser({ id: returnedRole.payload.id, role: "recruiter" })
        );

        // navigate(`/recruiter/${returnedRole.payload.id}`);
        navigate(`/login`);
        ///${returnedRole.payload.id}`);
      } else if (returnedRole.payload && returnedRole.payload.idDB) {
        localStorage.setItem("id", returnedRole.payload.idDB + "");
        localStorage.setItem("currentUser", "applicant");
        dispatch(
          setCurrentUser({ id: returnedRole.payload.idDB, role: "applicant" })
        );
        // navigate(`/applicant/${returnedRole.payload.idDB}`);
        navigate(`/login`);
        ///${returnedRole.payload.idDB}`);
      }

      if (tokenData.access_token) {
        localStorage.setItem("accessToken", tokenData.access_token);
      }
    } catch (e) {
      console.log("error", e);
    }
  }

  async function fetchTokenData(codeParam: string) {
    // console.log("easfesgsegesgesg ==>", codeParam);
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

  function clearURLParams() {
    const newUrl = window.location.origin + window.location.pathname;
    window.history.pushState({}, "/", newUrl);
  }

  useEffect(() => {
    if (codeParam && localStorage.getItem("accessToken") === null) {
      AuthenticateUserfromGH();
      clearURLParams();
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
      sx={{
        backgroundColor: "#568EA3",
        margin: "5px",
        width: "250px",
        marginLeft: "15px",
      }}
      variant="contained"
      type="submit"
    >
      <GitHubIcon sx={{ marginRight: "15px" }} />
      {text}
    </Button>
  );
}
