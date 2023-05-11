import React, { useEffect, useState } from "react";
import "./RegisterModal.css";
import { Recruiter, Applicant } from "../Interfaces";
import GithubBtn from "./GithubBtn";

type RegisterModalProps = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export default function RegisterModal({ isOpen, setOpen }: RegisterModalProps) {
  const [isApplicant, setisApplicant] = useState(true);
  const [isRecruiter, setisRecruiter] = useState(false);

  const handleToggle = () => {
    setisApplicant(!isApplicant);
    setisRecruiter(isApplicant);
  };

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
    track: [],
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
    // inProgressApplications: [],
    coordinateX: "",
    coordinateY: "",
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
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="checkbox">
          <input
            type="checkbox"
            id="applicant"
            name="role"
            value="applicant"
            checked={isApplicant}
            onChange={(e) => {
              handleToggle();
              localStorage.setItem("currentUser", e.target.value);
            }}
          />
          <label htmlFor="applicant">Applicant</label>
          <input
            type="checkbox"
            id="recruiter"
            name="role"
            value="recruiter"
            checked={!isApplicant}
            onChange={(e) => {
              handleToggle();
              localStorage.setItem("currentUser", e.target.value);
            }}
          />
          <label htmlFor="recruiter">Recruiter</label>
        </div>
        <GithubBtn text={"Sign-up with Github"}></GithubBtn>
      </div>
    </div>
  );
}
