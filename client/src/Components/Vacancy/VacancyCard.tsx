import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Vacancy } from "../../Interfaces";

export default function VacancyCard({ vacancy }: any) {
  return (
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
  );
}
