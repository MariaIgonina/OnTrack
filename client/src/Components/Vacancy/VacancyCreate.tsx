import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVacancy } from "../../store/vacancySlice";
import type { Vacancy } from "../../Interfaces";
import type { AppDispatch, RootState } from "../../store/store";
import { initialVacancy } from "../../store/vacancySlice";
type VacancyCreateProps = {
  onCancel: () => void;
};
const VacancyCreate: React.FC<VacancyCreateProps> = ({ onCancel }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<Vacancy>({ ...initialVacancy });
  const currentUserID = useSelector((s: RootState) => s.currentUser.id);

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
      recruiterId: +currentUserID, // !important!
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
    console.log(newVacancy, "newVacancy");
    await dispatch(createVacancy(newVacancy));
    onCancel();
  };

  return (
    <div className="flex h-screen  items-center justify-center  mt-[220px] mb-32">
      <div className="grid bg-white rounded-lg shadow-xl w-11/12 md:0 lg:0">
        <div className="flex justify-center py-4">
          <div className="flex bg-purple-200 rounded-full md:p-4 p-2 border-2 border-purple-300">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              ></path>
            </svg>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex">
            <h1 className="text-gray-600 font-bold md:text-2xl text-xl">
              Create a new vacancy
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 mt-5 mx-7">
          <label
            htmlFor="title"
            className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
          >
            Title:
          </label>
          <input
            className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 mt-5 mx-7">
          <label
            htmlFor="about"
            className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
          >
            About:
          </label>
          <input
            className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            id="about"
            name="about"
            type="text"
            placeholder="About"
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 mt-5 mx-7">
          <label
            className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
            htmlFor="workingHours"
          >
            Working Hours:
          </label>
          <select
            className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            id="workingHours"
            name="workingHours"
            onChange={handleChange}
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
          </select>
        </div>

        <div className="grid grid-cols-1 mt-5 mx-7">
          <label
            className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
            htmlFor="workingModal"
          >
            Working Modal:
          </label>
          <select
            className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            id="workingModal"
            name="workingModal"
            onChange={handleChange}
          >
            <option value="hybrid">Hybrid</option>
            <option value="remote">Remote</option>
            <option value="on-site">On-site</option>
          </select>
        </div>

        <div className="grid grid-cols-1 mt-5 mx-7">
          <label
            htmlFor="skills"
            className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
          >
            Skills (comma-separated):
          </label>
          <input
            className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="text"
            id="skills"
            name="skills"
            onChange={handleChange}
            placeholder="skills"
            required
          />
        </div>
        <div className="grid grid-cols-1 mt-5 mx-7">
          <label
            htmlFor="stack"
            className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
          >
            Stack (comma-separated):
          </label>
          <input
            className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="text"
            id="stack"
            name="stack"
            onChange={handleChange}
            placeholder="stacks"
            required
          />
        </div>

        <div className="grid grid-cols-1 mt-5 mx-7">
          <label
            htmlFor="requiredLanguages"
            className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
          >
            Required Languages (comma-separated):
          </label>
          <input
            className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="text"
            id="requiredLanguages"
            name="requiredLanguages"
            onChange={handleChange}
            placeholder="languages"
            required
          />
        </div>
        <div className="grid grid-cols-1 mt-5 mx-7">
          <label
            htmlFor="experience"
            className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
          >
            Experience:
          </label>
          <input
            className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="number"
            id="experience"
            name="experience"
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid grid-cols-1 mt-5 mx-7">
          <label
            htmlFor="location"
            className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
          >
            Location:
          </label>
          <input
            className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="text"
            id="location"
            name="location"
            onChange={handleChange}
            placeholder="location"
            required
          />
        </div>
        <div className="grid grid-cols-1 mt-5 mx-7">
          <label
            htmlFor="salaryRange"
            className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
          >
            Salary Range:
          </label>
          <input
            className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="number"
            id="salaryRange"
            name="salaryRange"
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
          <button
            className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default VacancyCreate;
