import React, { useCallback, useEffect, useRef, useState } from "react";
import "./RegisterModal.css";
import { Recruiter, Applicant } from "../Interfaces";
import GithubBtn from "./GithubBtn";
import SignInWithGoogle from "./SignInWithGoogle";

type RegisterModalProps = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export default function RegisterModal({ isOpen, setOpen }: RegisterModalProps) {
  const [isApplicant, setisApplicant] = useState(true);
  const [isRecruiter, setisRecruiter] = useState(false);
  const buttonRef = useRef<any>()
  const handleToggle = (e: any) => {
    console.log('inside togle', e.target.value)
    localStorage.setItem("currentUser", e.target.value);
    setisApplicant(!isApplicant);
    setisRecruiter(isApplicant);
  };

  useEffect(() => {
    if (buttonRef.current!.checked) localStorage.setItem('currentUser', 'applicant')
  }, []);


  useEffect(() => {
    console.log("state of applicant", isApplicant);
  }, [isApplicant]);

  const initialState: Recruiter = {
    id: 0,
    name: "",
    vacancies: [],
    logo: "",
    founded: "",
    about: "",
    externalLinks: [],
    headOffice: "",
    email: "",
    picture: "",
    idAuth: "",
    recruiterName: "",
  };

  const initialApplicant: Applicant = {
    idDB: 0,
    idAuth: "",
    email: "",
    picture: "",
    name: "",
    familyName: "",
    age: "",
    phone: "",
    location: "",
    currentLocation: [],
    readyToMove: false,
    workingHours: "",
    workingModal: "",
    socialMedia: [],
    skillsProf: [],
    stack: [],
    compLanguages: [],
    about: "",
    video: "",
    education: [],
    experiences: [],
    languages: [],
    hobbies: [],
    salaryRange: 0,
    desiredLocation: [],
    nonDesiredLocation: [],
    desiredWorkingModal: "",
    track: []
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="checkbox">
          <input
            ref={buttonRef}
            type="checkbox"
            id="applicant"
            name="role"
            value="applicant"
            checked={isApplicant}
            onChange={(e) => {
              handleToggle(e);
             
            }}
          />
          <label htmlFor="applicant">Applicant</label>
          <input
            type="checkbox"
            id="recruiter"
            name="role"
            value="recruiter"
            checked={isRecruiter}
            onChange={(e) => {
              handleToggle(e);
              
            }}
          />
          <label htmlFor="recruiter">Recruiter</label>
        </div>
        <GithubBtn text={"Sign-up with Github"}></GithubBtn>
        <SignInWithGoogle/>
      </div>
    </div>
  );
}
