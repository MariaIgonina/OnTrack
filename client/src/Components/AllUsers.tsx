import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchAllApplicants } from "../store/applicantSlice";

export default function AllUsers() {
  const applicants = useSelector((s: RootState) => s.applicant.applicant);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllApplicants());
  }, []);

  console.log(applicants);

  const posts = [
    {
      idAuth: 9876,
      email: "xavier.graells@ontrack.com",
      picture:
        "https://cdn.freebiesupply.com/logos/large/2x/ikea-1-logo-png-transparent.png",
      name: "Xavier",
      familyName: "Graells",
      age: "1994-01-01T00:00:00.000Z",
      phone: "6578412",
      location: "barcelona",
      currentLocation: ["37.7749", "-122.4194"],
      readyMove: true,
      workingHours: "full-time",
      workingModal: "office",
      socialMedia: ["xavi@instagram.com"],
      skillsProf: ["analytics", "UI"],
      stack: ["express", "cypress"],
      compLanguages: ["javascript", "react"],
      about: "I'm 28 years old catalan guy from Terrassa",
      video: "",
      languages: ["spanish3", "catalan3", "english2"],
      hobbies: ["sport"],
      salaryRange: 40000,
      desiredLocation: ["londres", "amsterdam"],
      notDesiredLocation: ["terrassa"],
      desiredWorkingModal: "office",
    },

    {
      idAuth: "4565",
      email: "guillaumerouchaud@ontrack.com",
      picture:
        "https://media.licdn.com/dms/image/C560BAQFrtK-ioO1rsQ/company-logo_200_200/0/1590681827578?e=1691625600&v=beta&t=gEtpLeRhDk7yaP5QIV2P_7ZXW7d5SpNGUpepLRYaACo",
      name: "Guillaume",
      familyName: "Rouchaud",
      age: "1993-01-01T00:00:00.000Z",
      phone: "6578412",
      location: "barcelona",
      currentLocation: [],
      readyMove: true,
      workingHours: "internship",
      workingModal: "hybrid",
      socialMedia: ["www.facebook.com/guillaume"],
      skillsProf: ["analytics", "UI"],
      stack: ["tailwind", "express"],
      compLanguages: ["javascript", "typescript"],
      about: "I'm 29 years old guy from France",
      video: "",
      languages: ["spanish2", "catalan0", "english2", "french3"],
      hobbies: ["sport"],
      salaryRange: 32000,
      desiredLocation: ["madrid", "san sebastian"],
      notDesiredLocation: ["terrassa"],
      desiredWorkingModal: "hybrid",
    },

    {
      idAuth: "3241",
      email: "paolapatino@ontrack.com",
      picture:
        "data:image/png;base64,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",
      name: "Paola",
      familyName: "Patiño",
      age: "1993-01-01T00:00:00.000Z",
      phone: "6578412",
      location: "barcelona",
      currentLocation: [],
      readyMove: true,
      workingHours: "part-time",
      workingModal: "remote",
      socialMedia: [],
      skillsProf: ["automation", "virtualisation"],
      stack: ["koa", "cypress", "jest"],
      compLanguages: ["angular", "react", "python"],
      about: "I'm 29 years old girl guy from Colombia",
      video: "",
      languages: ["spanish3", "english2"],
      hobbies: ["guitarra"],
      salaryRange: 35000,
      desiredLocation: ["bogota", "amsterdam", "berlin"],
      notDesiredLocation: ["terrassa"],
      desiredWorkingModal: "remote",
    },
    {
      idAuth: "3245",
      email: "paolapatino@ontrack.com",
      picture:
        "data:image/png;base64,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",
      name: "Paola",
      familyName: "Patiño",
      age: "1993-01-01T00:00:00.000Z",
      phone: "6578412",
      location: "barcelona",
      currentLocation: [],
      readyMove: true,
      workingHours: "part-time",
      workingModal: "remote",
      socialMedia: [],
      skillsProf: ["automation", "virtualisation"],
      stack: ["koa", "cypress", "jest"],
      compLanguages: ["angular", "react", "python"],
      about: "I'm 29 years old girl guy from Colombia",
      video: "",
      languages: ["spanish3", "english2"],
      hobbies: ["guitarra"],
      salaryRange: 35000,
      desiredLocation: ["bogota", "amsterdam", "berlin"],
      notDesiredLocation: ["terrassa"],
      desiredWorkingModal: "remote",
    },
    {
      idAuth: "3641",
      email: "paolapatino@ontrack.com",
      picture:
        "data:image/png;base64,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",
      name: "MARIA",
      familyName: "Patiño",
      age: "1993-01-01T00:00:00.000Z",
      phone: "6578412",
      location: "barcelona",
      currentLocation: [],
      readyMove: true,
      workingHours: "part-time",
      workingModal: "remote",
      socialMedia: [],
      skillsProf: ["automation", "virtualisation"],
      stack: ["koa", "cypress", "jest"],
      compLanguages: ["angular", "react", "python"],
      about: "I'm 29 years old girl guy from Colombia",
      video: "",
      languages: ["spanish3", "english2"],
      hobbies: ["guitarra"],
      salaryRange: 35000,
      desiredLocation: ["bogota", "amsterdam", "berlin"],
      notDesiredLocation: ["terrassa"],
      desiredWorkingModal: "remote",
    },
  ];

  return (
    <div className="bg-stone-100 py-24 sm:py-32 rounded-lg m-4 ">
      <div className="mx-auto max-w-7xl lg:px-8 ">
        <div className="mx-auto max-w-2xl lg:mx-0  ">
          <p className="mt-2 text-lg text-[#026767] leading-8 text-gray-600 ">
            Search all the candidates using OnTrack
          </p>
        </div>
        {/* <div className="grid grid-cols-3 gap-4 my-8 mt-3 max-w-xl gap-x-8 gap-y-8 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"> */}
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((applicant) => (
            <article
              key={applicant.idAuth}
              //   className="grid grid-cols-1 gap-4 rounded-2xl shadow-md bg-white p-3 m-5"
              className="flex max-w-xl flex-col items-start rounded-2xl justify-between shadow-md bg-white p-3 m-5"
              style={{ minWidth: "300px", maxWidth: "400px" }}
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time className="text-gray-500">{applicant.location}</time>
                <a
                  href={applicant.workingHours}
                  className="relative z-10 ml-auto rounded-full bg-green-100 text-white px-3 py-1.5 font-medium text-gray-600"
                >
                  Looking for {applicant.workingHours}
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href={applicant.name}>
                    <span className="absolute inset-0" />
                    {applicant.name}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  {applicant.about}
                </p>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  {applicant.stack}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  src={applicant.picture}
                  alt=""
                  className="h-10 w-10 rounded-full bg-gray-50"
                />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <a href={applicant.email}>
                      <span className="absolute inset-0" />
                      {applicant.email}
                    </a>
                  </p>
                  <p className="text-gray-600">{applicant.phone}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
