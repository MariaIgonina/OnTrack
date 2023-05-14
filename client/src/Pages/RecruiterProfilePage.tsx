import React from "react";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

import { fetchRecruiter, setRecruiter } from "../store/recruiterSlice";
import VacancyList from "../Components/Vacancy/VacancyList";
import RecruiterForm from "../Components/RecruiterForm";
import Modal from "react-modal";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import InfoIcon from '@mui/icons-material/Info';
import ApartmentIcon from '@mui/icons-material/Apartment';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

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
      <div className="flex flex-col">
      
      <div className="flex flex-row">
      
      <div>
          <img
            src={recruiter.recruiter.logo}
            alt="Logo picture not found"
            className="shadow-md rounded-full bg-gray-50 m-3"
            style={{ height: '220px', width: '220px' }}
          />

        </div>
        <div className="flex-shrink-0 flex-grow flex-col flex rounded-2xl shadow-md bg-white p-3 m-2 mt-3 mr-2">
          <h1 
          className="text-3xl font-bold tracking-tight text-[#026767] sm:text-3xl m-2"
          >{recruiter.recruiter.name}
          </h1>
          

          <div className="flex flex-row ">
            <EditCalendarIcon
              fontSize="small"
              style={{ color: '#026767' }}
              className="mr-2 mt-2"
            >
            </EditCalendarIcon>
            <h3
            className="text-lg font-semibold leading-6 text-[#026767] text-base mt-2"
            >Founded
            </h3>
            <h4>{recruiter.recruiter.founded}</h4>
          </div>
  
          <div className="flex flex-row ">
            <ApartmentIcon
              fontSize="small"
              style={{ color: '#026767' }}
              className="mr-2 mt-4"
            >
            </ApartmentIcon>
            <h3
            className="text-lg font-semibold leading-6 text-[#026767] text-base mt-4"
            >Head Office</h3>
          </div>

            <p>{recruiter.recruiter.headOffice}</p>
          </div>

          <div className=" flex-shrink-0 flex-grow flex-col flex rounded-2xl shadow-md p-3 m-2 mt-2 mr-4 bg-[#FFE8D1]">
        
            <h2
            className="text-lg font-semibold leading-6 text-[#026767] text-base"
            >Recruiter's card</h2>
            <p className="mt-4">{recruiter.recruiter.recruiterName}</p>
            
            <div className=" flex flex-row ">
              <AlternateEmailIcon
                fontSize="small"
                style={{ color: '#475569' }}
                className="mr-2"
              ></AlternateEmailIcon>
              
              <p>{recruiter.recruiter.email}</p>
            </div>
            <div className="flex flex-row mt-2">
              <InsertLinkIcon
                fontSize="small"
                style={{ color: '#475569' }}
                className="mr-2"
              >
              </InsertLinkIcon>
            <p>{recruiter.recruiter.externalLinks}</p>
            </div>
          </div>
          </div>
         

          <div className="flex flex-row">
            <div
              className="flex-shrink-0 flex-grow flex-col flex rounded-2xl shadow-md bg-[#D7E7E8] p-3 m-2 mr-4 ml-2">
            <div className="flex flex-row ">
              <InfoIcon
                fontSize="small"
                style={{ color: '#026767' }}
                className="mr-2"
              >
              </InfoIcon>
              <p
              className="text-lg font-semibold leading-6 text-[#026767] text-base"
              >About</p>
               </div>
              <p className="">{recruiter.recruiter.about}</p>
          </div>

          <div
            className="flex-shrink-0 w-36 flex-col flex rounded-2xl shadow-md bg-green-100 p-3 m-2 mr-4 ml-2 items-center justify-center">
            <h1
            className="text-3xl font-bold tracking-tight text-white sm:text-3xl m-2"
            >{7}</h1>
            <p className="ext-1xl font-bold tracking-tight text-white sm:text-3xl ">
            active</p>
            <p className="text-lg font-semibold leading-6 text-white text-base">
            vacancies</p>
            <p className="">{recruiter.recruiter.about}</p>
          </div>
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
            },
          }}
        >
          <RecruiterForm onCancel={closeModal} />
        </Modal>

        {/* <button
          onClick={openModal}
          className=" w-[100px] h-[100px] font-medium text-black border-2 border-black rounded-md focus:outline-none focus:ring"
        >
          Edit your profile
        </button> */}
      </div>
      <div className="mt-20 ml-10 mr-10">
        <VacancyList />
      </div>
    </div>
  );
};

export default RecruiterProfilePage;
