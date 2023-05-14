import React from "react";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

import { fetchRecruiter, setRecruiter } from "../store/recruiterSlice";
import VacancyList from "../Components/Vacancy/VacancyList";
import RecruiterForm from "../Components/RecruiterForm";
import Modal from "react-modal";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ChatBox from "../Components/liveChat/Chat";
import Chat from "../Components/liveChat/Chat";
import ChatWindow from "../Components/liveChat/ChatWindow";

const RecruiterProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recruiter = useSelector((state: RootState) => state.recruiter);
  const dispatch = useDispatch<AppDispatch>();
  const codeParam = window.location.pathname.split("/").reverse()[0];

  const currentUserID = useSelector((s: RootState) => s.currentUser.id);

  useEffect(() => {
    console.log("IDDDDD from recruiterProfile page!!!", currentUserID);
    dispatch(setRecruiter(recruiter));
    if (currentUserID) {
      dispatch(fetchRecruiter(+currentUserID));
    }
  }, [dispatch, currentUserID]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className=" bg-stone-100 h-full p-4 ">
      <div className="flex ml-20 ">
        <div className="mr-8">
          <img
            src={recruiter.recruiter.logo}
            alt="Logo picture not found"
            className="w-32 h-32 "
          />
          <div className="rounded-2xl shadow-md bg-[#FFE8D1] p-4">
            <div className=" flex flex-row ">
              <AlternateEmailIcon
                fontSize="small"
                style={{ color: "#475569" }}
                className="mr-2"
              ></AlternateEmailIcon>
              <p>{recruiter.recruiter.email}</p>
            </div>

            <p>{recruiter.recruiter.externalLinks}</p>
          </div>
        </div>
        <div className="ml-20 mr-20 shadow-md rounded-2xl bg-white p-4">
          <h1 className="text-3xl font-bold tracking-tight text-[#026767] sm:text-3xl m-2">
            {recruiter.recruiter.name}
          </h1>
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            content: {
              margin: "auto",
              marginTop: "2rem",
              width: "60%",
              maxWidth: "900px",
              // display: "flex",
              // alignItems: "center",
              // justifyContent: "center",
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
        <ChatWindow trackId={1} />
      </div>
    </div>
  );
};

export default RecruiterProfilePage;
