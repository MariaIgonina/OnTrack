import React, { useState } from "react";

interface FilterFormProps {
  onFilterSubmit: (filters: any) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ onFilterSubmit }) => {
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [stack, setStack] = useState("");
  const [requiredLanguages, setRequiredLanguages] = useState("");
  const [experience, setExperience] = useState("");
  const [salaryRange, setSalaryRange] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterSubmit({
      location,
      title,
      skills: skills.split(",").map((skill) => skill.trim()),
      stack: stack.split(",").map((st) => st.trim()),
      requiredLanguages: requiredLanguages
        .split(",")
        .map((lang) => lang.trim()),
      experience: experience ? parseInt(experience) : null,
      salaryRange: salaryRange ? parseInt(salaryRange) : null,
    });
    setLocation("");
    setTitle("");
    setSkills("");
    setStack("");
    setRequiredLanguages("");
    setExperience("");
    setSalaryRange("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 p-4 mb-4">
      <div className="flex flex-col space-x-2" style={{ width: "400px" }}>
        <div className="flex justify-between items-center">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
            Location:
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-100 h-8 py-1 px-3 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent ml-2"
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
            Title:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-100 h-8 py-1 px-3 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent ml-2"
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
            Skills (comma-separated):
          </label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-100 h-8 py-1 px-3 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent ml-2"
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
            Stack:
          </label>
          <input
            type="text"
            value={stack}
            onChange={(e) => setStack(e.target.value)}
            className="w-100 h-8 py-1 px-3 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent ml-2"
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
            Required Languages:
          </label>
          <input
            type="text"
            value={requiredLanguages}
            onChange={(e) => setRequiredLanguages(e.target.value)}
            className="w-100 h-8 py-1 px-3 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent ml-2"
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
            Experience:
          </label>
          <input
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-100 h-8 py-1 px-3 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent ml-2"
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
            Salary Range:
          </label>
          <input
            type="text"
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
            className="w-100 h-8 py-1 px-3 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent ml-2"
          />
        </div>
        <div className="mt-6 flex justify-center ">
          <button
            type="submit"
            className="w-auto bg-orange-100 hover:bg-orange-dark rounded-lg shadow-xl font-medium text-white px-4 py-2"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={() =>
              onFilterSubmit({
                location: "",
                title: "",
                skills: [],
                stack: [],
                requiredLanguages: [],
                experience: null,
                salaryRange: null,
              })
            }
            className="ml-4 w-auto bg-red-100 hover:bg-red-400 rounded-lg shadow-xl font-medium text-white px-4 py-2"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </form>
  );
};

export default FilterForm;
