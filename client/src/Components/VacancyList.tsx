import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import VacancyCreate from "./VacancyCreate";
import { fetchvacanciesByRecruiter } from "../store/vacancySlice";
import { Vacancy } from "../Interfaces";

const VacancyList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const vacancies = useSelector(
    (state: RootState) => state.vacancy.vacancies
  ) as unknown as Vacancy[];
  const vacancy: Vacancy = useSelector(
    (state: RootState) => state.vacancy.vacancy
  );
  const [isCreatingVacancy, setIsCreatingVacancy] = useState(false);
  useEffect(() => {
    dispatch(fetchvacanciesByRecruiter(1));
  }, [dispatch, vacancy]);

  const handleCreateVacancy = () => {
    setIsCreatingVacancy(true);
  };

  const handleCancelCreateVacancy = () => {
    setIsCreatingVacancy(false);
  };

  return (
    <div className="bg-stone-100 py-24 sm:py-32 rounded-lg m-4">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-[#026767] sm:text-4xl mb-8">
            Vacancy List
          </h2>
        </div>

        <div className="overflow-x-scroll flex flex-nowrap my-8">
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
                    <a className="relative z-10 ml-auto rounded-full bg-green-100 text-white px-3 py-1.5 font-medium text-gray-600">
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
        {isCreatingVacancy ? (
          <div>
            <VacancyCreate />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCancelCreateVacancy}
                className="px-4 py-2 font-medium text-red-600 border border-red-600 rounded-md focus:outline-none focus:ring"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleCreateVacancy}
            className="mt-4 px-4 py-2 font-medium text-indigo-600 border border-indigo-600 rounded-md focus:outline-none focus:ring"
          >
            +
          </button>
        )}
      </div>
    </div>
  );
};

export default VacancyList;
