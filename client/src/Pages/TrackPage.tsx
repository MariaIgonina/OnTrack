import React, { FormEvent, useCallback, useEffect, useState } from "react";
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
import DeleteTrackModal from "../Components/tracks/StopTrackingModal";
import ChatWindow from "../Components/liveChat/ChatWindow";
import Videocall from "../Components/steps/Videocall";
import moment from "moment";
import Spinner from "../Components/Spinner";
import QuestionnaryForm from "../Components/Accordion/QuestionnaryForm";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { updateSandbox } from "../store/SandboxSlice";
import { updateQuestionary } from "../store/QuestionarySlice";
import { updateVideocall } from "../store/VideoCallSlice";
import OfferProposal from '../Components/tracks/OfferProposalModal';
import Offer from "../Components/steps/Offer";


type Step = {
  type: string;
  id: number | string;
  title?: string;
  order?: number | string;
  date: string;
  code?: string;
  checkIsAble: boolean;
};

const TrackPage = () => {
  const [gotInfo, setGotInfo] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [stopTrackingModal, setStopTrackingModal] = useState<boolean>(false);
  const [steps, setSteps] = useState<any>([
    { type: "", id: "", title: "", order: 0, step: "" },
  ]);
  const [editDate, setEditDate] = useState(false);
  const [temporaryDate, setTemporaryDate] = useState('');
  const [proposalModal, setProposalModal] = useState(false);
  const [offer, setOffer] = useState(false)
  const [offerDone, setOfferDone] = useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.currentUser);
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
    getInfo();
    // checkForSteps(); // If things go wrong uncomment this
  }, [track.track?.recruiterID]);


  const getInfo = useCallback(() => {
    try {
      if (!track.track?.Message?.length) throw new Error("No info yet");
    } catch (error: any) {
      let num = gotInfo + 1;
      setGotInfo(num);
    }
    // checkForSteps(); // If things go wrong uncomment this too
  }, [gotInfo]);

  useEffect(() => {
    if (steps.length) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, []);

  const checkForSteps = () => {
    let fetchedSteps: any = [];
    if (track.track?.CodeSandbox) {
      track.track?.CodeSandbox.forEach((element) => {
        fetchedSteps.push(element);
      });
    }
    if (track.track?.Videocall) {
      track.track?.Videocall.forEach((element) => {
        fetchedSteps.push(element);
      });
    }
    if (track.track?.Questionaries) {
      track.track?.Questionaries.forEach((element) => {
        fetchedSteps.push(element);
      });
    }


    let thereIsAnOffer = fetchedSteps.filter((x: any) => x.type.toLowerCase() === 'offer').length;
    setOfferDone(thereIsAnOffer);

    fetchedSteps.sort((a: any, b: any) => new Date(a.date) - new Date(b.date))
    fetchedSteps.sort((a: any, b: any) => a.order - b.order)


    console.log("all steps => ", fetchedSteps);
    setSteps([...fetchedSteps]);
  };

  const handleEditDate = () => {
    setEditDate(true);
  };

  const saveDate = (event: FormEvent<HTMLFormElement>, step: any) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget);
    const pickedDate = formData.get(`${step.type}-${step.id}`); //

    switch (step.type.toLowerCase()) {
      case "sandbox":
        dispatch(
          updateSandbox({
            sandboxId: step.id,
            sandbox: { date: new Date(pickedDate) },
          })
        );
        break;
      case "questionary":
        dispatch(
          updateQuestionary({
            questionaryId: step.id,
            questionary: { date: new Date(pickedDate) },
          })
        );
        break;
      case "videocall":
        dispatch(
          updateVideocall({
            videocallId: step.id,
            videocall: { date: new Date(pickedDate) },
          })
        );
        break;
      default:
        null;
        break;
    }


    setEditDate(false)
    setTemporaryDate(moment(new Date(pickedDate)).format('MMM DD, YYYY - HH:mm'));
    window.location.reload();
    window.location.reload();
  };

  const focusSaveButton = (event: FormEvent<HTMLFormElement>) => {
    const input = document.querySelector(`#${event.target.id}`)
    const button = document.querySelector(`#button-${event.target.id}`)
    if (input) {
      input.classList.add('border')
      input.classList.add('border-rose-500')
      input.classList.add('border-2')
      button?.classList.add('text-rose-500')
    }
  }

  // if (currentUser.currentUser.role === 'applicant' && currentUser.currentUser.id !== applicant.applicant.id)
  return (
    <div
      id="track-container"
      className="flex h-full top-[70px] w-[100%] min-w-[600px] bg-gray-100"
    >
      {stopTrackingModal && (
        <DeleteTrackModal
          isOpen={true}
          setOpen={setStopTrackingModal}
          trackId={track.track?.id!}
        />
      )}

      {proposalModal && (
        <OfferProposal
          isOpen={true}
          setOpen={setProposalModal}
          trackId={track.track?.id!}
          setOffer={setOffer}
        />
      )}

      {isLoading && (
        <div
          className="w-screen  h-screen z-50 flex flex-col justify-center items-center bg-opacity-90 bg-neutral-800 
          text-white absolute top-0 left-0 "
        >
          <Spinner />
          <p className="mt-8">Loading...</p>
        </div>
      )}
      <div className="w-[226px] min-w-[226px] h-[90%] hidden relative sm:block md:block lg:block">
        <TrackSideBar
          trackId={track.track?.id!}
          role={currentUser.role!}
          setStopTrackingModal={setStopTrackingModal}
          setProposalModal={setProposalModal}
          offerDone={offerDone}
        />
      </div>

      <div className="w-full min-w-[400px] ml-3">
        <div id="Info" className="mb-10 ">
          <a onClick={() => navigate(`/vacancy/${vacancy.data?.id}`)}>
            <h2 className="text-3xl font-extrabold my-2 hover:text-stone-100 hover:bg-gray-800 rounded-lg hover:cursor-pointer w-fit">
              {vacancy.data?.title}
            </h2>
          </a>
          {currentUser.role! === "applicant" ? (
            <div id="applicantView" className="w-full hover:bg-gray-800 ">
              <a
                className="flex items-center bg-white border border-gray-200 rounded-lg md:flex-row px-3
           shadow shadow-md w-full"
              >
                <a
                  onClick={() =>
                    navigate(`/recruiter/${recruiter.recruiter?.id}`)
                  }
                >
                  <img
                    className="object-contain w-20 h-20 rounded-full hover:cursor-pointer shadow-md bg-gray-50"
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
                      {recruiter.recruiter?.name &&
                        `at ${recruiter.recruiter?.name}`}
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
          ) : (
            <div id="recruiterView" className="w-full ">
              <a
                onClick={() =>
                  navigate(`/applicant/${applicant.applicant?.idDB}`)
                }
                className="flex items-center bg-white border border-gray-200 rounded-lg md:flex-row  
           shadow shadow-md w-full hover:cursor-pointer hover:borderd-double hover:border-white hover:bg-gray-800 hover:text-white "
              >
                <img
                  className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg "
                  alt="User"
                  src={applicant.applicant?.picture}
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="hover:cursor-pointer mb-2 text-2xl w-fit rounded-lg font-bold tracking-tight hover:bg-gray-800 hover:text-white">
                    {applicant.applicant.name}
                  </h5>
                  <p className="mb-3 font-normal">
                    {applicant.applicant?.about}
                  </p>
                </div>
              </a>
            </div>
          )}
        </div>

        <div id="steps-container" className="flex flex-col items-center">
          {steps.length &&
            steps.map((step: Step) => {
              if (step.type.toLowerCase() === "sandbox") {
                return <>
                  {!editDate
                    ? <span id={`step-${step.id}-date`} className={`${step.date ? 'text-gray-400' : 'text-gray-200'} uppercase tracking-widest font-bold`}>
                      {step.date ? moment(new Date(step.date)).format('MMM DD, YYYY - HH:mm') : temporaryDate.length ? temporaryDate : 'edit date'}
                      <button className="ml-5 relative bottom-1 hover:text-neutral-500 text-gray-300" onClick={handleEditDate}>
                        <EditIcon />
                      </button>
                    </span>
                    : <form onSubmit={(e) => saveDate(e, step)} onBlur={(e) => focusSaveButton(e)}><input id={`${step.type}-${step.id}`} name={`${step.type}-${step.id}`} type="datetime-local" min={`${new Date().toISOString().slice(0, 16)}`} className="text-gray-500 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-100 focus:border-green-100"
                    /><button id={`button-${step.type}-${step.id}`} type="submit" className="ml-1 relative text-gray-400 hover:text-emerald-400"><AddCircleIcon />{editDate && 'Save?'}</button></form>
                  }
                  <StepTemplate step={step} title={step.title?.length ? step.title : "Code Exercise"} type="sandbox" checkIsAble={step.date ? new Date(step.date).getTime() < new Date().getTime() : true}
                    content={<Landing savedCode={step.code! || ''} step={step} />} />
                  <div id="line" className="-mt-10 w-1 bg-gray-300 rounded-xl h-[100px] block relative"></div>
                </>
              } else if (step.type.toLowerCase() === "videocall") {
                return <>
                  {!editDate
                    ? <span id={`step-${step.id}-date`} className={`${step.date ? 'text-gray-400' : 'text-gray-200'} uppercase tracking-widest font-bold`}>
                      {step.date ? moment(new Date(step.date)).format('MMM DD, YYYY - HH:mm') : temporaryDate.length ? temporaryDate : 'edit date'}
                      <button className="ml-5 relative bottom-1 hover:text-neutral-500 text-gray-300" onClick={handleEditDate}>
                        <EditIcon />
                      </button>
                    </span>
                    : <form onSubmit={(e) => saveDate(e, step)} onBlur={(e) => focusSaveButton(e)}><input id={`${step.type}-${step.id}`} name={`${step.type}-${step.id}`} type="datetime-local" min={`${new Date().toISOString().slice(0, 16)}`} className="text-gray-500 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-100 focus:border-green-100"
                    /><button id={`button-${step.type}-${step.id}`} type="submit" className="ml-1 relative text-gray-400 hover:text-emerald-400"><AddCircleIcon />{editDate && 'Save?'}</button></form>
                  }
                  <StepTemplate step={step} title={step.title?.length ? step.title : "Videocall"} type="videocall" checkIsAble={step.date ? new Date(step.date).getTime() < new Date().getTime() : true}
                    content={<Videocall step={step} />} /><div id="line" className="-mt-4 w-1 bg-gray-300 rounded-xl h-[100px] block relative"></div></>
              } else if (step.type.toLowerCase() === 'questionary') {
                return <>
                  {!editDate
                    ? <span id={`step-${step.id}-date`} className={`${step.date ? 'text-gray-400' : 'text-gray-200'} uppercase tracking-widest font-bold`}>
                      {step.date ? moment(new Date(step.date)).format('MMM DD, YYYY - HH:mm') : temporaryDate.length ? temporaryDate : 'edit date'}
                      <button id={`button-${step.type}-${step.id}`} className="ml-5 relative bottom-1 hover:text-neutral-500 text-gray-300" onClick={handleEditDate}>
                        <EditIcon />
                      </button>
                    </span>
                    : <form onSubmit={(e) => saveDate(e, step)} onBlur={(e) => focusSaveButton(e)}><input id={`${step.type}-${step.id}`} name={`${step.type}-${step.id}`} type="datetime-local" min={`${new Date().toISOString().slice(0, 16)}`} className="text-gray-500 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-100 focus:border-green-100"
                    /><button id={`button-${step.type}-${step.id}`} type="submit" className="ml-1 relative text-neutral-400 hover:text-emerald-400"><AddCircleIcon />{editDate && ' Save?'}</button></form>
                  }
                  <StepTemplate step={step} title={step.title?.length ? step.title : "Questionary"} type="questionary" checkIsAble={step.date ? new Date(step.date).getTime() < new Date().getTime() : true}
                    content={<QuestionnaryForm step={step} />} /><div id="line" className="-mt-10 w-1 bg-gray-300 rounded-xl h-[100px] block relative"></div></>
              } else if (step.type.toLowerCase() === 'offer') {
                return <>
                  <Offer />
                  <div id="line" className="-mt-4 w-1 bg-gray-300 rounded-xl h-[100px] block relative"></div>
                </>
              }
            })}
        </div>
        <div id="chat-wraper">
          <ChatWindow trackId={track.track?.id!} />
        </div>
      </div>
    </div>
  );
};

export default TrackPage;
