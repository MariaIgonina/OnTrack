import React, { useState } from "react";

interface FilterFormProps {
  onFilterSubmit: (filters: any) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ onFilterSubmit }) => {
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterSubmit({ location });
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
      {/* Add other input fields as needed */}
      <button type="submit">Apply Filters</button>
    </form>
  );
};

export default FilterForm;
