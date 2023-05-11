import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

import {
  fetchRecruiter,
  setRecruiter,
  createRecruiter,
} from "../store/recruiterSlice";
import { Recruiter } from "../Interfaces";
import { initialRecruiter } from "../store/recruiterSlice";

const CompanyPage = () => {
  const recruiter = useSelector((state: RootState) => state.recruiter);
  const dispatch = useDispatch<AppDispatch>();
  const codeParam = window.location.pathname.split("/").reverse()[0];

  useEffect(() => {
    dispatch(setRecruiter(recruiter));
    dispatch(fetchRecruiter(+codeParam!));
  }, [dispatch]);

  const [formData, setFormData] = useState(initialRecruiter);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    const newRecruiter: Recruiter = {
      ...formData,
      id: formData.id,
      name: formData.name,
      vacancies: formData.vacancies,
      logo: formData.logo,
      founded: formData.founded,
      about: formData.about,
      externalLinks: formData.externalLinks,
      headOffice: formData.headOffice,
      track: formData.track,
    };
    console.log(newRecruiter);
    dispatch(createRecruiter(newRecruiter));
  };

  return (
    <>
      <div>
        {JSON.stringify(recruiter)}

        <form className="formStyle" onSubmit={handleSubmit}>
          <h2>Create a recruiter account</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="logo">Logo</label>
            <input
              type="text"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              required
            />
            <label htmlFor="founded">Founded</label>
            <input
              type="text"
              name="founded"
              value={formData.founded}
              onChange={handleChange}
              required
            />

            <label htmlFor="about">About</label>
            <input
              type="text"
              name="about"
              value={formData.about}
              onChange={handleChange}
              required
            />

            <label htmlFor="headOffice">Head office</label>
            <input
              type="text"
              name="headOffice"
              value={formData.headOffice}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Create Recruiter</button>
        </form>
      </div>
    </>
  );
};

export default CompanyPage;
