import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { createVacancy } from "../store/vacancySlice";
import type { Vacancy } from "../Interfaces";
import type { AppDispatch } from "../store/store";
import { initialVacancy } from "../store/vacancySlice";

const VacancyCreate: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<Vacancy>({ ...initialVacancy });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newVacancy: Vacancy = {
      ...formData,
      recruiterId: 1, // !important!
      experience: parseInt(formData.experience as any, 10),
      salaryRange: parseInt(formData.salaryRange as any, 10),
      skills:
        typeof formData.skills === "string"
          ? (formData.skills as string).split(",")
          : formData.skills,
      stack:
        typeof formData.stack === "string"
          ? (formData.stack as string).split(",")
          : formData.stack,
      requiredLanguages:
        typeof formData.requiredLanguages === "string"
          ? (formData.requiredLanguages as string).split(",")
          : formData.requiredLanguages,
    };
    await dispatch(createVacancy(newVacancy));
  };

  return (
    <div>
      <h2>Create a new vacancy</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={handleChange}
        />
        <label htmlFor="about">About:</label>
        <textarea id="about" name="about" required onChange={handleChange} />

        <label htmlFor="workingHours">Working Hours:</label>
        <select id="workingHours" name="workingHours" onChange={handleChange}>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
        </select>

        <label htmlFor="workingModal">Working Modal:</label>
        <select id="workingModal" name="workingModal" onChange={handleChange}>
          <option value="hybrid">Hybrid</option>
          <option value="remote">Remote</option>
          <option value="on-site">On-site</option>
        </select>

        <label htmlFor="skills">Skills (comma-separated):</label>
        <input type="text" id="skills" name="skills" onChange={handleChange} />

        <label htmlFor="stack">Stack (comma-separated):</label>
        <input type="text" id="stack" name="stack" onChange={handleChange} />

        <label htmlFor="requiredLanguages">
          Required Languages (comma-separated):
        </label>
        <input
          type="text"
          id="requiredLanguages"
          name="requiredLanguages"
          onChange={handleChange}
        />

        <label htmlFor="experience">Experience:</label>
        <input
          type="number"
          id="experience"
          name="experience"
          onChange={handleChange}
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          required
          onChange={handleChange}
        />

        <label htmlFor="salaryRange">Salary Range:</label>
        <input
          type="number"
          id="salaryRange"
          name="salaryRange"
          onChange={handleChange}
        />

        <button type="submit">Create Vacancy</button>
      </form>
    </div>
  );
};

export default VacancyCreate;
