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
import { createEducation, setEducation, initialEducation } from "../store/educationSlice";
import { createExperience, setExperience, initialExperience } from "../store/experienceSlice";
import { setCurrentUser } from "../store/CurrentUserSlice";

import { Applicant, Education, Experience } from "../Interfaces";
import { languages, profSkills, compLanguages, stack, workingModals, workingHours, levelLanguages } from "../library";
import './addApplicant.css'


const AddApplicantPage = () => {

  const dbApplicant = useSelector((state:RootState) => state.applicant)
  const dbEducation = useSelector((state:RootState) => state.education)
  const dbExperience = useSelector((state:RootState) => state.experience)
  const currentUser = useSelector((state:RootState) => state.currentUser)
  
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const isFormValid = Object.values(formData).every(value => value);
    setIsFormValid(isFormValid);
    if (isFormValid) {
      const newApplicant = {
        name: formData.name,
        familyName: formData.familyName,
        age: formData.age,
        phone: formData.phone,
        location: formData.location,
        readyToMove: moveChecked,
        workingHours: formData.workingHours,
        workingModal: formData.workingModal,
        socialMedia: links,
        skillsProf: skills,
        stack: collStacks,
        compLanguages: collCompLanguages,
        about: formData.about,
        video: formData.video,
        languages: collLanguages,
        hobbies: hobbies,
        salaryRange: Number(formData.salaryRange),
        desiredLocation: desiredLocations,
        nonDesiredLocation: nonDesiredLocations,
      }
      const dbArg = {
        applicantId: 54, 
        applicant: newApplicant}
  
      dispatch(updateApplicant(dbArg));
  
    } else alert("Please fill in all fields.")
  }

  //Buttons validation
  const [isFormValid, setIsFormValid] = useState(false);

  //For the education
  const [educationData, setEducationData] = useState(initialEducation);
  const [educations, setEducations] = useState<Education[]>([])

  const handleChangeEducation = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    const updatedValue = name === 'startDate' || name === 'endDate' ? 
    new Date(value) : value;
    setEducationData({ ...educationData, [name]: updatedValue });
  };

  const handleSubmitEducation = (e:any) => {
    e.preventDefault();
    if (educationData.place !== '' && 
        educationData.speciality !== '') {
      const newEducation: Education = {
        place: educationData.place,
        startDate: educationData.startDate,
        endDate: educationData.endDate,
        degree: educationData.degree,
        speciality: educationData.speciality,
      };
      setEducations([...educations, newEducation])
      
      const dbArg = {
        applicantId: 54, 
        education: newEducation}
        
        console.log(dbArg)
      dispatch(createEducation(dbArg));
    } 
  }

  //Dates prettifying
  function dateString (date:any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

    const formattedDate = `${year}-${month}`;
    return formattedDate
  }

  //For the experience
  const [experienceData, setExperienceData] = useState(initialExperience);
  const [experiences, setExperiences] = useState<Experience[]>([])

  const handleChangeExperience = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    const updatedValue = name === 'startDate' || name === 'endDate' ? 
    new Date(value) : value;
    setExperienceData({ ...experienceData, [name]: updatedValue });
  };

  const handleSubmitExperience = (e: any) => {
    e.preventDefault();
    if (experienceData.jobTitle !== '' && 
        experienceData.company !== '' &&
        experienceData.description !== '') {
    const newExperience: Experience = {
      jobTitle: experienceData.jobTitle,
      company: experienceData.company,
      startDate: experienceData.startDate,
      endDate: experienceData.endDate,
      description: experienceData.description,
    };

    setExperiences([...experiences, newExperience])
    
    const dbArg = {
      applicantId: 54, 
      experience: newExperience}

    dispatch(createExperience(dbArg));
    } 
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
  const [hobbies, setHobbies] = useState<string[]>([]);

  const handleHobbieChange = (event: any) => {
    setHobbie(event.target.value);
  };

  const handleAddHobbie = () => {
    if (hobbie !== '') {
      setHobbies([...hobbies, hobbie]);
      setHobbie("");
    }
    console.log(currentUser)
  };

  //Soсial media collecting
  const [link, setLink] = useState("");
  const [links, setLinks] = useState<string[]>([]);

  const handleLinkChange = (event: any) => {
    setLink(event.target.value);
  };

  const handleAddLink = () => {
    if (link !== '') {
      setLinks([...links, link]);
      setLink("");
    }
  };

  //Languages collecting
  const [collLanguage, setCollLanguage] = useState("");
  const [level, setLevel] = useState('')
  const [collLanguages, setCollLanguages] = useState<string[]>([]);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCollLanguage(event.target.value);
  };

  const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLevel(event.target.value);
  };
  
  const handleLanguage = () => {
      if (collLanguage !== '' && level !== '') {
      const newLangCouple = `${collLanguage} - ${level}`
      setCollLanguages(prevLanguages => [...prevLanguages, newLangCouple]);
      setLevel("");
      setCollLanguage("");
    }
  };

  //CompLanguages collecting
  const [collCompLanguage, setCollCompLanguage] = useState("");
  const [collCompLanguages, setCollCompLanguages] = useState<string[]>([]);

  const handleCompLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCompLanguage = event.target.value;
    setCollCompLanguages(prev => [...prev, newCompLanguage]);
    setCollCompLanguage("");
  };

   //Skills collecting
   const [skill, setSkill] = useState("");
   const [skills, setSkills] = useState<string[]>([]);
 
   const handleSkillsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     const newSkill = event.target.value;
     setSkills((prev:string[]) => [...prev, newSkill]);
     setSkill("");
   };

    //Stack collecting
    const [collStack, setCollStack] = useState("");
    const [collStacks, setcollStacks] = useState<string[]>([]);
  
    const handleCollStackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newStack = event.target.value;
      setcollStacks(prev => [...prev, newStack]);
      setCollStack("");
    };

    //Desired Location collecting
    const [desiredLocation, setDesiredLocation] = useState("");
    const [desiredLocations, setDesiredLocations] = useState<string[]>([]);
  
    const handleDesiredLocationChange = (event: any) => {
      setDesiredLocation(event.target.value);
    };
    
    const handleDesiredLocation = () => {
      if (desiredLocation !== '') {
        setDesiredLocations([...desiredLocations, desiredLocation]);
        setDesiredLocation("");
      }
    };

    //Desired Location collecting
    const [nonDesiredLocation, setNonDesiredLocation] = useState("");
    const [nonDesiredLocations, setNonDesiredLocations] = useState<string[]>([]);
  
    const handleNonDesiredLocationChange = (event: any) => {
      setNonDesiredLocation(event.target.value);
    };
    
    const handleNonDesiredLocation = () => {
      if (nonDesiredLocation !== '') {
        setNonDesiredLocations([...nonDesiredLocations, nonDesiredLocation]);
        setNonDesiredLocation("");
      }
    };

    //Ready to move toggle
    const [moveChecked, setMoveChecked] = useState(false);
    
    const handleMoveToggle = () => {
      setMoveChecked(!moveChecked);
    };
    

  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center justify-center p-4 m-4 flex-col">
        <div className="stepper">
        <Stepper activeStep={activeStep} alternativeLabel>

          <Step key="Personal Information">
            <StepLabel>Personal Information</StepLabel>
            {activeStep === 0 && (
            <>
            <div className="flex fixed flex-col ">
              
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
                value={formData.age instanceof Date ? formData.age.toISOString().split('T')[0] : ''}
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

            </div>
            </>
          )}
          </Step>


          <Step key="Contact Information">
            <StepLabel>Contact Information</StepLabel>
            {activeStep === 1 && (
              <>
              <div className="flex fixed flex-col ">
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
              </div>
            </>
          )}
          </Step>


          <Step key="Education and Experience">
            <StepLabel>Education and Experience</StepLabel>
            {activeStep === 2 && (
            <>
            <div className="flex fixed flex-col ">
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
              type="month"
              name="startDate"
              max={new Date().toISOString().split('T')[0]}
              value={educationData.startDate instanceof Date ? educationData.startDate.toISOString().slice(0, 7) : ''}
              onChange={handleChangeEducation}
              required
            />

              <label htmlFor="endDate">End Date</label>
              <input 
                type="month"
                name="endDate"
                max={new Date().toISOString().split('T')[0]}
                value={educationData.endDate instanceof Date ? educationData.endDate.toISOString().slice(0, 7) : ''}
                onChange={handleChangeEducation}
                required
                />
            </div>

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
              onClick={handleSubmitEducation}
            >
              Add
            </button>

            <ul>
            {educations.map((edu, index) =>
              <li key={'edu-'+index}>
                <h4>{edu.place}</h4>
                <h5>{edu.speciality}</h5>
                <h5>{edu.degree}</h5>
                <p>Add beautiful dates</p>
              </li>
            )}
            </ul>

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
                type="month"
                name="startDate"
                max={new Date().toISOString().split('T')[0]}
                value={experienceData.startDate instanceof Date ? experienceData.startDate.toISOString().slice(0, 7) : ''}
                onChange={handleChangeExperience}
                required
              />

            <label htmlFor="endDate">End Date</label>
            <input 
                type="month"
                name="endDate"
                max={new Date().toISOString().split('T')[0]}
                value={experienceData.endDate instanceof Date ? experienceData.endDate.toISOString().slice(0, 7) : ''}
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
              onClick={handleSubmitExperience}
            >
              Add
            </button>

            <ul>
            {experiences.map((exp, index) =>
              <li key={'exp-'+index}>
                <h4>{exp.jobTitle}</h4>
                <h5>{exp.company}</h5>
                <p>Add beautiful dates</p>
              </li>
            )}
            </ul>
            </div>
          </>
          )}
          </Step>


          <Step key="Skills">
            
            <StepLabel>Skills</StepLabel>
            {activeStep === 3 && (
            <>
            <div className="flex fixed flex-col ">
            <h4>Skills</h4>

            <label htmlFor="collLanguage">Choose the language</label>
            <input
              type="text"
              name="collLanguage"
              value={collLanguage}
              onChange={handleLanguageChange}
              list="languages"
            />
            <datalist id="languages">
              {languages.map((lang) => (
                <option key={lang} value={lang} />
              ))}
            </datalist>

            <label htmlFor="levelLanguage">Choose your level</label>
            <input
              type="text"
              name="levelLanguage"
              value={level}
              onChange={handleLevelChange}
              list="levelLanguages"
            />
            <datalist id="levelLanguages">
              {levelLanguages.map((level) => (
                <option key={level} value={level} />
              ))}
            </datalist>
            
            <button onClick={handleLanguage}>Add</button>

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

            <label htmlFor="video">Here you can share the link to the video of your project you proud of</label>
              <div>
                <input 
                  type="video"
                  name="video"
                  value={formData.video} 
                  onChange={handleChange} 
                />
              </div>
            </div>
          </>
          )}
          
          </Step>


          <Step key="Preferences">
            
            <StepLabel>Preferences</StepLabel>
            {activeStep === 4 && (
            <>
            <div className="flex fixed flex-col ">
            <h4>Preferences</h4>

            <label htmlFor="desiredLocations">Desired Locations</label>
            <div>
            <input
              type="text"
              name="desiredLocations"
              value={desiredLocation}
              onChange={handleDesiredLocationChange}
            />

            <button onClick={handleDesiredLocation}>Add more</button>
            <ul>
              {desiredLocations.map((loc, index) => (
                <li key={index}>{loc}</li>
              ))}
            </ul>
          </div>
            
          <label htmlFor="nonDesiredLocations">Non-desired Locations</label>
            <div>
            <input
              type="text"
              name="nonDesiredLocations"
              value={nonDesiredLocation}
              onChange={handleNonDesiredLocationChange}
            />

            <button onClick={handleNonDesiredLocation}>Add more</button>
            <ul>
              {nonDesiredLocations.map((loc, index) => (
                <li key={index}>{loc}</li>
              ))}
            </ul>
          </div>

          <label htmlFor="workingModal">Working Modal</label>
          <input
            type="text"
            name="workingModal"
            value={formData.workingModal}
            onChange={handleChange}
            list="workingModals"
          />
          <datalist id="workingModals">
            {workingModals.map((modal) => (
              <option key={modal} value={modal} />
            ))}
          </datalist>

          <label htmlFor="workingHours">Working Hours</label>
          <input
            type="text"
            name="workingHours"
            value={formData.workingHours}
            onChange={handleChange}
            list="workingHours"
          />
          <datalist id="workingHours">
            {workingHours.map((hour) => (
              <option key={hour} value={hour} />
            ))}
          </datalist>

          <label htmlFor="readyToMove">Are you ready to move?</label>
          <input
            type="checkbox"
            id="readyToMove"
            checked={moveChecked}
            onChange={handleMoveToggle}
          />

          <label htmlFor="salaryRange">Minimum Salary, $</label>
          <input
            type="number"
            name="salaryRange"
            value={formData.salaryRange}
            onChange={handleChange}
          />
          </div>
          </>
          )}
          
          </Step>
      
        </Stepper>
      </div>
      </div>
      
      </div>
      
      <div className="flex ">
      {activeStep > 0 && (
        <Button
          onClick={handleBack}
          variant="contained"
          color="primary"
        >
          Back
        </Button>
      )}

      {activeStep < 4 && (
        <Button
          onClick={handleNext}
          variant="contained"
          color="primary"
        >
          Next
        </Button>
      )}
    </div>

    <div>
      {activeStep === 4 && (
       <Button
       onClick={handleSubmit}
       variant="contained"
       color="primary"
      >Create account</Button>
      )}
    </div>
    </>
  );
};

export default AddApplicantPage;