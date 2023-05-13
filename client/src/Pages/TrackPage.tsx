import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TrackSideBar from "../Components/tracks/TrackSidebar";
import StepTemplate from "../Components/steps/StepTemplate";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../store/store'
import { fetchTrack, setTrack, updateTrack } from "../store/trackSlice";
import { fetchVacancy } from "../store/vacancySlice";
import { fetchRecruiter } from "../store/recruiterSlice";
import { fetchApplicant } from "../store/applicantSlice";
import Landing from "../Components/codeSandbox/Landing";


const TrackPage = () => {
  const [userRole, setUserRole] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()
  const track = useSelector((state: RootState) => state.track);
  const vacancy = useSelector((state: RootState) => state.vacancy.vacancy)
  const applicant = useSelector((state: RootState) => state.applicant)
  const recruiter = useSelector((state: RootState) => state.recruiter)

  useEffect(() => {
    const searchQuery = new URLSearchParams(window.location.search);
    const queryObj = Object.fromEntries(searchQuery.entries());
    dispatch(fetchTrack({ getTrackByWhat: 'getTrackById', id: +queryObj.trackId }))
    dispatch(fetchVacancy(+queryObj.vacancyId));
    setUserRole(queryObj.userRole)
  }, []);

  useEffect(() => {
    if (track.track?.applicantID) {
      dispatch(fetchApplicant(track.track.applicantID));
    }
  }, [track.track?.applicantID]);

  useEffect(() => {
    if (track.track?.recruiterID) {
      dispatch(fetchRecruiter(track.track.recruiterID));
    }
  }, [track.track?.recruiterID]);



  return (
    <div id='track-container' className="flex h-screen fixed top-[70px] w-screen overflow-auto">
      <TrackSideBar trackId={track.track?.id} role={ userRole } />
      <div className="w-full mx-5">
        <div id='Info' className="mb-10 ">
          <a onClick={() => navigate(`/vacancy/${vacancy.data?.id}`)}>
            <h2 className="text-3xl font-extrabold my-2 hover:text-stone-100 hover:bg-gray-800 w-fit rounded-lg hover:cursor-pointer" >
              {vacancy.data?.title}
            </h2>
          </a>
          {userRole === 'applicant'
            ?
            <div id="applicantView" className="w-full hover:bg-gray-800 ">
              <a
                className="flex items-center bg-white border border-gray-200 rounded-lg md:flex-row  
           shadow shadow-sm shadow-gray w-full">
                <a onClick={() => navigate(`/recruiter/${recruiter.recruiter?.id}`)}>
                  <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg hover:cursor-pointer"
                    alt="Company Logo"
                    src={recruiter.recruiter?.logo}
                  />
                </a>
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <a onClick={() => navigate(`/recruiter/${recruiter.recruiter?.id}`)}><h5 className="hover:cursor-pointer mb-2 text-2xl w-fit rounded-lg font-bold tracking-tight hover:bg-gray-800 hover:text-white">
                    at {recruiter.recruiter.name}
                  </h5></a>
                  <p className="mb-3 font-normal text-gray-700 hover:text-gray-600 hover:underline hover:cursor-pointer">{vacancy.data?.about}</p>
                </div>
              </a>
            </div>
            :
            <div id="recruiterView" className="w-full hover:bg-gray-800 ">
              <a
                className="flex items-center bg-white border border-gray-200 rounded-lg md:flex-row  
           shadow shadow-sm shadow-gray w-full">
                <a onClick={() => navigate(`/recruiter/${recruiter.recruiter?.id}`)}>
                  <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg hover:cursor-pointer"
                    alt="Company Logo"
                    src={applicant.applicant?.picture}
                  />
                </a>
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <a onClick={() => navigate(`/applicant/${applicant.applicant?.idDB}`)}><h5 className="hover:cursor-pointer mb-2 text-2xl w-fit rounded-lg font-bold tracking-tight hover:bg-gray-800 hover:text-white">
                    {applicant.applicant.name}
                  </h5></a>
                  <p className="mb-3 font-normal text-gray-700 hover:text-gray-600 hover:underline hover:cursor-pointer">{vacancy.data?.about}</p>
                </div>
              </a>
            </div>
          }
        </div>

        <div id="steps-container"
          className="flex flex-col items-center">
          <StepTemplate title='Apply' />
          <StepTemplate title='Intro Interiew' link="zoom.meetings/room=as2u48/sdfbjy2" />
          <Landing />
        </div>
      </div >
    </div>

  );
};

export default TrackPage;
