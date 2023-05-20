import React, { useState } from "react";
import Button from "@mui/material/Button";
import RegisterModal from "../Components/RegisterModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import "./Login.css";
import { setCurrentUser } from "../store/CurrentUserSlice";
import LoginBtn from "../Components/LoginBtn";
import { useNavigate } from "react-router-dom";
import SignInWithGoogle from "../Components/SignInWithGoogle";
import stock2 from "../assets/stock-2.png";

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [render, setReRender] = useState(false);
  const [isOpen, setOpen] = useState(false);

  function handleRegisterModal() {
    setOpen(!isOpen);
  }

  async function logoutFromGithub() {
    if (localStorage.getItem("authInfo")) {
      await logoutFromGoogle(localStorage.getItem("gt"));
    } else {
      localStorage.removeItem("accessToken");
    }
    localStorage.removeItem("currentUser");
    localStorage.removeItem("login");
    localStorage.removeItem("id");
    dispatch(setCurrentUser({ id: "", role: "" }));
    setReRender(!render);
  }

  async function logoutFromGoogle(token: string | null) {
    await fetch(`https://oauth2.googleapis.com/revoke?token=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then((data) => {
      localStorage.removeItem("authInfo");
      localStorage.removeItem("gt");
    });
  }

  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center bg-stone-100">
        <div className="shadow-md flex flex-col items-center justify-center p-10 bg-white rounded-lg">
          <h1 className="text-lg font-bold pb-2">Login</h1>
          <img
            src={stock2}
            alt="stockphoto"
            style={{ width: "max", height: 350, marginTop: "5px" }}
          />
          {localStorage.getItem("accessToken") || localStorage.getItem("gt") ? (
            <>
              <h3 className="pb-8">You are logged in!</h3>
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
              <LoginBtn text={"Login with Github"} />
              <SignInWithGoogle />
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
