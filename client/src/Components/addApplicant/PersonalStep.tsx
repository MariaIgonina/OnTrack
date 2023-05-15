// import React from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { 
//   Stepper,
//   StepLabel,
//   Step,
//   Button
// } from "@mui/material";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faTwitter,
//   faInstagram,
//   faFacebook,
//   faGithub,
//   faYoutube,
// } from "@fortawesome/free-brands-svg-icons";

// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../store/store";

// import {
//   updateApplicant,
//   setApplicant,
//   initialApplicant,
// } from "../store/applicantSlice";
// import {
//   createEducation,
//   setEducation,
//   initialEducation,
// } from "../store/educationSlice";
// import {
//   createExperience,
//   setExperience,
//   initialExperience,
// } from "../store/experienceSlice";
// import { setCurrentUser } from "../store/CurrentUserSlice";

// import { Applicant, Education, Experience } from "../Interfaces";



// const PersonalStep = ( 
//   {formData}, 
//   {setFormData}, 
//   {handleChange}, 
//   {hobbies},
//   {setHobbies} ) => {

//   // const applicant = useSelector((state: RootState) => state.applicant);
//   // const currentUser = useSelector((state: RootState) => state.currentUser);

//   // const handleChange = (
//   //   e: React.ChangeEvent<
//   //     HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//   //   >
//   // ) => {
//   //   const { name, value } = e.target as HTMLInputElement;
//   //   const updatedValue = name === "age" ? new Date(value) : value;
//   //   setFormData({ ...formData, [name]: updatedValue });
//   // };

//   //Dates prettifying
//   function dateString(date: any) {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");

//     const formattedDate = `${year}-${month}`;
//     return formattedDate;
//   }

//   //Hobbies collecting
//   const [hobbie, setHobbie] = useState("");

//   const handleHobbieChange = (event: any) => {
//     setHobbie(event.target.value);
//   };

//   const handleAddHobbie = () => {
//     if (hobbie !== "") {
//       setHobbies([...hobbies, hobbie]);
//       setHobbie("");
//     }
//     console.log(formData)
//   };

//   return (
//     <>
//       <div className="flex justify-center mt-8 p-4 m-4 flex-col">
//         <label htmlFor="name">Name</label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />

//         <label htmlFor="familyName">Family Name</label>
//         <input
//           type="text"
//           name="familyName"
//           value={formData.familyName}
//           onChange={handleChange}
//           required
//         />

//         <label htmlFor="age">Date of birth</label>
//         <input
//           type="date"
//           name="age"
//           max={new Date().toISOString().split("T")[0]}
//           value={
//             formData.age instanceof Date
//               ? formData.age.toISOString().split("T")[0]
//               : ""
//           }
//           onChange={handleChange}
//           required
//         />

//         <label htmlFor="about">About</label>
//         <textarea
//           name="about"
//           value={formData.about}
//           onChange={handleChange}
//         />

//         <label htmlFor="hobbies">Hobbies</label>
//         <div>
//           <input
//             type="text"
//             name="hobbies"
//             value={hobbie}
//             onChange={handleHobbieChange}
//           />

//           <button
//             onClick={handleAddHobbie}
//             className="bg-blue-500 hover:bg-blue-700 text-black font-bold rounded"
//           >
//             Add more
//           </button>

//           <ul>
//             {hobbies.map((hobbie, index) => (
//               <li key={index}>{hobbie}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>

//   );
// };

// export default PersonalStep;
