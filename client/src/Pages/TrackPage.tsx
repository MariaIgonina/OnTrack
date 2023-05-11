import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Vacancy, Applicant, Track, Recruiter } from "../Interfaces";

const mockRecruiter: Recruiter = {
  id: 1,
  email: "",
  picture: "",
  idAuth: "",
  recruiterName: "",
  name: "",
  vacancies: [],
  logo: "",
  founded: "",
  about: "",
  externalLinks: [],
  headOffice: "",
  track: []
}

const mockVacancy: Vacancy = {
  id: 1235,
  recruiter: mockRecruiter,
  recruiterId: mockRecruiter.id!,
  about: "I am a fake vacancy, blah añldsfh a. Elkad, oadshfn ashdjf  adsufh jhdas! Dkahuh!",
  title: "Fake Vacancy",
  jobTrack: [],
  workingHours: "full-time",
  workingModal: "",
  skills: [],
  stack: [],
  requiredLanguages: ['english3'],
  experience: 0,
  location: "Barcelona",
  salaryRange: 0
}

interface TrackProps {
  vacancy: Vacancy,
}
// React.FC<TrackProps | null>

const TrackPage = ({ vacancy = mockVacancy }) => {
  const [title, setTitle] = useState(mockVacancy.title);
  const [description, setDescription] = useState(mockVacancy.about);

  useEffect(() => {
    setTitle(mockVacancy.title)

  })

  return (
    <>
      <div id='track-container' className="flex flex-col">
        <div id='Info'>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div id="steps-container" className="flex flex-col items-center justify-center ">
          <div className="w-[60%] ">THIS WILL BE A STEP COMPONENT (AN ACTION) QUESTIONARY OR WHATEVER </div>
        </div>
      </div>
    </>
  );
};

export default TrackPage;
