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

type VacancyCreateProps = {
  onCancel?: () => void;
};

const RecruiterForm: React.FC<VacancyCreateProps> = () => {
  const recruiter = useSelector((state: RootState) => state.recruiter);
  const dispatch = useDispatch<AppDispatch>();
  const [imageIds, setImageIds] = useState<ICloudImage[]>([]);
  const navigate = useNavigate()
  const currentUser = useSelector((s: RootState) => s.currentUser);

  const onCancel = () => {
    navigate(`/${currentUser.role}/${currentUser.id}`);
  };

  const codeParam = window.location.pathname.split("/").reverse()[0];

  useEffect(() => {
    dispatch(setRecruiter(recruiter));
    dispatch(fetchRecruiter(+codeParam!));
  }, [dispatch]);

  const [formData, setFormData] = useState(recruiter.recruiter);
  useEffect(() => {
    setFormData(recruiter.recruiter);
  }, [recruiter]);

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
      [name]: value,
    }));
  };

  const handleCreateRecruiter = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!formData.name) {
      alert("Please enter a company name.");
      return;
    }

    let updatedFormData = {
      ...formData,
      logo: undefined,
      externalLinks: externalLinks!,
    };

    if (previewSource) {
      const base64EncodedImage =
        previewSource instanceof ArrayBuffer
          ? Buffer.from(previewSource).toString("base64")
          : previewSource;
      const returnedLogo = await uploadImage(base64EncodedImage);
      updatedFormData = { ...updatedFormData, logo: returnedLogo.secure_url };
      setFormData(updatedFormData);
    }

    const dbArg = {
      recruiterId: recruiter.recruiter.id!,
      recruiter: updatedFormData,
    };

    dispatch(updateRecruiter(dbArg));

    navigate(`/${currentUser.role}/${currentUser.id}`);
  };

  //ExternalLinks media collecting
  const [externalLink, setExternalLink] = useState<string>("");
  const [externalLinks, setExternalLinks] = useState<(string | undefined)[]>(
    []
  );

  const handleExtLinkChange = (event: any) => {
    setExternalLink(event.target.value);
  };

  const handleDeleteLink = (index: number) => {
    const updatedLinks = [...externalLinks];
    updatedLinks.splice(index, 1);
    setExternalLinks(updatedLinks);
  };

  const handleAddLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setExternalLinks([...externalLinks, externalLink]);
    setExternalLink("");
  };

  return (
    <>
      <div className="p-2 flex items-center justify-center w-full">
        <form>
          <div className="grid grid-cols-1 mt-5 mx-7 flex ">
            <label
              htmlFor="name"
              className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
            >
              Company Name
            </label>
            <input
              className="py-2 px-3 rounded-lg border border-color-#F1F0EA mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1">
              <label
                htmlFor="founded"
                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
              >
                Founded
              </label>
              <input
                className="py-2 px-3 rounded-lg border-1 border-#F1F0EA mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                type="text"
                id="founded"
                name="founded"
                value={formData.founded}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1">
              <label
                htmlFor="headOffice"
                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
              >
                Head office
              </label>
              <input
                className="py-2 px-3 rounded-lg border border-#F1F0EA mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                type="text"
                id="headOffice"
                name="headOffice"
                value={formData.headOffice}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label
              htmlFor="about"
              className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
            >
              About
            </label>
            <textarea
              className="py-2 px-3 rounded-lg border border-color-#F1F0EA mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
              type="text"
              id="about"
              name="about"
              value={formData.about}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label
              htmlFor="externalLinks"
              className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
            >
              Add your external Links
            </label>

            <div className="flex flex-row items-center">
              <input
                className="py-2 px-3 w-full rounded-lg border border-#F1F0EA mt-1 focus:outline-none focus:ring-2 focus:ring-#568EA3 focus:border-transparent"
                type="text"
                id="externalLinks"
                name="externalLinks"
                value={externalLink}
                onChange={handleExtLinkChange}
              />

              <button
                onClick={handleAddLink}
                className="bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white py-2 px-6 ml-4 h-10 mt-1 whitespace-nowrap"
              >
                Add more
              </button>
            </div>
            <ul>
              {externalLinks.map((link, index) => (
                <li key={index}>
                  {link}
                  <button
                    onClick={() => handleDeleteLink(index)}
                    className="ml-2 mt-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 focus:outline-none"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 text-white"
                    >
                      <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label
              htmlFor="logo"
              className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1"
            >
              Upload Logo
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="border-4 border-dashed w-32 rounded-full h-32 hover:bg-gray-100 hover:border-dark-green group">
                {previewSource && (
                  <img
                    src={previewSource}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                )}
                <div className="flex flex-col items-center justify-center pt-7">
                  {!previewSource && (
                    <>
                      <svg
                        className="w-10 h-10 text-orange-100 group-hover:text-orange-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <p className="lowercase text-sm text-gray-400 group-hover:text-orange-300 pt-1 tracking-wider">
                        Select a photo
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  onChange={handleFileInputChange}
                  value={fileInputState}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
            <button
              onClick={onCancel}
              className="w-auto bg-green-100 hover:bg-dark-green rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              Cancel
            </button>
            <button
              onClick={(e) => handleCreateRecruiter(e)}
              className="w-auto bg-orange-100 hover:bg-orange-dark rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RecruiterForm;
