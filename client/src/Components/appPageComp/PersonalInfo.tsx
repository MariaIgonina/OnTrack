import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faInstagram, faFacebook, faGithub, faYoutube } from "@fortawesome/free-brands-svg-icons";
import moment from 'moment'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIcon from '@mui/icons-material/Phone';
import { Applicant } from "../../Interfaces";


const PersonalInfo = ({applicant}:{applicant: Applicant}) => {

  const applicantAge = function() {
    const birthDate = moment(applicant.age);
    const currentYear = moment();
    
    return currentYear.diff(birthDate, 'years')
  }
  


  return (
    <>
     <div className="flex-shrink-0 flex-grow flex-col flex rounded-2xl shadow-md bg-white p-3 m-1 mt-3">
        <h1
        className="text-3xl font-bold tracking-tight text-[#026767] sm:text-3xl m-2"
        >{`${applicant.name} ${applicant.familyName}`}</h1>
        <p>{`${applicantAge()} years old`}</p>
        
        <div className="flex flex-row ">
          <PhoneIcon
            fontSize="small"
            style={{ color: '#475569' }}
            className="mr-2"
          >
          </PhoneIcon>
          <p>{applicant.phone}</p>
        </div>

        <div className=" flex flex-row ">
          <AlternateEmailIcon
            fontSize="small"
            style={{ color: '#475569' }}
            className="mr-2"
          ></AlternateEmailIcon>
          <p>{applicant.email}</p>
        </div>

        <div className="flex-shrink-0 flex">
        <ul className="flex flex-row items-center gap-x-4 mt-2">
            {applicant.socialMedia.map((link, index) => (
              <li key={index}>
                {link.includes("github.com") && (
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon 
                    className="mr-2"
                    icon={faGithub} />
                  </a>
                )}
                {link.includes("facebook.com") && (
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon 
                    className="mr-2"
                    icon={faFacebook} />
                  </a>
                )}
                {link.includes("twitter.com") && (
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon 
                    className="mr-2"
                    icon={faTwitter} />
                  </a>
                )}
                {link.includes("instagram.com") && (
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon 
                    className="mr-2"
                    icon={faInstagram} />
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
