import React, { useState } from "react";
import "./RegisterModal.css";
import Button from "@mui/material/Button";

export default function RegisterModal() {
  const [isUser, setisUser] = useState(false);
  const [isRecruiter, setisRecruiter] = useState(true);

  const handleToggle = () => {
    setisUser(!isUser);
    setisRecruiter(!isRecruiter);
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <form>
          <div className="textinput">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input name="email" type="text"></input>
          </div>
          <div className="textinput" id="bottominput">
            <label className="label">Password</label>
            <input name="Password" type="password"></input>
          </div>

          <div className="checkbox">
            <input
              type="checkbox"
              id="applicant"
              name="role"
              value="applicant"
              checked={!isUser}
              onChange={handleToggle}
            />
            <label htmlFor="applicant">Applicant</label>

            <input
              type="checkbox"
              id="recruiter"
              name="role"
              value="recruiter"
              checked={!isRecruiter}
              onChange={handleToggle}
            />
            <label htmlFor="recruiter">Recruiter</label>
          </div>
          <Button
            sx={{ backgroundColor: "#568ea3" }}
            variant="contained"
            className="btn"
            type="submit"
          >
            SIGN UP
          </Button>
        </form>
      </div>
    </div>
  );
}
