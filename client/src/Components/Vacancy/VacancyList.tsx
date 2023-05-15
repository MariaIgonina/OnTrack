import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import VacancyCreate from "./VacancyCreate";
import { fetchvacanciesByRecruiter } from "../../store/vacancySlice";
import { Vacancy } from "../../Interfaces";
import Modal from "react-modal";
import VacancyCard from "./VacancyCard";

const VacancyList: React.FC = ({setVacanciesLength}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUserID = useSelector((s: RootState) => s.currentUser.id);

  const dispatch = useDispatch<AppDispatch>();
  const vacancies = useSelector(
    (state: RootState) => state.vacancy.vacancies
  ) as unknown as Vacancy[];
  const vacancy: Vacancy = useSelector(
    (state: RootState) => state.vacancy.vacancy
  );
  useEffect(() => {
    dispatch(fetchvacanciesByRecruiter(+currentUserID));
    console.log(currentUserID);
  }, [dispatch, vacancy, currentUserID]);

  setVacanciesLength(vacancies.length)

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-stone-100 py-1 sm:py-2 rounded-lg ">
      <div className="mx-auto max-w-7xl lg:px-2">
        <div className="mx-auto max-w-2xl lg:mx-0 flex-nowrap my-2 flex items-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#026767] mr-10">
            Active vacancies
          </h2>
          <div>
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Create Vacancy Modal"
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
              <VacancyCreate onCancel={closeModal} />
            </Modal>

            <button
              onClick={openModal}
              className="w-auto bg-orange-100 hover:bg-orange-400 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              +
            </button>
          </div>
        </div>

        <div className="overflow-x-scroll flex list-none flex-nowrap my-2">
          {vacancies.length ? (
            vacancies.map((vacancy) => (
              <VacancyCard vacancy={vacancy} key={vacancy.id} />
            ))
          ) : (
            <li>
              <p className="p-4 text-gray-500">No vacancies yet</p>
            </li>
          )}
        </div>
      </div>
    </div>
  );
};

export default VacancyList;
