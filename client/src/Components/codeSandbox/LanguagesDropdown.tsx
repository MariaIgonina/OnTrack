import React from "react";
import Select from "react-select";
import { languageOptions } from "./lib/languageOptions";

interface LanguagesDropdown {
  onSelectChange?: any
}

const LanguagesDropdown = ({ onSelectChange }: LanguagesDropdown) => {
  return (
    <Select
      placeholder={`Filter By Category`}
      options={languageOptions}
      defaultValue={languageOptions[0]}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
};
export default LanguagesDropdown;