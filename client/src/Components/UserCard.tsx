import React from "react";
import { Applicant } from "../Interfaces";
import { Link } from "react-router-dom";

interface UserCardProps {
  applicant: Applicant;
}

export default function UserCard({ applicant }: UserCardProps) {
  const stackarr = applicant
    .stack!.map((word, index) => {
      if (index === applicant.stack!.length - 1) {
        return word;
      } else {
        return word + ", ";
      }
    })
    .join("");

  const id = applicant.idDB;

  return (
    <article
      key={applicant.idAuth}
      className="flex-shrink-0 flex-col flex rounded-2xl shadow-md bg-white p-3 m-5 "
      style={{
        minWidth: "300px",
        height: "300px",
        width: "400px",
        pointerEvents: "none",
      }}
    >
      <div className="flex items-center gap-x-4 text-xs">
        <time className="text-gray-500">{applicant.location}</time>
        <a
          href={applicant.workingHours}
          className="relative z-10 ml-auto rounded-full bg-green-100 text-white px-3 py-1.5 font-medium text-gray-600"
        >
          Looking for {applicant.workingHours}
        </a>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <a href={applicant.name}>
            <span className="absolute inset-0" />
            {applicant.name}
          </a>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {applicant.about}
        </p>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          Stack: {stackarr}
        </p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <img
          src={applicant.picture}
          alt=""
          className="h-10 w-10 rounded-full bg-gray-50"
        />
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <a href={applicant.email}>
              <span className="absolute inset-0" />
              {applicant.email}
            </a>
          </p>
          <p className="text-gray-600">{applicant.phone}</p>
        </div>
      </div>
    </article>
  );
}
