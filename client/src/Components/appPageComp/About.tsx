import React from "react";


const About = ({applicant}) => {

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
