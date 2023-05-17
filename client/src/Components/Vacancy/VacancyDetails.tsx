import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "../Popup";
import { fetchVacancy, deleteVacancy } from "../../store/vacancySlice";
import type { RootState, AppDispatch } from "../../store/store";
import { Vacancy } from "../../Interfaces";
import VacancyUpdate from "./VacancyUpdate";
import Modal from "react-modal";
import { duplicateTrack } from "../../store/trackSlice";

const VacancyDetails: React.FC = () => {
  const [isPopUp, setIsPopUp] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const vacancy: Vacancy = useSelector(
    (state: RootState) => state.vacancy.vacancy
  );
  const { vacancyId } = useParams<{ vacancyId: any }>();
  const currentUserRole = useSelector((s: RootState) => s.currentUser.role);
  const currentUserId = useSelector((s: RootState) => s.currentUser.id);

  useEffect(() => {
    dispatch(fetchVacancy(parseInt(vacancyId, 10)));
  }, [dispatch, vacancyId, currentUserRole]);

  const handleDelete = () => {
    setIsPopUp(true);
  };

  const deleteVac = async () => {
    if (window.confirm("Are you sure you want to delete this vacancy?")) {
      console.log("this should work");
      dispatch(deleteVacancy(parseInt(vacancyId, 10)))
        .unwrap()
        .then(() => {
          navigate("/recruiterProfile");
        })
        .catch((error) => {
          console.error("Error deleting vacancy:", error);
        });
    }
  };

  const applySubmit = async () => {
    if (window.confirm("Are you sure you want to apply to this vacancy?")) {
      const { id, recruiterId } = vacancy.data;
      const newTrack = {
        recruiterID: recruiterId,
        vacancyId: id,
        applicantID: currentUserId,
      };

      const TRACKID = await dispatch(duplicateTrack(newTrack));
      console.log("trackID fetched at vacancy details 49", TRACKID);
      navigate(`/track/?trackId=${TRACKID.payload}&vacancyId=${vacancyId}`);
    }
    //post track (form 1)
    // fetch del
    //post questionnary (form 2)
  };
  const { data } = vacancy;
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {vacancy && (
        <>
          <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-4xl bg-white w-full rounded-lg shadow-xl relative">
              {" "}
              {/* Add relative class here */}
              {currentUserRole === "recruiter" && (
                <>
                  <button
                    onClick={deleteVac}
                    // onClick={handleDelete}
                    className="absolute top-4 right-4 w-[70px] h-[50px] font-medium bg-white text-black border-2 border-black rounded-md focus:outline-none focus:ring"
                  >
                    Delete
                  </button>
                  <button
                    onClick={openModal}
                    className="absolute top-4 right-16 mr-10 w-[50px] h-[50px] font-medium bg-white text-black border-2 border-black rounded-md focus:outline-none focus:ring"
                  >
                    Edit
                  </button>
                </>
              )}
              {currentUserRole === "applicant" && (
                <button
                  className="absolute top-4 right-12 w-[70px] h-[50px] font-medium bg-white text-black border-2 border-black rounded-md focus:outline-none focus:ring"
                  onClick={applySubmit}
                >
                  Apply
                </button>
              )}
              <div className="p-4 border-b">
                <h2 className="text-2xl ">Vacancy Information</h2>
                <p className="text-sm text-gray-500">Details and everything.</p>
              </div>
              <div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                  <p className="text-gray-600">Vacancy for</p>
                  <p>{vacancy?.data?.title}</p>
                </div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                  <p className="text-gray-600">Stacks required</p>
                  <p>{vacancy?.data?.stack}</p>
                </div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                  <p className="text-gray-600">Skills required</p>
                  <p>{vacancy?.data?.skills}</p>
                </div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                  <p className="text-gray-600">Salary</p>
                  <p>{vacancy?.data?.salaryRange}</p>
                </div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                  <p className="text-gray-600">About</p>
                  <p>{vacancy?.data?.about}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
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
        <VacancyUpdate onCancel={closeModal} />
      </Modal>
      {/* {isPopUp && (
        <Popup
          setOpenModal={setIsPopUp}
          id={+vacancyId}
          handleDelete={deleteVac}
        ></Popup>
      )} */}
    </>
  );
};

export default VacancyDetails;
