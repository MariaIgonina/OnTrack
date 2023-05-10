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

  useEffect(() => {
    dispatch(setRecruiter(recruiter));
    dispatch(fetchRecruiter(1));
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

  const handleCreateRecruiter  = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newRecruiter: Recruiter = {
      ...formData,
      id: formData.id,
      emailstring: formData.emailstring, //DELETE THIS ONCE THE LOGIN WORKS!!!!
      recruiterName: formData.recruiterName,
      name: formData.name,
      vacancies: formData.vacancies,
      logo: formData.logo,
      founded: formData.founded,
      about: formData.about,
      externalLinks: externalLinks,
      headOffice: formData.headOffice,
      track: formData.track,
    };
    console.log("HERE", newRecruiter);
    dispatch(createRecruiter(newRecruiter));
  };

  //ExternalLinks media collecting
  const [externalLink, setExternalLink] = useState("");
  const [externalLinks, setExternalLinks] = useState([]);

  const handleExtLinkChange = (event: any) => {
    setExternalLink(event.target.value);
  };

  const handleAddLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setExternalLinks([...externalLinks, externalLink]);
    setExternalLink("");
  };

  return (
    <>
      <div>
        {JSON.stringify(recruiter)}

        <form className="formStyle">
          <h2>Create a recruiter account</h2>
          <div className="form-group">
            <label htmlFor="name">Company Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="recruiterName">Recruiter Name</label>
            <input
              type="text"
              name="recruiterName"
              value={formData.recruiterName}
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

            <label htmlFor="emailstring"> DELETE THIS ONCE LOGIN WORKS : Email </label>
            <input
              type="text"
              name="emailstring"
              value={formData.emailstring}
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

            <label htmlFor="externalLinks">External Links</label>
            <div>
              <input
                type="text"
                name="externalLinks"
                value={externalLink}
                onChange={handleExtLinkChange}
              />

              <button onClick={handleAddLink}>Add more</button>

              <ul>
                {externalLinks.map((link, index) => (
                  <li key={index}>{link}</li>
                ))}
              </ul>
            </div>
          </div>

          <button onClick={handleCreateRecruiter }>Create Recruiter</button>
        </form>
      </div>
    </>
  );
};

export default CompanyPage;
