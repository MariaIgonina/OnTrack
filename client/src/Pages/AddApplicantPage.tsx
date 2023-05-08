import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { 
  TextField, 
  Select, 
  InputLabel, 
  FormControl, 
  MenuItem
} from "@mui/material";


const AddApplicantPage = () => {



  return (
    <>
      <div>
      <FormControl fullWidth>

        <TextField id="outlined-basic" label="Name" variant="outlined" />
        <TextField id="outlined-basic" label="Family name" variant="outlined" />

        <input 
        type="date" 
        max={new Date().toISOString().split('T')[0]} 

        />

        {/* <InputLabel id="demo-simple-select-label">Language</InputLabel> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          label="Language"
          // onChange={handleChange}
        >
          <MenuItem>English</MenuItem>
          <MenuItem>Spanish</MenuItem>
          <MenuItem>French</MenuItem>
          <MenuItem>Russian</MenuItem>
        </Select>
      
      </FormControl>
      </div>
    </>
  );
};

export default AddApplicantPage;