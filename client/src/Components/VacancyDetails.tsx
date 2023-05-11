import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchVacancy, selectvacancy } from "../store/vacancySlice";
import type { RootState, AppDispatch } from "../store/store";
import { Vacancy } from "../Interfaces";

const VacancyDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const vacancy: Vacancy = useSelector(
    (state: RootState) => state.vacancy.vacancy
  );
  const { vacancyId } = useParams<{ vacancyId: any }>();

  useEffect(() => {
    dispatch(fetchVacancy(parseInt(vacancyId, 10)));
  }, [dispatch, vacancyId]);
  const { data } = vacancy;
  return (
    <>
      {/* <div>{vacancy && <h1>{JSON.stringify(vacancy)}</h1>}</div>; */}
      {vacancy && (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
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
      )}
    </>
  );
};

export default VacancyDetails;
