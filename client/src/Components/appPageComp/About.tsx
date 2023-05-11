import React from "react";
import { Applicant } from "../../Interfaces";


const About = ({applicant}:{applicant: Applicant}) => {

  return (
    <>
      <div>
        <h2>About</h2>
        {applicant.about}
      </div>
    </>
  );
};

export default About;
