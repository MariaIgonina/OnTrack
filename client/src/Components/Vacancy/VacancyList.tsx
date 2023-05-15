import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import VacancyCreate from "./VacancyCreate";
import {
  fetchvacanciesByRecruiter,
  filteredVacancies,
} from "../../store/vacancySlice";
import { Vacancy } from "../../Interfaces";
import Modal from "react-modal";
import VacancyCard from "./VacancyCard";
import FilterForm from "./FilterForm";

const VacancyList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const currentUserID = useSelector((s: RootState) => s.currentUser.id);

  const vacancy: Vacancy = useSelector(
    (state: RootState) => state.vacancy.vacancy
  );
  const vacancies = useSelector(
    (state: RootState) => state.vacancy.vacancies
  ) as unknown as Vacancy[];
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (currentUserID) {
      dispatch(fetchvacanciesByRecruiter(+currentUserID));
    }
    console.log(currentUserID);
  }, [dispatch, vacancy, currentUserID]);

  useEffect(() => {
    dispatch(filteredVacancies(filters));
  }, [dispatch, filters]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFilterSubmit = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="bg-stone-100 py-1 sm:py-2 rounded-lg ">
      <div className="mx-auto max-w-7xl lg:px-2">
        <div className="mx-auto max-w-2xl lg:mx-0 flex-nowrap my-2 flex items-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#026767] mr-10">
            Active job offers
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
        <div>
          <FilterForm onFilterSubmit={handleFilterSubmit} />
          <div className="overflow-x-scroll flex flex-nowrap my-2">
            {vacancies.length ? (
              vacancies.map((vacancy) => (
                <VacancyCard vacancy={vacancy} key={vacancy.id} />
              ))
            ) : (
              <li>
                <p className="p-4 text-gray-500">No vacancies found.</p>
              </li>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacancyList;
