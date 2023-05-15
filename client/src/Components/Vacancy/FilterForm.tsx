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
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Skills (comma-separated):
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
      </label>
      <label>
        Stack (comma-separated):
        <input
          type="text"
          value={stack}
          onChange={(e) => setStack(e.target.value)}
        />
      </label>
      <label>
        Required Languages (comma-separated):
        <input
          type="text"
          value={requiredLanguages}
          onChange={(e) => setRequiredLanguages(e.target.value)}
        />
      </label>
      <label>
        Experience:
        <input
          type="text"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
      </label>
      <label>
        Salary Range:
        <input
          type="text"
          value={salaryRange}
          onChange={(e) => setSalaryRange(e.target.value)}
        />
      </label>
      <button type="submit">Apply Filters</button>
    </form>
  );
};

export default FilterForm;
