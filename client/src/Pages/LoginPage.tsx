import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import RegisterModal from "../Components/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import "./Login.css";
import { createApplicant } from "../store/applicantSlice";
import { Applicant } from "../Interfaces";
import GithubBtn from "../Components/GithubBtn";
import { findUser, setCurrentUser } from "../store/CurrentUserSlice";

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const role = useSelector((state: RootState) => state.currentUser);

  const [render, setReRender] = useState(false);
  const [isOpen, setOpen] = useState(false);

  function handleRegisterModal() {
    setOpen(!isOpen);
  }

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get("code");

  function logoutFromGithub() {
    localStorage.removeItem("accessToken");
    setReRender(!render);
  }

  function extractUserData(userInfo: any) {
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

  async function getAccessToken() {
    try {
      await fetch("http://localhost:3000/getAccessToken?code=" + codeParam, {
        method: "GET",
      })
        .then((data) => {
          return data.json();
        })
        .then(async (data) => {
          const userInfo = await fetch("http://localhost:3000/getUserData", {
            headers: {
              Method: "GET",
              Authorization: "Bearer " + data.access_token,
            },
          }).then((data) => data.json());
          const newUser: Applicant = extractUserData(userInfo);
          const id = newUser.idAuth;

          const role = await dispatch(findUser(id!));

          if (role) {
            //if user exists then set state
            console.log("im here");
            dispatch(setCurrentUser({ id: id, role: role.payload }));
          } else {
            //SEPERATE IF USER OR APPLICANT
            //dispatch(createApplicant(newUser));
          }
          if (data.access_token) {
            localStorage.setItem("accessToken", data.access_token);
            setReRender(!render);
          }
        });
    } catch (e) {
      console.log("error", e);
    }
  }

  useEffect(() => {
    if (codeParam && localStorage.getItem("accessToken") === null) {
      getAccessToken();
    }
  }, []);

  useEffect(() => {
    console.log("state of user is", role);
  }, [role]);

  return (
    <>
      <div className="wholepage">
        <div className="container">
          <h1 className="title">Login</h1>
          {localStorage.getItem("accessToken") ? (
            <>
              <h3 className="loggedin">You are logged in!</h3>
              <Button
                sx={{ backgroundColor: "#568EA3" }}
                variant="contained"
                className="btn"
                type="submit"
                onClick={logoutFromGithub}
              >
                LogOut
              </Button>
            </>
          ) : (
            <>
              <GithubBtn text={"Login with Github"}></GithubBtn>
              <div className="register">
                <button className="smallbtn" onClick={handleRegisterModal}>
                  <p>Or sign up for the first time by registering an account</p>
                </button>
              </div>
              {isOpen ? (
                <RegisterModal isOpen={isOpen} setOpen={setOpen} />
              ) : null}
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default LoginPage;
