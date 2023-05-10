import React, { useState } from "react";
import "./RegisterModal.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { createRecruiter } from "../store/recruiterSlice";
import { Recruiter, Applicant } from "../Interfaces";
import { createApplicant } from "../store/applicantSlice";
import GithubBtn from "./GithubBtn";

type RegisterModalProps = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export default function RegisterModal({ isOpen, setOpen }: RegisterModalProps) {
  const [isUser, setisUser] = useState(false);
  const [isRecruiter, setisRecruiter] = useState(true);

  const handleToggle = () => {
    setisUser(!isUser);
    setisRecruiter(!isRecruiter);
  };
  const dispatch = useDispatch<AppDispatch>();

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
  };

  const initialApplicant: Applicant = {
    idDB: 0,
    idAuth: "",
    email: "",
    picture: "",
    name: "",
    familyName: "",
    age: 0,
    phone: "",
    location: "",
    inProgressApplications: [],
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
    desiredLocation: "",
    nonDesiredLocation: "",
    desiredWorkingModal: "",
  };

  const [rformData, setFormData] = useState(initialState);
  const [uformData, setuFormData] = useState(initialApplicant);

  const handleSubmit = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    if (isUser) {
      dispatch(createRecruiter(rformData));
    } else {
      dispatch(createApplicant(uformData));
    }
    setOpen(!isOpen);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (isUser) {
      setFormData({ ...rformData, [e.target.name]: e.target.value });
    } else {
      setuFormData({ ...uformData, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="checkbox">
            <input
              type="checkbox"
              id="applicant"
              name="role"
              value="applicant"
              checked={!isUser}
              onChange={(e) => {
                handleToggle();
                handleInputChange(e);
              }}
            />
            <label htmlFor="applicant">Applicant</label>
            <input
              type="checkbox"
              id="recruiter"
              name="role"
              value="recruiter"
              checked={!isRecruiter}
              onChange={(e) => {
                handleToggle();
                handleInputChange(e);
              }}
            />
            <label htmlFor="recruiter">Recruiter</label>
          </div>
          <GithubBtn text={"Sign-up with Github"}></GithubBtn>
        </form>
      </div>
    </div>
  );
}
