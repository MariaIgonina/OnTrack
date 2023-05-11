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
} from "../store/recruiterSlice";
import { Recruiter } from "../Interfaces";
import { initialRecruiter } from "../store/recruiterSlice";
import { ICloudImage } from "../Interfaces";
import { uploadImage, loadImages } from "../api.cloudinary";
import { preview } from "vite";
import { useDescriptions } from "@headlessui/react/dist/components/description/description";

const CompanyPage = () => {
  const recruiter = useSelector((state: RootState) => state.recruiter);
  const dispatch = useDispatch<AppDispatch>();
  const [imageIds, setImageIds] = useState<ICloudImage[]>([]);

  const baseUrl = `https://res.cloudinary.com/dd9tj642b/image/upload/`;

  useEffect(() => {
    async function fetchImages() {
      const images = await loadImages();
      setImageIds(images);
    }
    fetchImages();
  }, []);

  // useEffect(() => {
  //   console.log("array 2", imageIds);
  // }, [imageIds])

  // const queryString = window.location.search;
  // const urlParams = new URLSearchParams(queryString);
  // const codeParam = urlParams.get("id");

  // // useEffect(() => {
  //   dispatch(setRecruiter(recruiter));
  //   dispatch(fetchRecruiter(1));
  // }, [dispatch]);

  const [formData, setFormData] = useState(initialRecruiter);

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateRecruiter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newRecruiter: Recruiter = {
      ...formData,
      id: formData.id,
      emailstring: formData.emailstring, //DELETE THIS ONCE THE LOGIN WORKS!!!!
      picture: formData.picture, //DELETE THIS ONCE THE LOGIN WORKS!!!!
      idAuth: formData.idAuth, //DELETE THIS ONCE THE LOGIN WORKS!!!!
      recruiterName: formData.recruiterName,
      name: formData.name,
      vacancies: formData.vacancies,
      founded: formData.founded,
      about: formData.about,
      externalLinks: externalLinks,
      headOffice: formData.headOffice,
      track: formData.track,
    };

    if (previewSource) {
      const base64EncodedImage = previewSource instanceof ArrayBuffer?
      Buffer.from(previewSource).toString("base64"):previewSource
      const returnedLogo = await uploadImage(base64EncodedImage)
      newRecruiter.logo = returnedLogo.secure_url
    }

    dispatch(createRecruiter(newRecruiter));
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="recruiterName">Recruiter Name</label>
            <input
              type="text"
              name="recruiterName"
              value={formData.recruiterName}
              onChange={handleChange}
              required
            />

            <label htmlFor="picture">TO BE DELETED picture</label>
            <input
              type="text"
              name="picture"
              value={formData.picture}
              onChange={handleChange}
              required
            />

            <label htmlFor="idAuth">TO BE DELETED idAuth</label>
            <input
              type="text"
              name="idAuth"
              value={formData.idAuth}
              onChange={handleChange}
              required
            />

            <label htmlFor="founded">Founded</label>
            <input
              type="text"
              name="founded"
              value={formData.founded}
              onChange={handleChange}
              required
            />

            <label htmlFor="about">About</label>
            <input
              type="text"
              name="about"
              value={formData.about}
              onChange={handleChange}
              required
            />

            <label htmlFor="headOffice">Head office</label>
            <input
              type="text"
              name="headOffice"
              value={formData.headOffice}
              onChange={handleChange}
              required
            />

            <label htmlFor="emailstring">
              {" "}
              TO BE DELETED : Email{" "}
            </label>
            <input
              type="text"
              name="emailstring"
              value={formData.emailstring}
              onChange={handleChange}
              required
            />

            <label htmlFor="logo">Logo</label>
            <input
              type="file"
              name="logo"
              onChange={handleFileInputChange}
              value={fileInputState}
              // required
            />

            <label htmlFor="externalLinks">External Links</label>
            <div>
              <input
                type="text"
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
        <h1>Coming from the cloudinary</h1>
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
        </div>
      </div>
    </>
  );
};

export default CompanyPage;
