import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { filteredVacancies } from "../../store/vacancySlice";
import { Vacancy } from "../../Interfaces";
import VacancyCard from "./VacancyCard";
import FilterForm from "./FilterForm";

interface FilteredVacanciesProps {
  initialFilters?: any;
}

const FilteredVacancies: React.FC<FilteredVacanciesProps> = ({
  initialFilters = {},
}) => {
  const [filters, setFilters] = useState<any>(initialFilters);
  const vacancies = useSelector(
    (state: RootState) => state.vacancy.vacancies
  ) as unknown as Vacancy[];

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(filteredVacancies(filters));
  }, [dispatch, filters]);

  const handleFilterSubmit = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
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
  );
};

export default FilteredVacancies;
