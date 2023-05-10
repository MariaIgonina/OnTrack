import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { 
  TextField, 
  Select, 
  InputLabel, 
  FormControl, 
  MenuItem,
  Stepper,
  StepLabel,
  Step,
  Button,
  Avatar
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faInstagram, faFacebook, faGithub, faYoutube } from "@fortawesome/free-brands-svg-icons";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from "../store/store";

import { updateApplicant, setApplicant, initialApplicant } from "../store/applicantSlice";
import { initialExperience } from "../store/experienceSlice";
import { initialEducation } from "../store/educationSlice";
import { Applicant, Education, Experience } from "../Interfaces";
import { languages, profSkills, compLanguages, stack, workingModals, workingHours } from "../library";
import './addApplicant.css'


const AddApplicantPage = () => {

  const applicant = useSelector((state:RootState) => state.applicant)
  const dispatch = useDispatch<AppDispatch>();

  // useEffect (() => {
  //   dispatch(setApplicant(applicant));
  // }, [dispatch])

  
  //For the applicant
  const [formData, setFormData] = useState(initialApplicant);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    const updatedValue = name === 'age' ? new Date(value) : value;
    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newApplicant: Applicant = {
      ...formData,
      // picture: avatarUrl,
      name: formData.name,
      familyName: formData.familyName,
      age: formData.age,
      phone: formData.phone,
      location: formData.location,
      readyToMove: formData.readyToMove,
      workingHours: formData.workingHours,
      workingModal: formData.workingModal,
      socialMedia: links,
      // skillsProf: string [],
      // stack: string [],
      // compLanguages: string [],
      about: formData.about,
      video: formData.video,
      languages: collLanguages,
      hobbies: hobbies,
      salaryRange: formData.salaryRange,
      desiredLocation: formData.desiredLocation,
      nonDesiredLocation: formData.nonDesiredLocation,
      desiredWorkingModal: formData.desiredWorkingModal,
    };
    console.log(newApplicant)
    // dispatch(updateApplicant(newApplicant))
  }

  //For the education
  const [educationData, setEducationData] = useState(initialEducation);

  const handleChangeEducation = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    const updatedValue = name === 'startDate' || name === 'endDate' ? 
    new Date(value) : value;
    setEducationData({ ...educationData, [name]: updatedValue });
  };

  const handleSubmitEducation = (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    const newEducation: Education = {
      ...educationData,
      place: educationData.place,
      startDate: educationData.startDate,
      endDate: educationData.endDate,
      degree: educationData.degree,
      speciality: educationData.speciality,
      // applicantId: applicant.idAuth,
    };
    console.log(newEducation)
  }

  //For the experience
  const [experienceData, setExperienceData] = useState(initialExperience);

  const handleChangeExperience = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    const updatedValue = name === 'startDate' || name === 'endDate' ? 
    new Date(value) : value;
    setExperienceData({ ...experienceData, [name]: updatedValue });
  };

  const handleSubmitExperience = (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    const newExperience: Experience = {
      ...experienceData,
      jobTitle: experienceData.jobTitle,
      company: experienceData.company,
      startDate: experienceData.startDate,
      endDate: experienceData.endDate,
      description: experienceData.description,
      // applicantId: applicant.idAuth,
    };
    console.log(newExperience)
  }

  //Steps activity 
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  //Hobbies collecting
  const [hobbie, setHobbie] = useState("");
  const [hobbies, setHobbies] = useState([]);

  const handleHobbieChange = (event: any) => {
    setHobbie(event.target.value);
  };

  const handleAddHobbie = () => {
    setHobbies([...hobbies, hobbie]);
    setHobbie("");
  };

  // //Avatar
  // const [avatarUrl, setAvatarUrl] = useState("");

  //Soсial media collecting
  const [link, setLink] = useState("");
  const [links, setLinks] = useState([]);

  const handleLinkChange = (event: any) => {
    setLink(event.target.value);
  };

  const handleAddLink = () => {
    setLinks([...links, link]);
    setLink("");
  };

  //Languages collecting
  const [collLanguage, setCollLanguage] = useState("");
  const [collLanguages, setCollLanguages] = useState([]);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLanguage = event.target.value;
    setCollLanguages(prevLanguages => [...prevLanguages, newLanguage]);
    setCollLanguage("");
  };

  //CompLanguages collecting
  const [collCompLanguage, setCollCompLanguage] = useState("");
  const [collCompLanguages, setCollCompLanguages] = useState([]);

  const handleCompLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCompLanguage = event.target.value;
    setCollCompLanguages(prev => [...prev, newCompLanguage]);
    setCollCompLanguage("");
  };

   //Skills collecting
   const [skill, setSkill] = useState("");
   const [skills, setSkills] = useState([]);
 
   const handleSkillsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     const newSkill = event.target.value;
     setSkills(prev => [...prev, newSkill]);
     setSkill("");
   };

    //Stack collecting
    const [collStack, setCollStack] = useState("");
    const [collStacks, setcollStacks] = useState([]);
  
    const handleCollStackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newStack = event.target.value;
      setcollStacks(prev => [...prev, newStack]);
      setCollStack("");
    };

  return (
    <>
      <div>
        <div className="stepper">
        <Stepper activeStep={activeStep} alternativeLabel>
        

          <Step key="Personal Information">
            <StepLabel>Personal Information</StepLabel>
            {activeStep === 0 && (
            <>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label htmlFor="familyName">Family Name</label>
              <input
                type="text"
                name="familyName"
                value={formData.familyName}
                onChange={handleChange}
                required
              />
              
              <label htmlFor="age">Date of birth</label>
              <input 
                type="date"
                name="age"
                max={new Date().toISOString().split('T')[0]}
                value={formData.age ? formData.age.toISOString().split('T')[0] : ''}
                onChange={handleChange}
                required
              />

              <label htmlFor="about">About</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
              />

              <label htmlFor="hobbies">Hobbies</label>
              <div>
                <input 
                  type="text"
                  name="hobbies"
                  value={hobbie} 
                  onChange={handleHobbieChange} 
                />
                
                <button onClick={handleAddHobbie}>Add more</button>
                
                <ul>
                  {hobbies.map((hobbie, index) => (
                    <li key={index}>{hobbie}</li>
                  ))}
                </ul>
              </div>

              {/* <div>
                <label htmlFor="avatarUrl">Avatar URL</label>
                <input
                  type="text"
                  name="avatarUrl"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                />

                {avatarUrl && (
                  <Avatar
                    alt="Avatar"
                    src={avatarUrl}
                    style={{ width: "100px", height: "100px", marginTop: "20px" }}
                  />
                )}
              </div> */}
            </>
          )}
          </Step>



          <Step key="Contact Information">
            <StepLabel>Contact Information</StepLabel>
            {activeStep === 1 && (
              <>
              <label htmlFor="phone">Phone number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <label htmlFor="location">Current Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />

              <label htmlFor="social-media">Social Media</label>
              <div>
                <input 
                  type="text"
                  name="social-media"
                  value={link} 
                  onChange={handleLinkChange} 
                />
                
                <button onClick={handleAddLink}>Add more</button>
                
                <ul>
                  {links.map((link, index) => (
                    <li key={index}>
                      {link.includes("github.com") && (
                        <a href={link} target="_blank" rel="noopener noreferrer">
                          <FontAwesomeIcon icon={faGithub} />
                        </a>
                      )}
                      {link.includes("facebook.com") && (
                        <a href={link} target="_blank" rel="noopener noreferrer">
                          <FontAwesomeIcon icon={faFacebook} />
                        </a>
                      )}
                      {link.includes("twitter.com") && (
                        <a href={link} target="_blank" rel="noopener noreferrer">
                          <FontAwesomeIcon icon={faTwitter} />
                        </a>
                      )}
                      {link.includes("instagram.com") && (
                        <a href={link} target="_blank" rel="noopener noreferrer">
                          <FontAwesomeIcon icon={faInstagram} />
                        </a>
                      )}
                    </li>
                  ))}

                </ul>
              </div>
            </>
          )}
          </Step>



          <Step key="Education and Experience">
            <StepLabel>Education and Experience</StepLabel>
            {activeStep === 2 && (
            <>
            <h4>Education</h4>

            <label htmlFor="place">Place</label>
            <input
              type="text"
              name="place"
              value={educationData.place}
              onChange={handleChangeEducation}
              required
            />

            <div className="from-to-dates"> 
            <label htmlFor="startDate">Start Date</label>
            <input 
                type="date"
                name="startDate"
                max={new Date().toISOString().split('T')[0]}
                value={educationData.startDate ? educationData.startDate.toISOString().split('T')[0] : ''}
                onChange={handleChangeEducation}
                required
              />
            </div>

            <label htmlFor="endDate">End Date</label>
            <input 
                type="date"
                name="endDate"
                max={new Date().toISOString().split('T')[0]}
                value={educationData.endDate ? educationData.endDate.toISOString().split('T')[0] : ''}
                onChange={handleChangeEducation}
                required
              />

            <label htmlFor="degree">Degree</label>
            <input
              type="text"
              name="degree"
              value={educationData.degree}
              onChange={handleChangeEducation}
              required
            />

            <label htmlFor="speciality">Speciality</label>
            <input
              type="text"
              name="speciality"
              value={educationData.speciality}
              onChange={handleChangeEducation}
              required
            />

            <button
              onClick={() => handleSubmitEducation()}
            >
              Add
            </button>

            <h4>Experience</h4>

            <label htmlFor="jobTitle">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={experienceData.jobTitle}
              onChange={handleChangeExperience}
              required
            />

            <label htmlFor="company">Company</label>
            <input
              type="text"
              name="company"
              value={experienceData.company}
              onChange={handleChangeExperience}
              required
            />

            <div className="from-to-dates">
            <label htmlFor="startDate">Start Date</label>
            <input 
                type="date"
                name="startDate"
                max={new Date().toISOString().split('T')[0]}
                value={experienceData.startDate ? experienceData.startDate.toISOString().split('T')[0] : ''}
                onChange={handleChangeExperience}
                required
              />

            <label htmlFor="endDate">End Date</label>
            <input 
                type="date"
                name="endDate"
                max={new Date().toISOString().split('T')[0]}
                value={experienceData.endDate ? experienceData.endDate.toISOString().split('T')[0] : ''}
                onChange={handleChangeExperience}
                required
              />
            </div>

            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={experienceData.description}
              onChange={handleChangeExperience}
            />
            
            <button
              onClick={() => handleSubmitExperience()}
            >
              Add
            </button>

          </>
          )}
          </Step>


          <Step key="Skills">
            
            <StepLabel>Skills</StepLabel>
            {activeStep === 3 && (
            <>
            <h4>Skills</h4>

            <label htmlFor="collLanguage">Languages</label>
            <input
              type="text"
              name="collLanguage"
              value={collLanguage}
              onChange={handleLanguageChange}
              list="languages"
            />
            <datalist id="languages">
              {languages.map((language) => (
                <option key={language} value={language} />
              ))}
            </datalist>

            <ul>
              {collLanguages.map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>

            <label htmlFor="collCompLanguages">Computer Languages</label>
            <input
              type="text"
              name="collCompLanguages"
              value={collCompLanguage}
              onChange={handleCompLanguageChange}
              list="compLanguages"
            />
            <datalist id="compLanguages">
              {compLanguages.map((language) => (
                <option key={language} value={language} />
              ))}
            </datalist>

            <ul>
              {collCompLanguages.map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
            
            <label htmlFor="skills">Professional skills</label>
            <input
              type="text"
              name="skills"
              value={skill}
              onChange={handleSkillsChange}
              list="profSkills"
            />
            <datalist id="profSkills">
              {profSkills.map((skill) => (
                <option key={skill} value={skill} />
              ))}
            </datalist>

            <ul>
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>

            <label htmlFor="collStack">Stack</label>
            <input
              type="text"
              name="collStack"
              value={collStack}
              onChange={handleCollStackChange}
              list="stack"
            />
            <datalist id="stack">
              {stack.map((st) => (
                <option key={st} value={st} />
              ))}
            </datalist>

            <ul>
              {collStacks.map((st, index) => (
                <li key={index}>{st}</li>
              ))}
            </ul>

            <label htmlFor="video">Here you can share the video of your project you proud of</label>
              <div>
                <input 
                  type="video"
                  name="video"
                  value={formData.video} 
                  onChange={handleChange} 
                />
                
              

              </div>

          </>
          )}
        

          
          </Step>

      
        </Stepper>
      </div>
      <div className="back-next-buttons">
        <Button
          onClick={handleBack}
          variant="contained"
          color="primary"
        >
          Back
        </Button>

        <Button
          onClick={handleNext}
          variant="contained"
          color="primary"
        >
          Next
        </Button>
      </div>
      </div>
    </>
  );
};

export default AddApplicantPage;