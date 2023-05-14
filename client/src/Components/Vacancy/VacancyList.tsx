import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import VacancyCreate from "./VacancyCreate";
import { fetchvacanciesByRecruiter } from "../../store/vacancySlice";
import { Vacancy } from "../../Interfaces";
import Modal from "react-modal";

const VacancyList: React.FC = () => {
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
  }, [dispatch, vacancy]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-stone-100 py-1 sm:py-2 rounded-lg ">
      <div className="mx-auto max-w-7xl lg:px-2">
        <div className="mx-auto max-w-2xl lg:mx-0 flex-nowrap my-2 flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#026767] sm:text-4xl mb-2">
            Active job offers:
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
              className="mt-4 px-4 py-2 font-medium text-black border-2 border-black rounded-md focus:outline-none focus:ring"
            >
              +
            </button>
          </div>
        </div>

        <div className="overflow-x-scroll flex flex-nowrap my-2">
          {vacancies.length ? (
            vacancies.map((vacancy) => (
              <article
                key={vacancy.id}
                className="flex-shrink-0 flex-col flex rounded-2xl shadow-md bg-white p-3 m-5"
                style={{ minWidth: "300px" }}
              >
                <Link to={`/vacancy/${vacancy.id}`}>
                  <div className="flex items-center gap-x-4 text-xs">
                    <time className="text-gray-500">{vacancy.location}</time>
                    <a className="relative ml-auto rounded-full bg-green-100 text-white px-3 py-1.5 font-medium text-gray-600">
                      Salary: {vacancy.salaryRange}
                    </a>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a>
                        <span className="absolute inset-0" />
                        {vacancy.title}
                      </a>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      {vacancy.about}
                    </p>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      {vacancy.stack}
                    </p>
                  </div>
                </Link>
              </article>
            ))
          ) : (
            <li>
              <p className="p-4 text-gray-500">No vacancies found.</p>
            </li>
          )}
        </div>
      </div>
    </div>
  );
};

export default VacancyList;
