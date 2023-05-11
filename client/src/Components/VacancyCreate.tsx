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
    <div className="container mx-auto px-4" style={{ maxWidth: "800px" }}>
      <div className="flex flex-col items-center mx-auto">
        <h2
          className="text-center mb-4 font-bold text-2xl"
          style={{ color: "#016667" }}
        >
          Create a new vacancy
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-3"
        >
          <label
            htmlFor="title"
            className="block text-xs font-medium"
            style={{ color: "#016667" }}
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          />
          <label
            htmlFor="about"
            className="block text-xs font-medium "
            style={{ color: "#016667" }}
          >
            About:
          </label>
          <textarea
            id="about"
            name="about"
            required
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          />

          <label
            htmlFor="workingHours"
            className="block text-xs font-medium "
            style={{ color: "#016667" }}
          >
            Working Hours:
          </label>
          <select
            id="workingHours"
            name="workingHours"
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
          </select>

          <label
            htmlFor="workingModal"
            className="block text-xs font-medium "
            style={{ color: "#016667" }}
          >
            Working Modal:
          </label>
          <select
            id="workingModal"
            name="workingModal"
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          >
            <option value="hybrid">Hybrid</option>
            <option value="remote">Remote</option>
            <option value="on-site">On-site</option>
          </select>

          <label
            htmlFor="skills"
            className="block text-xs font-medium "
            style={{ color: "#016667" }}
          >
            Skills (comma-separated):
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          />

          <label
            htmlFor="stack"
            className="block text-xs font-medium "
            style={{ color: "#016667" }}
          >
            Stack (comma-separated):
          </label>
          <input
            type="text"
            id="stack"
            name="stack"
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          />

          <label
            htmlFor="requiredLanguages"
            className="block text-xs font-medium "
            style={{ color: "#016667" }}
          >
            Required Languages (comma-separated):
          </label>
          <input
            type="text"
            id="requiredLanguages"
            name="requiredLanguages"
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          />

          <label
            htmlFor="experience"
            className="block text-xs font-medium "
            style={{ color: "#016667" }}
          >
            Experience:
          </label>
          <input
            type="number"
            id="experience"
            name="experience"
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          />

          <label
            htmlFor="location"
            className="block text-xs font-medium "
            style={{ color: "#016667" }}
          >
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            required
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          />

          <label
            htmlFor="salaryRange"
            className="block text-xs font-medium "
            style={{ color: "#016667" }}
          >
            Salary Range:
          </label>
          <input
            type="number"
            id="salaryRange"
            name="salaryRange"
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          />

          <button
            type="submit"
            className="group relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 mt-4 focus:outline-none focus:ring"
          >
            <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>
            <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
              Create Vacancy
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default VacancyCreate;
