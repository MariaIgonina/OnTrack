import React, { useState } from "react";
import UserCard from "../Components/UserCard";
import SearchApplicantForm from "./SearchApplicantForm/SearchApplicantForm";

const FilteredApplicants = () => {
  const [filteredApplicants, setFilteredApplicants] = useState([]);

  return (
    <div className="flex flex row m-4">
      <SearchApplicantForm setFilteredApplicants={setFilteredApplicants} />
      <div className="overflow-y-scroll flex flex-nowrap my-2">
        {filteredApplicants.length ? (
          filteredApplicants.map((applicant) => (
            <UserCard applicant={applicant} key={applicant.idDB}></UserCard>
          ))
        ) : (
          <li className="list-none">
            <p className="p-4 text-gray-500">
              Search for the perfect applicant
            </p>
          </li>
        )}
      </div>
    </div>
  );
};

export default FilteredApplicants;
