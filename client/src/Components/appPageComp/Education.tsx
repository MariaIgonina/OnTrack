import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  fetchEducationByApplicant,
  setEducation,
} from "../../store/educationSlice";
import { Applicant, Education } from "../../Interfaces";
import moment from "moment";
import SchoolIcon from "@mui/icons-material/School";

const EducationComp = ({ applicant }: { applicant: Applicant }) => {
  const educations = useSelector(
    (s: RootState) => s.education.education
  ) as unknown as Education[];
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchEducationByApplicant(applicant.idDB));
  }, []);

  return (
    <>
      <div className="flex-shrink-0 flex-grow flex-col flex rounded-2xl shadow-md bg-white p-3 m-1 ml-3">
        <div className="flex flex-row ">
          <SchoolIcon
            fontSize="small"
            style={{ color: "#026767" }}
            className="mr-2"
          ></SchoolIcon>
          <h2 className="text-lg font-semibold leading-6 text-[#026767] text-base">
            Education
          </h2>
        </div>

        <ul>
          {Array.isArray(educations) &&
            educations.map((edu) => {
              return (
                <li key={edu.id}>
                  <h3 className=" font-semibold leading-2 ">{edu.place}</h3>
                  <h4>{edu.degree}</h4>
                  <h4>{edu.speciality}</h4>
                  <p>{`${moment(edu.startDate).format("MMM YYYY")} - ${moment(
                    edu.endDate
                  ).format("MMM YYYY")}`}</p>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default EducationComp;
