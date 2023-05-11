import React from "react";


const CurrentLocation = ({applicant}) => {

  return (
    <>
      <div>
        <h2>Current Location</h2>
        <p>{applicant.location}</p>
      </div>
    </>
  );
};

export default CurrentLocation;
