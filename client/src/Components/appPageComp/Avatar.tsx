import React from "react";

import UserCard from "../UserCard";


const Avatar = ({applicant}) => {

  return (
    <>
    
      <img
        src={applicant.picture}
        alt=""
        className="shadow-md rounded-full bg-gray-50 mt-8 m-4 "
        style={{ height: '220px', width: '220px' }}
      />
    </>
  );
};

export default Avatar;
