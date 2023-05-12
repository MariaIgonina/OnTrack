import React, { useEffect } from "react";
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
  const currentUser = useSelector((state: RootState) => state.currentUser);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get("code");

  async function AuthenticateUserfromGH() {
    console.log("REGISTER");
    try {
      const tokenData = await fetchTokenData(codeParam!);
      const userInfo = await fetchUserData(tokenData.access_token);
      //THIS NEEDS TO BE BASED ON THE OUTCOME OF SEARCHING THE DATABASE
      const gitHubID = userInfo.node_id;
      console.log(userInfo);
      //get the user a
      const returnedRole = await dispatch(findUser(gitHubID));

      console.log(returnedRole.payload);

      if (!returnedRole.payload) {
        console.log(
          "if we hit here, user does not exist therefore we must create it."
        );
        const isApplicant = localStorage.getItem("currentUser") == "applicant";
        if (isApplicant) {
          const applicantCreated = await dispatch(
            createApplicant(extractApplicantData(userInfo))
          );
          console.log(applicantCreated);
          dispatch(
            setCurrentUser({
              id: applicantCreated.payload.idDB,
              role: "applicant",
            })
          );
          navigate(`/applicant/${applicantCreated.payload.idDB}`);
        } else {
          const recruiterCreated = await dispatch(
            createRecruiter(extractRecruiterData(userInfo))
          );
          console.log(recruiterCreated);
          dispatch(
            setCurrentUser({
              id: recruiterCreated.payload.id,
              role: "applicant",
            })
          );
          navigate(`/recruiter/${recruiterCreated.payload.id}`);
        }
      }

      //NOW A CONDITIONAL TO KNOW
      //ONCE THE RETURNED ROLE HAS BEEN RESOLVED
      if (returnedRole.payload && returnedRole.payload.recruiterName) {
        dispatch(
          setCurrentUser({ id: returnedRole.payload.id, role: "recruiter" })
        );
        navigate(`/recruiter/${returnedRole.payload.id}`);
      } else if (returnedRole.payload && returnedRole.payload.idDB) {
        dispatch(
          setCurrentUser({ id: returnedRole.payload.idDB, role: "applicant" })
        );
        navigate(`/applicant/${returnedRole.payload.idDB}`);
      }

      if (tokenData.access_token) {
        localStorage.setItem("accessToken", tokenData.access_token);
      }
      //clearURLParams(codeParam);
      // redirectUser();
    } catch (e) {
      console.log("error", e);
    }
  }

  async function fetchTokenData(codeParam: string) {
    console.log("easfesgsegesgesg ==>", codeParam);
    const response = await fetch(
      "http://localhost:3000/getAccessToken?code=" + codeParam,
      { method: "GET" }
    );
    if (!response.ok) {
      throw new Error("Server error");
    }
    const data = await response.json();
    console.log("DATA FROM FETCH TOKEN DATA ==> ", data);
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
      //remove code params
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
      sx={{ backgroundColor: "#568EA3", margin: "5px" }}
      variant="contained"
      className="btn"
      type="submit"
    >
      <GitHubIcon sx={{ marginRight: "15px" }} />
      {text}
    </Button>
  );
}
