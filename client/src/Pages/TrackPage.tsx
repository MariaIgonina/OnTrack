import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Vacancy, Applicant, Track, Recruiter } from "../Interfaces";

const mockRecruiter: Recruiter = {
  id: 1,
  emailstring: "",
  picture: "",
  idAuth: "",
  recuiterName: "",
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
  recruiterId: mockRecruiter.id,
  about: "I am a fake vacancy",
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

const TrackPage: React.FC<TrackProps> = ({}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setTitle(mockVacancy.title)

  })

  return (
    <>
      <div>
        I'm track
      </div>
    </>
  );
};

export default TrackPage;
