import React from "react";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

import { fetchRecruiter, setRecruiter } from "../store/recruiterSlice";
import VacancyList from "../Components/Vacancy/VacancyList";
import RecruiterForm from "../Components/RecruiterForm";
import Modal from "react-modal";

const RecruiterProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recruiter = useSelector((state: RootState) => state.recruiter);
  const dispatch = useDispatch<AppDispatch>();
  const codeParam = window.location.pathname.split("/").reverse()[0];
  console.log("recruiter", recruiter);
  useEffect(() => {
    dispatch(setRecruiter(recruiter));
    dispatch(fetchRecruiter(1)); //+codeParam!
  }, [dispatch]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="mt-[80px]">
      <div className="flex ml-20 ">
        <div className="mr-8">
          <img
            src={recruiter.recruiter.logo}
            alt="Logo picture not found"
            className="w-32 h-32 "
          />
          <p className="mt-2">{recruiter.recruiter.email}</p>
          <p>{recruiter.recruiter.externalLinks}</p>
        </div>
        <div className="ml-20 mr-20">
          <h1 className="text-4xl font-bold">{recruiter.recruiter.name}</h1>
          <div className="grid grid-cols-2 gap-x-4 mt-2">
            <div>
              <p>Founded:</p>
              <p>{recruiter.recruiter.founded}</p>
            </div>
            <div>
              <p>Head Office:</p>
              <p>{recruiter.recruiter.headOffice}</p>
            </div>
          </div>
          <p className="mt-4">Recruiter: {recruiter.recruiter.recruiterName}</p>
          <p className="mt-4">{recruiter.recruiter.about}</p>
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Edit your profile"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              margin: "auto",
              marginTop: "2rem",
              width: "80%",
              maxWidth: "900px",
            },
          }}
        >
          <RecruiterForm onCancel={closeModal} />
        </Modal>

        <button
          onClick={openModal}
          className=" w-[100px] h-[100px] font-medium text-black border-2 border-black rounded-md focus:outline-none focus:ring"
        >
          Edit your profile
        </button>
      </div>
      <div className="mt-20 ml-10 mr-10">
        <VacancyList />
      </div>
    </div>
  );
};

export default RecruiterProfilePage;
