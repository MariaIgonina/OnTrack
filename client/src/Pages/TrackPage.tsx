import React, { useEffect, useState } from "react";
import NotePad from "../Components/NotePad";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Vacancy, Applicant, Track, Recruiter } from "../Interfaces";
import TrackSideBar from "../Components/TrackSidebar";
import recruiterSlice from "../store/recruiterSlice";
import StepTemplate from "../Components/StepTemplate";

const mockRecruiter: Recruiter = {
  id: 1,
  email: "",
  picture: "",
  idAuth: "",
  recruiterName: "",
  name: "Company Name",
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
  about: "I am a fake vacancy, click on me and you'll see the vacancy page if there's one or the company profile. Blah añldsfh a. Elkad, oadshfn ashdjf  adsufh jhdas! Dkahuh! akdsjh faks dhflasiudhf lads  uashdf uh d ladsfb way f, iadsuh uebakjdb aj. Af a diubakdgb a bgkajdn giabd adbv aha,aduh auds.",
  title: "Software Engineer",
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
    <div id='track-container' className="flex h-screen fixed top-[88px]">
      <TrackSideBar trackId={4} />
      <div className="w-full mx-5">
        <div id='Info' className="mb-10">
          <h2 className="text-3xl font-extrabold my-2" >{mockRecruiter.name}</h2>
          {/* dark:bg-gray-800 */}
          <div className="w-full">
            <a href="#" className=" flex items-center bg-white border border-gray-200 rounded-lg md:flex-row hover:bg-gray-800 hover:text-white 
           shadow shadow-sm shadow-gray">
              <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" alt="company logo" />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight ">{vacancy.title}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{vacancy.about}</p>
              </div>
            </a>
          </div>
        </div>

        <div id="steps-container"
          className="flex flex-col items-center justify-center">
          <StepTemplate step='Apply'/>
         
        </div>
      </div>
    </div >

  );
};

export default TrackPage;
