import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TrackSideBar from "../Components/tracks/TrackSidebar";
import StepTemplate from "../Components/steps/StepTemplate";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchTrack, setTrack, updateTrack } from "../store/trackSlice";
import { fetchVacancy } from "../store/vacancySlice";
import { fetchRecruiter } from "../store/recruiterSlice";
import { fetchApplicant } from "../store/applicantSlice";
import Landing from "../Components/codeSandbox/Landing";
import DeleteTrackModal from "../Components/tracks/DeleteTrackModal";
import ChatWindow from "../Components/liveChat/ChatWindow";
import Videocall from "../Components/steps/Videocall";
import moment from "moment"
import { render } from "@headlessui/react/dist/utils/render";

type Step = {
  type: string,
  id: number | string,
  title?: string,
  order?: number | string,
  step: string
}

const TrackPage = () => {
  const [gotInfo, setGotInfo] = useState(0)
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [steps, setSteps] = useState<any>([{ type: "", id: "", title: "", order: 0, step: "" }]);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()
  const currentUser = useSelector((state: RootState) => state.currentUser)
  const track = useSelector((state: RootState) => state.track);
  const vacancy = useSelector((state: RootState) => state.vacancy.vacancy);
  const applicant = useSelector((state: RootState) => state.applicant);
  const recruiter = useSelector((state: RootState) => state.recruiter);


  useEffect(() => {
    const searchQuery = new URLSearchParams(window.location.search);
    const queryObj = Object.fromEntries(searchQuery.entries());
    dispatch(
      fetchTrack({ getTrackByWhat: "getTrackById", id: +queryObj.trackId })
    );
    dispatch(fetchVacancy(+queryObj.vacancyId));
    checkForSteps();
  }, [gotInfo, dispatch]);

  useEffect(() => {
    if (track.track?.applicantID) {
      dispatch(fetchApplicant(track.track.applicantID));
    }
    checkForSteps();
  }, [track.track?.applicantID]);

  useEffect(() => {
    if (track.track?.recruiterID) {
      dispatch(fetchRecruiter(track.track.recruiterID));
    }
    getInfo()
    // checkForSteps();
  }, [track.track?.recruiterID]);



  const getInfo = useCallback(() => {
    try {
      if (!track.track?.Message?.length) throw new Error('No info yet')
      console.log('TEXT???', track.track?.Message[0])
    } catch (error: any) {
      let num = gotInfo + 1;
      setGotInfo(num)
      console.log(error.message, num)
      console.log('track', track.track)
    }
    // checkForSteps();
  }, [gotInfo])



  const checkForSteps = () => {
    let fetchedSteps: any = [];
    if (track.track?.CodeSandbox) {
      track.track?.CodeSandbox.forEach(element => {
        fetchedSteps.push(element)
      });
    }
    if (track.track?.Videocall) {
      track.track?.Videocall.forEach(element => {
        fetchedSteps.push(element)
      });
    }
    setSteps([...fetchedSteps])
  }


  return (
    <div id='track-container' className="flex h-screen top-[70px] w-[90%] min-w-[600px] ">
      {deleteModal &&
        <DeleteTrackModal isOpen={true} setOpen={setDeleteModal} trackId={track.track?.id} />
      }
      <div className="w-[226px] min-w-[226px] h-[90%] hidden relative sm:block md:block lg:block">
        <TrackSideBar trackId={track.track?.id} role={currentUser.role!} setDeleteModal={setDeleteModal} />
      </div>

      <div className="w-[98%] min-w-[400px] ml-3">
        <div id='Info' className="mb-10 ">
          <a onClick={() => navigate(`/vacancy/${vacancy.data?.id}`)}>
            <h2 className="text-3xl font-extrabold my-2 hover:text-stone-100 hover:bg-gray-800 w-fit rounded-lg hover:cursor-pointer">
              {vacancy.data?.title}
            </h2>
          </a>
          {currentUser.role! === 'applicant'
            ?
            <div id="applicantView" className="w-full hover:bg-gray-800 ">
              <a
                className="flex items-center bg-white border border-gray-200 rounded-lg md:flex-row  
           shadow shadow-md w-full"
              >
                <a
                  onClick={() =>
                    navigate(`/recruiter/${recruiter.recruiter?.id}`)
                  }
                >
                  <img
                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg hover:cursor-pointer"
                    alt="Company Logo"
                    src={recruiter.recruiter?.logo}
                  />
                </a>
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <a
                    onClick={() =>
                      navigate(`/recruiter/${recruiter.recruiter?.id}`)
                    }
                  >
                    <h5 className="hover:cursor-pointer mb-2 text-2xl w-fit rounded-lg font-bold tracking-tight hover:bg-gray-800 hover:text-white">
                      at {recruiter.recruiter.name}
                    </h5>
                  </a>
                  <a onClick={() => navigate(`/vacancy/${vacancy.data?.id}`)}>
                    <p className="mb-3 font-normal text-gray-700 hover:text-gray-600 hover:underline hover:cursor-pointer">
                      {vacancy.data?.about}
                    </p>
                  </a>
                </div>
              </a>
            </div>
            :
            <div id="recruiterView" className="w-full ">
              <a onClick={() => navigate(`/recruiter/${applicant.applicant?.idDB}`)}
                className="flex items-center bg-white border border-gray-200 rounded-lg md:flex-row  
           shadow shadow-md w-full hover:cursor-pointer hover:borderd-double hover:border-white hover:bg-gray-800 hover:text-white ">

                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg "
                  alt="Company Logo"
                  src={applicant.applicant?.picture}
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="hover:cursor-pointer mb-2 text-2xl w-fit rounded-lg font-bold tracking-tight hover:bg-gray-800 hover:text-white">
                    {applicant.applicant.name}
                  </h5>
                  <p className="mb-3 font-normal">{applicant.applicant?.about}</p>
                </div>

              </a>
            </div>
          }
        </div>

        <div id="steps-container"
          className="flex flex-col items-center">
          {/* <StepTemplate title='Intro Interiew' link="zoom.meetings/room=as2u48/sdfbjy2" /> */}
          {/* <Landing /> */}
          {/* </div> */}
          {/* <div id="test-contianer"> */}
          {steps.length &&
            steps.map((step: Step) => {
              if (step.type.toLowerCase() === "sandbox") {
                return <><StepTemplate title={step.title?.length ? step.title : "Next step: Code!"} type="sandbox" content={<Landing />} /><div id="line" className="-mt-10 w-1 bg-gray-500 rounded-xl h-[100px] block relative"></div></>
              } else if (step.type.toLowerCase() === "videocall") {
                return <><span>{moment(new Date(step.date)).format('MMM DD, YYYY - hh:mm')}</span>
                  <StepTemplate title={step.title?.length ? step.title : "Next step: Videocall"} type="videocall" content={<Videocall step={step} />} /><div id="line" className="-mt-4 w-1 bg-gray-500 rounded-xl h-[100px] block relative"></div></>
              }

            })
          }
        </div>
        <div id="chat-wraper" className="z-40">
          <ChatWindow trackId={track.track?.id} />
        </div>
      </div >
    </div >

  );
};

export default TrackPage;
