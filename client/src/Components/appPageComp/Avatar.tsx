import React from "react";

import UserCard from "../UserCard";


const Avatar = ({applicant}) => {

  return (
    <>
      <img
        src={applicant.picture}
        alt=""
        className="h-20 w-20 rounded-full bg-gray-50 mt-4 m-5 "
      />
    </>
  );
};

export default Avatar;
