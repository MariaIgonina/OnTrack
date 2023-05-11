import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

import {
  fetchRecruiter,
  setRecruiter,
  createRecruiter,
  updateRecruiter,
} from "../store/recruiterSlice";
import { Recruiter } from "../Interfaces";
import { initialRecruiter } from "../store/recruiterSlice";
import { ICloudImage } from "../Interfaces";
import { uploadImage, loadImages } from "../api.cloudinary";
import { preview } from "vite";
import { useDescriptions } from "@headlessui/react/dist/components/description/description";


const RecruiterForm = () => {
  const recruiter = useSelector((state: RootState) => state.recruiter);
  const dispatch = useDispatch<AppDispatch>();
  const [imageIds, setImageIds] = useState<ICloudImage[]>([]);

  // const baseUrl = `https://res.cloudinary.com/dd9tj642b/image/upload/`;

  // useEffect(() => {
  //   async function fetchImages() {
  //     const images = await loadImages();
  //     setImageIds(images);
  //   }
  //   fetchImages();
  // }, []);

  const codeParam = window.location.pathname.split("/").reverse()[0];

  useEffect(() => {
    dispatch(setRecruiter(recruiter));
    dispatch(fetchRecruiter(+codeParam!));
    console.log("recruiter.object", recruiter);

  }, [dispatch]);

  const [formData, setFormData] = useState(recruiter.recruiter);
  useEffect(() => {
    setFormData(recruiter.recruiter);
  }, [recruiter]);

  console.log("recruiter before formaData", recruiter.recruiter);
  console.log("formData",formData);

  const [fileInputState, setFileInputState] = useState<string>("");
  const [selectFile, setSelectFile] = useState<File | null>(null);
  const [previewSource, setPreviewSource] = useState<
    string | ArrayBuffer | null
  >();

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectFile(file);
      previewFile(file);
    }
  };


  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value ,
    }));
  };

  const handleCreateRecruiter = async () => {
      if (!formData.name) {
        alert("Please enter a company name.");
      } else {


    if (previewSource) {
      const base64EncodedImage = previewSource instanceof ArrayBuffer?
      Buffer.from(previewSource).toString("base64"):previewSource
      const returnedLogo = await uploadImage(base64EncodedImage)
      formData.logo = returnedLogo.secure_url
    }

    const dbArg = {
      recruiterId: recruiter.recruiter.id!,
      recruiter: formData}
      console.log(dbArg)

    dispatch(updateRecruiter(dbArg));
    window.location.reload()
  }
};


  //ExternalLinks media collecting
  const [externalLink, setExternalLink] = useState("");
  const [externalLinks, setExternalLinks] = useState([]);

  const handleExtLinkChange = (event: any) => {
    setExternalLink(event.target.value);
  };

  const handleAddLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setExternalLinks([...externalLinks, externalLink]);
    setExternalLink("");
  };

  return (
    <>
      <div>
        {JSON.stringify(recruiter)}

        <form className="formStyle">
          <h2>Create a recruiter account</h2>
          <div className="form-group">

            <label htmlFor="name">Company Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="founded">Founded</label>
            <input
              type="text"
              id="founded"
              name="founded"
              value={formData.founded}
              onChange={handleChange}
            />

            <label htmlFor="about">About</label>
            <input
              type="text"
              id="about"
              name="about"
              value={formData.about}
              onChange={handleChange}
            />

            <label htmlFor="headOffice">Head office</label>
            <input
              type="text"
              id="headOffice"
              name="headOffice"
              value={formData.headOffice}
              onChange={handleChange}
            />

            <label htmlFor="logo">Logo</label>
            <input
              type="file"
              id="logo"
              name="logo"
              onChange={handleFileInputChange}
              value={fileInputState}
            />

            <label htmlFor="externalLinks">External Links</label>
            <div>
              <input
                type="text"
                id="externalLinks"
                name="externalLinks"
                value={externalLink}
                onChange={handleExtLinkChange}
              />

              <button onClick={handleAddLink}>Add more</button>

              <ul>
                {externalLinks.map((link, index) => (
                  <li key={index}>{link}</li>
                ))}
              </ul>
            </div>
          </div>

          <button onClick={handleCreateRecruiter}>Create Recruiter</button>
        </form>
        {previewSource && (
          <img
            src={previewSource.toString()}
            alt="Preview"
            style={{ height: "300px" }}
          />
        )}
        {/* <h1>Coming from the cloudinary</h1>
        <div>
          {imageIds &&
            imageIds.map((image) => (
              <img
                src={image.secure_url}
                key={image.asset_id}
                alt="Your image"
                height="100px"
              />
            ))}
        </div> */}
      </div>
    </>
  );
};

export default RecruiterForm;
