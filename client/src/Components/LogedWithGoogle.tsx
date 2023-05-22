import { useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "../store/store";
import { Applicant, Recruiter } from "../Interfaces";
import { createApplicant, setApplicant } from "../store/applicantSlice";
import { setCurrentUser } from "../store/CurrentUserSlice";
import { createRecruiter, setRecruiter } from "../store/recruiterSlice";
import Loading from "../Components/Loading";

type InfoRequestData = {
  token: string;
  applicant: boolean;
};

const loggedWithGoogle = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState<any>("");
  const newApplicant = useSelector(
    (state: RootState) => state.applicant.applicant
  );
  const newRecruiter = useSelector(
    (state: RootState) => state.recruiter.recruiter
  );
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  let params: any = {};
  let regex = /([^&=]+)=([^&]*)/g,
    m;
  while ((m = regex.exec(location.href))) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  if (Object.keys(params).length > 0) {
    localStorage.setItem("authInfo", JSON.stringify(params));
  }
  // hide the access token
  window.history.pushState({}, document.title, "/" + "loggedWithGoogle");

  let info = JSON.parse(localStorage.getItem("authInfo")!);
  let token: string = info["access_token"];
  localStorage.setItem("gt", token);

  const goToUserLogin = useCallback(() => {
    if (userEmail.length) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [userEmail]);

  const userInfoRequest = async (data: InfoRequestData) => {
    try {
      const response = await fetch("http://localhost:3000/getGoogleUserInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      setUserName(result.name);
      setUserImg(result.picture);
      setUserEmail(result.email);
      if (localStorage.getItem("currentUser") === "applicant") {
        localStorage.setItem("login", "applicant");
        const newApp: Applicant = {
          picture: result.picture,
          email: result.email,
          idAuth: result.sub,
          name: result.name,
        };
        dispatch(createApplicant(newApp));
        dispatch(
          setCurrentUser({
            id: newApp.idAuth,
            role: "applicant",
          })
        );
        if (!localStorage.getItem("currentUser"))
          localStorage.setItem("currentUser", "applicant");
      } else {
        localStorage.setItem("login", "recruiter");
        const newRec: Recruiter = {
          picture: result.picture,
          email: result.email,
          idAuth: result.sub,
          recruiterName: result.name,
        };
        dispatch(createRecruiter(newRec));
        dispatch(
          setCurrentUser({
            id: newRec.id,
            role: "recruiter",
          })
        );
        if (!localStorage.getItem("currentUser"))
          localStorage.setItem("currentUser", "recruiter");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    if (newApplicant.idDB) {
      localStorage.setItem("id", newApplicant.idDB + "");
      dispatch(setCurrentUser({ id: newApplicant.idDB, role: "applicant" }));
    } else if (newRecruiter.id) {
      localStorage.setItem("id", newRecruiter.id + "");
      dispatch(setCurrentUser({ id: newRecruiter.id, role: "recruiter" }));
    }
    goToUserLogin();
  }, [newRecruiter, newApplicant]);

  useEffect(() => {
    userInfoRequest({ token, applicant: false });
  }, []);

  return (
    <Loading userImg={userImg} userName={userName}></Loading>
    // <div className="w-screen h-[70vh] flex flex-col justify-center items-center">
    //   <div className="flex ">
    //     <Spinner />
    //   </div>
    //   <div className="-mt-8 flex w-[400px] h-[200px] flex items-center justify-center shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 rounded-xl">
    //     <img id="profilePicture" src={userImg} className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" />
    //     <div className="ml-5">
    //       <h2 >Welcome, {userName.split(' ').length > 1 ? userName.split(' ')[0] : userName}!</h2>
    //       <p>We're preparing your profile...</p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default loggedWithGoogle;
