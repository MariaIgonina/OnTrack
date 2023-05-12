import React from "react";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

import { fetchRecruiter, setRecruiter } from "../store/recruiterSlice";
import VacancyList from "../Components/VacancyList";

const RecruiterProfilePage = () => {
  const recruiter = useSelector((state: RootState) => state.recruiter);
  const dispatch = useDispatch<AppDispatch>();
  const codeParam = window.location.pathname.split("/").reverse()[0];

  const currentUserID = useSelector((s: RootState) => s.currentUser.id);

  useEffect(() => {
    console.log("IDDDDD from recruiterProfile page!!!", currentUserID);
  }, []);

  useEffect(() => {
    dispatch(setRecruiter(recruiter));
    dispatch(fetchRecruiter(+currentUserID));
  }, [dispatch]);

  return (
    <div
      className="bg-stone-100 py-12 sm:py-16 rounded-lg"
      style={{ height: "100%", marginTop: "100px" }}
    >
      {/* <>{JSON.stringify(recruiter)}</> */}
      <div className="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full flex justify-center">
              <div className="relative">
                <img
                  src={recruiter.recruiter.logo}
                  alt="Logo picture not found"
                  className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                />
              </div>
            </div>
            <div className="w-full text-center mt-20">
              <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                    {recruiter.recruiter.headOffice}
                  </span>
                  <span className="text-sm text-slate-400">Head Office</span>
                </div>
                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                    {recruiter.recruiter.founded}
                  </span>
                  <span className="text-sm text-slate-400">Founded</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-2">
            <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
              {recruiter.recruiter.name}
            </h3>
            <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
              {recruiter.recruiter.headOffice}
            </div>
          </div>
          <div className="mt-6 py-6 border-t border-slate-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4">
                <p className="font-light leading-relaxed text-slate-600 mb-4">
                  {recruiter.recruiter.about}
                </p>
                <a
                  href="javascript:;"
                  className="font-normal text-slate-700 hover:text-slate-400"
                >
                  Recruiter: {recruiter.recruiter.recruiterName}
                </a>
                <VacancyList />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="relative pt-6 pb-2 mt-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
              <div className="text-sm text-slate-500 font-semibold py-1">
                Tailwind CSS Component from{" "}
                <a
                  href="https://www.creative-tim.com/product/notus-design-system-pro?ref=tailwindcomponents"
                  className="text-slate-700 hover:text-slate-500"
                  target="_blank"
                >
                  Notus PRO Html
                </a>{" "}
                by{" "}
                <a
                  href="https://www.creative-tim.com"
                  className="text-slate-700 hover:text-slate-500"
                  target="_blank"
                >
                  {" "}
                  Creative Tim
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RecruiterProfilePage;
