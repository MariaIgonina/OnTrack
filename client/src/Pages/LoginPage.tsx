import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import RegisterModal from "../Components/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import "./Login.css";
import { createApplicant } from "../store/applicantSlice";

import GithubBtn from "../Components/GithubBtn";
import { findUser, setCurrentUser } from "../store/CurrentUserSlice";

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  // const role = useSelector((state: RootState) => state.currentUser);

  const [render, setReRender] = useState(false);
  const [isOpen, setOpen] = useState(false);

  function handleRegisterModal() {
    setOpen(!isOpen);
  }

  function logoutFromGithub() {
    localStorage.removeItem("accessToken");
    dispatch(setCurrentUser({ id: "", role: "" }));
    setReRender(!render);
  }

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
