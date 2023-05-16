import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Stepper, StepLabel, Step, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
  faFacebook,
  faGithub,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

import {
  updateApplicant,
  setApplicant,
  initialApplicant,
} from "../store/applicantSlice";
import {
  createEducation,
  setEducation,
  initialEducation,
} from "../store/educationSlice";
import {
  createExperience,
  setExperience,
  initialExperience,
} from "../store/experienceSlice";
import { setCurrentUser } from "../store/CurrentUserSlice";

import { Applicant, Education, Experience } from "../Interfaces";
import {
  languages,
  profSkills,
  compLanguages,
  stack,
  workingModals,
  workingHours,
  levelLanguages,
} from "../library";

import moment from "moment";

const AddApplicantPage = () => {
  const navigate = useNavigate();
  const applicant = useSelector((state: RootState) => state.applicant);
  const dbEducation = useSelector((state: RootState) => state.education);
  const dbExperience = useSelector((state: RootState) => state.experience);
  const currentUser = useSelector((state: RootState) => state.currentUser);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log("CAAAAALLL", currentUser.id);
  }, [dispatch]);

  //For the applicant
  const [formData, setFormData] = useState(initialApplicant);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    const updatedValue = name === "age" ? new Date(value) : value;

    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const isFormValid = Object.values(formData).every((value) => value !== "");
    // setIsFormValid(isFormValid);
    // if (isFormValid) {
    const newApplicant = {
      name: formData.name || undefined,
      familyName: formData.familyName || undefined,
      age: formData.age || undefined,
      phone: formData.phone || undefined,
      location: formData.location || undefined,
      readyToMove: moveChecked || undefined,
      workingHours: formData.workingHours || undefined,
      workingModal: formData.workingModal || undefined,
      socialMedia: links || undefined,
      skillsProf: skills || undefined,
      stack: collStacks || undefined,
      compLanguages: collCompLanguages || undefined,
      about: formData.about || undefined,
      video: formData.video || undefined,
      languages: collLanguages || undefined,
      hobbies: hobbies || undefined,
      salaryRange: Number(formData.salaryRange) || undefined,
      desiredLocation: desiredLocations || undefined,
      nonDesiredLocation: nonDesiredLocations || undefined,
    };
    const dbArg = {
      applicantId: currentUser.id,
      applicant: newApplicant,
    };

    dispatch(updateApplicant(dbArg));
    navigate(`/${currentUser.role}/${currentUser.id}`);
  };

  //Buttons validation
  const [isFormValid, setIsFormValid] = useState(false);

  //For the education
  const [educationData, setEducationData] = useState(initialEducation);
  const [educations, setEducations] = useState<Education[]>([]);

  const handleChangeEducation = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    const updatedValue =
      name === "startDate" || name === "endDate" ? new Date(value) : value;
    setEducationData({ ...educationData, [name]: updatedValue });
  };

  const handleSubmitEducation = (e: any) => {
    e.preventDefault();
    if (educationData.place !== "" && educationData.speciality !== "") {
      const newEducation: Education = {
        place: educationData.place,
        startDate: educationData.startDate,
        endDate: educationData.endDate,
        degree: educationData.degree,
        speciality: educationData.speciality,
      };
      setEducations([...educations, newEducation]);

      const dbArg = {
        applicantId: currentUser.id,
        education: newEducation,
      };

      dispatch(createEducation(dbArg));
    }
  };

  //Dates prettifying
  function dateString(date: any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    const formattedDate = `${year}-${month}`;
    return formattedDate;
  }

  //For the experience
  const [experienceData, setExperienceData] = useState(initialExperience);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  const handleChangeExperience = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    const updatedValue =
      name === "startDate" || name === "endDate" ? new Date(value) : value;
    setExperienceData({ ...experienceData, [name]: updatedValue });
  };

  const handleSubmitExperience = (e: any) => {
    e.preventDefault();
    if (
      experienceData.jobTitle !== "" &&
      experienceData.company !== "" &&
      experienceData.description !== ""
    ) {
      const newExperience: Experience = {
        jobTitle: experienceData.jobTitle,
        company: experienceData.company,
        startDate: experienceData.startDate,
        endDate: experienceData.endDate,
        description: experienceData.description,
      };

      setExperiences([...experiences, newExperience]);

      const dbArg = {
        applicantId: currentUser.id,
        experience: newExperience,
      };

      dispatch(createExperience(dbArg));
    }
  };

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
    if (hobbie !== "") {
      setHobbies([...hobbies, hobbie]);
      setHobbie("");
    }
    console.log(currentUser);
  };

  //Soсial media collecting
  const [link, setLink] = useState("");
  const [links, setLinks] = useState<string[]>([]);

  const handleLinkChange = (event: any) => {
    setLink(event.target.value);
  };

  const handleAddLink = () => {
    if (link !== "") {
      setLinks([...links, link]);
      setLink("");
    }
  };

  //Languages collecting
  const [collLanguage, setCollLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [collLanguages, setCollLanguages] = useState<string[]>([]);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCollLanguage(event.target.value);
  };

  const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLevel(event.target.value);
  };

  const handleLanguage = () => {
    if (collLanguage !== "" && level !== "") {
      const newLangCouple = `${collLanguage} - ${level}`;
      setCollLanguages((prevLanguages) => [...prevLanguages, newLangCouple]);
      setLevel("");
      setCollLanguage("");
    }
  };

  //CompLanguages collecting
  const [collCompLanguage, setCollCompLanguage] = useState("");
  const [collCompLanguages, setCollCompLanguages] = useState<string[]>([]);

  const handleCompLanguageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newCompLanguage = event.target.value;
    setCollCompLanguages((prev) => [...prev, newCompLanguage]);
    setCollCompLanguage("");
  };

  //Skills collecting
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const handleSkillsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSkill = event.target.value;
    setSkills((prev: string[]) => [...prev, newSkill]);
    setSkill("");
  };

  //Stack collecting
  const [collStack, setCollStack] = useState("");
  const [collStacks, setcollStacks] = useState<string[]>([]);

  const handleCollStackChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newStack = event.target.value;
    setcollStacks((prev) => [...prev, newStack]);
    setCollStack("");
  };

  //Desired Location collecting
  const [desiredLocation, setDesiredLocation] = useState("");
  const [desiredLocations, setDesiredLocations] = useState<string[]>([]);

  const handleDesiredLocationChange = (event: any) => {
    setDesiredLocation(event.target.value);
  };

  const handleDesiredLocation = () => {
    if (desiredLocation !== "") {
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
    if (nonDesiredLocation !== "") {
      setNonDesiredLocations([...nonDesiredLocations, nonDesiredLocation]);
      setNonDesiredLocation("");
    }
  };

  //Ready to move toggle
  const [moveChecked, setMoveChecked] = useState(false);

  const handleMoveToggle = () => {
    setMoveChecked(!moveChecked);
  };

  //styles
  const theme = createTheme({
    components: {
      MuiStepIcon: {
        styleOverrides: {
          root: {
            color: "grey",
            "&$completed": {
              color: "green",
            },
            "&$active": {
              color: "red",
            },
            "&$error": {
              color: "blue",
            },
          },
        },
      },
    },
  });

  return (
    <div className=" flex items-center justify-center py-4 mt-4 flex-col m-0 mb-0 pb-0">
      <div className="flex items-center justify-center py-4 my-4 flex-col mb-0 pb-0">
        <ThemeProvider theme={theme}>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            className="flex flex-col"
          >
            <Step key="Personal Information">
              <StepLabel>Personal Information</StepLabel>
            </Step>

            <Step key="Contact Information">
              <StepLabel>Contact Information</StepLabel>
            </Step>

            <Step key="Education and Experience">
              <StepLabel>Education and Experience</StepLabel>
            </Step>

            <Step key="Skills">
              <StepLabel>Skills</StepLabel>
            </Step>

            <Step key="Preferences">
              <StepLabel>Preferences</StepLabel>
            </Step>
          </Stepper>
        </ThemeProvider>

        <div className="flex mt-4">
          {activeStep > 0 && (
            <button
              onClick={handleBack}
              className="mr-20 w-20 h-8 bg-green-100 hover:bg-gray-600 rounded-lg shadow-xl font-medium text-white "
            >
              Back
            </button>
          )}

          {activeStep < 4 && (
            <button
              onClick={handleNext}
              className=" w-20 h-8 bg-orange-100 hover:bg-orange-400 rounded-lg shadow-xl font-medium text-white"
            >
              Next
            </button>
          )}
        </div>

        {activeStep === 0 && (
          <>
            <div className="flex justify-center p-4 m-2 flex-col">
              <label
                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label
                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                htmlFor="familyName"
              >
                Family Name
              </label>
              <input
                className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                type="text"
                name="familyName"
                value={formData.familyName}
                onChange={handleChange}
                required
              />

              <label
                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                htmlFor="age"
              >
                Date of birth
              </label>
              <input
                className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                type="date"
                name="age"
                max={new Date().toISOString().split("T")[0]}
                value={
                  formData.age instanceof Date
                    ? formData.age.toISOString().split("T")[0]
                    : ""
                }
                onChange={handleChange}
                required
              />

              <label
                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                htmlFor="about"
              >
                About
              </label>
              <textarea
                className="py-2 px-3 rounded-lg border border-color-#F1F0EA mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                name="about"
                value={formData.about}
                onChange={handleChange}
              />

              <label
                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                htmlFor="hobbies"
              >
                Hobbies
              </label>
              <div>
                <input
                  className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                  type="text"
                  name="hobbies"
                  value={hobbie}
                  onChange={handleHobbieChange}
                />

                <button
                  onClick={handleAddHobbie}
                  className="bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white w-20 ml-4 h-8 mt-1 whitespace-nowrap"
                >
                  Add this
                </button>

                <ul className="flex flex-row">
                  {hobbies.map((hobbie, index) => (
                    <li className="mr-4 mb-4 bg-orange-200" key={index}>
                      {hobbie}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {activeStep === 1 && (
          <>
            <div className="flex justify-center p-4 m-2 flex-col">
              <label
                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                htmlFor="phone"
              >
                Phone number
              </label>
              <input
                className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <label
                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                htmlFor="location"
              >
                Current Location
              </label>
              <input
                className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />

              <label
                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                htmlFor="social-media"
              >
                Social Media
              </label>
              <div>
                <input
                  className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                  type="text"
                  name="social-media"
                  value={link}
                  onChange={handleLinkChange}
                />

                <button
                  className="bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white w-20 ml-4 h-8 mt-1 whitespace-nowrap"
                  onClick={handleAddLink}
                >
                  Add this
                </button>

                <ul>
                  {links.map((link, index) => (
                    <li key={index}>
                      {link.includes("github.com") && (
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FontAwesomeIcon icon={faGithub} />
                        </a>
                      )}
                      {link.includes("facebook.com") && (
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FontAwesomeIcon icon={faFacebook} />
                        </a>
                      )}
                      {link.includes("twitter.com") && (
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FontAwesomeIcon icon={faTwitter} />
                        </a>
                      )}
                      {link.includes("instagram.com") && (
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FontAwesomeIcon icon={faInstagram} />
                        </a>
                      )}
                      <p className="bg-green-50">{link}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {activeStep === 2 && (
          <>
            <div className="flex justify-center flex-row p-4 m-2">
              <div className="flex flex-col">
                <h4 className="uppercase  text-s text-gray-600 text-light font-semibold">
                  Education
                </h4>

                <label
                  className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                  htmlFor="place"
                >
                  Place
                </label>
                <input
                  className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                  type="text"
                  name="place"
                  value={educationData.place}
                  onChange={handleChangeEducation}
                  required
                />

                <div className="flex flex-row">
                  <div className="flex flex-col">
                    <label
                      className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                      htmlFor="startDate"
                    >
                      Start Date
                    </label>
                    <input
                      className="py-2 px-3 mr-6 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                      type="month"
                      name="startDate"
                      max={new Date().toISOString().split("T")[0]}
                      value={
                        educationData.startDate
                          ? educationData.startDate.toISOString().slice(0, 7)
                          : ""
                      }
                      onChange={handleChangeEducation}
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                      htmlFor="endDate"
                    >
                      End Date
                    </label>
                    <input
                      className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                      type="month"
                      name="endDate"
                      max={new Date().toISOString().split("T")[0]}
                      value={
                        educationData.endDate
                          ? educationData.endDate.toISOString().slice(0, 7)
                          : ""
                      }
                      onChange={handleChangeEducation}
                      required
                    />
                  </div>
                </div>

                <label
                  className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                  htmlFor="degree"
                >
                  Degree
                </label>
                <input
                  className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                  type="text"
                  name="degree"
                  value={educationData.degree}
                  onChange={handleChangeEducation}
                  required
                />

                <label
                  className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                  htmlFor="speciality"
                >
                  Speciality
                </label>
                <input
                  className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                  type="text"
                  name="speciality"
                  value={educationData.speciality}
                  onChange={handleChangeEducation}
                  required
                />

                <button
                  className="bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white w-20 ml-4 h-8 mt-1 whitespace-nowrap"
                  onClick={handleSubmitEducation}
                >
                  Add this
                </button>

                <ul>
                  {educations.map((edu, index) => (
                    <li
                      className="mt-2 mr-4 mb-4 bg-gray-200"
                      key={"edu-" + index}
                    >
                      <h4 className="text-light font-bold">{edu.place}</h4>
                      <h5>{edu.speciality}</h5>
                      <h5>{edu.degree}</h5>
                      <p className="md:text-sm text-xs text-gray-500 text-light font-semibold">{`${moment(
                        edu.startDate
                      ).format("MMM YYYY")} - ${moment(edu.endDate).format(
                        "MMM YYYY"
                      )}`}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex ml-16 flex-col">
                <h4 className="uppercase  text-s text-gray-600 text-light font-semibold">
                  Experience
                </h4>

                <label
                  className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                  htmlFor="jobTitle"
                >
                  Job Title
                </label>
                <input
                  className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                  type="text"
                  name="jobTitle"
                  value={experienceData.jobTitle}
                  onChange={handleChangeExperience}
                  required
                />

                <label
                  className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                  htmlFor="company"
                >
                  Company
                </label>
                <input
                  className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                  type="text"
                  name="company"
                  value={experienceData.company}
                  onChange={handleChangeExperience}
                  required
                />

                <div className="flex flex-row">
                  <div className="flex flex-col">
                    <label
                      className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                      htmlFor="startDate"
                    >
                      Start Date
                    </label>
                    <input
                      className="py-2 mr-6 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                      type="month"
                      name="startDate"
                      max={new Date().toISOString().split("T")[0]}
                      value={
                        experienceData.startDate instanceof Date
                          ? experienceData.startDate.toISOString().slice(0, 7)
                          : ""
                      }
                      onChange={handleChangeExperience}
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                      htmlFor="endDate"
                    >
                      End Date
                    </label>
                    <input
                      className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                      type="month"
                      name="endDate"
                      max={new Date().toISOString().split("T")[0]}
                      value={
                        experienceData.endDate instanceof Date
                          ? experienceData.endDate.toISOString().slice(0, 7)
                          : ""
                      }
                      onChange={handleChangeExperience}
                      required
                    />
                  </div>
                </div>

                <label
                  className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                  htmlFor="description"
                >
                  Description
                </label>
                <input
                  className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                  type="text"
                  name="description"
                  value={experienceData.description}
                  onChange={handleChangeExperience}
                />

                <button
                  className="bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white w-20 ml-4 h-8 mt-1 whitespace-nowrap"
                  onClick={handleSubmitExperience}
                >
                  Add this
                </button>

                <ul>
                  {experiences.map((exp, index) => (
                    <li
                      className="mt-2 mr-4 mb-4 bg-green-50"
                      key={"exp-" + index}
                    >
                      <h4 className="text-light font-bold">{exp.jobTitle}</h4>
                      <h5>{exp.company}</h5>
                      <p className="md:text-sm text-xs text-gray-500 text-light font-semibold">{`${moment(
                        exp.startDate
                      ).format("MMM YYYY")} - ${moment(exp.endDate).format(
                        "MMM YYYY"
                      )}`}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {activeStep === 3 && (
          <>
            <div className="flex justify-center p-4 m-2 flex-col">
              <label
                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                htmlFor="collLanguage"
              >
                Choose the language
              </label>
              <input
                className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
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

              <div className="flex flex-col">
                <label
                  className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                  htmlFor="levelLanguage"
                >
                  Choose your level
                </label>
                <div className="flex flex-row">
                  <input
                    className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
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
                  <button
                    className="bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white w-20 ml-4 h-8 mt-1 whitespace-nowrap"
                    onClick={handleLanguage}
                  >
                    Add this
                  </button>
                </div>
              </div>

              <ul className="flex flex-row">
                {collLanguages.map((language, index) => (
                  <li className="mr-4 mb-4 bg-orange-200" key={index}>
                    {language}
                  </li>
                ))}
              </ul>

              <label
                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                htmlFor="collCompLanguages"
              >
                Computer Languages
              </label>
              <input
                className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
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

              <ul className="flex flex-row">
                {collCompLanguages.map((language, index) => (
                  <li className="mr-4 mb-4 bg-orange-200" key={index}>
                    {language}
                  </li>
                ))}
              </ul>

              <label
                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                htmlFor="skills"
              >
                Professional skills
              </label>
              <input
                className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
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

              <ul className="flex flex-row">
                {skills.map((skill, index) => (
                  <li className="mr-4 mb-4 bg-orange-200" key={index}>
                    {skill}
                  </li>
                ))}
              </ul>

              <label
                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                htmlFor="collStack"
              >
                Stack
              </label>
              <input
                className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
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

              <ul className="flex flex-row">
                {collStacks.map((st, index) => (
                  <li className="mr-4 mb-4 bg-orange-200" key={index}>
                    {st}
                  </li>
                ))}
              </ul>

              <label
                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                htmlFor="video"
              >
                If you have a video on youtube that is public - please add it to
                showcase your skills!
              </label>

              <input
                className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                type="video"
                name="video"
                value={formData.video}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {activeStep === 4 && (
          <>
            <div className="flex justify-center p-4 m-2 flex-col">
              <label
                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                htmlFor="desiredLocations"
              >
                Desired Locations
              </label>
              <div>
                <input
                  className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                  type="text"
                  name="desiredLocations"
                  value={desiredLocation}
                  onChange={handleDesiredLocationChange}
                />

                <button
                  className="bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white w-20 ml-4 h-8 mt-1 whitespace-nowrap"
                  onClick={handleDesiredLocation}
                >
                  Add this
                </button>

                <ul className="flex flex-row">
                  {desiredLocations.map((loc, index) => (
                    <li className="mr-4 mb-4 bg-orange-200" key={index}>
                      {loc}
                    </li>
                  ))}
                </ul>
              </div>

              <label
                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                htmlFor="nonDesiredLocations"
              >
                Non-desired Locations
              </label>
              <div>
                <input
                  className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                  type="text"
                  name="nonDesiredLocations"
                  value={nonDesiredLocation}
                  onChange={handleNonDesiredLocationChange}
                />

                <button
                  className="bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white w-20 ml-4 h-8 mt-1 whitespace-nowrap"
                  onClick={handleNonDesiredLocation}
                >
                  Add this
                </button>

                <ul className="flex flex-row">
                  {nonDesiredLocations.map((loc, index) => (
                    <li className="mr-4 mb-4 bg-orange-200" key={index}>
                      {loc}
                    </li>
                  ))}
                </ul>
              </div>

              <label
                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                htmlFor="workingModal"
              >
                Working Modal
              </label>
              <input
                className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
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

              <label
                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                htmlFor="workingHours"
              >
                Working Hours
              </label>
              <input
                className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
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
              <div className="flrx flex-row">
                <label
                  className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-4"
                  htmlFor="readyToMove"
                >
                  Are you ready to move?
                </label>
                <input
                  className="ml-4 rounded-lg border color-grey-100 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                  type="checkbox"
                  id="readyToMove"
                  checked={moveChecked}
                  onChange={handleMoveToggle}
                />
              </div>
              <label
                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mt-2"
                htmlFor="salaryRange"
              >
                Minimum Salary, $
              </label>
              <input
                className="py-2 px-3 mb-3 h-8 rounded-lg border color-grey-100 mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                type="number"
                name="salaryRange"
                value={formData.salaryRange}
                onChange={handleChange}
              />
            </div>
          </>
        )}
      </div>

      <div>
        {activeStep === 4 && (
          <button
            className="w-auto bg-orange-100 hover:bg-orange-400 rounded-lg shadow-xl font-medium text-white px-4 py-2 mb-8"
            onClick={handleSubmit}
          >
            Create account!
          </button>
        )}
      </div>
    </div>
  );
};

export default AddApplicantPage;
