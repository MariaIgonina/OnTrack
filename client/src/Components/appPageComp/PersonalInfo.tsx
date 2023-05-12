import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
  faFacebook,
  faGithub,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import moment from "moment";

const PersonalInfo = ({ applicant }) => {
  return (
    <>
      <div className="flex-shrink-0 flex-col flex rounded-2xl shadow-md bg-white p-3 m-5 ">
        <h1 className="text-3xl font-bold tracking-tight text-[#026767] sm:text-3xl mb-4">{`${applicant.name} ${applicant.familyName}`}</h1>
        <p>{`${moment(applicant.age, "YYYYMMDD").fromNow()} years old`}</p>
        <p>{`Phone number ${applicant.phone}`}</p>
        <p>{`Email ${applicant.email}`}</p>

        <div>
          <ul className="flex flex-row">
            {applicant.socialMedia?.length &&
              applicant.socialMedia.map((link, index) => (
                <li key={index}>
                  {link.includes("github.com") && (
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon className="mr-2" icon={faGithub} />
                    </a>
                  )}
                  {link.includes("facebook.com") && (
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon className="mr-2" icon={faFacebook} />
                    </a>
                  )}
                  {link.includes("twitter.com") && (
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon className="mr-2" icon={faTwitter} />
                    </a>
                  )}
                  {link.includes("instagram.com") && (
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon className="mr-2" icon={faInstagram} />
                    </a>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
