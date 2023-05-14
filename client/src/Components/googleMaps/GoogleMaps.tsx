import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { fetchAllApplicants } from "../../store/applicantSlice";
import { useDispatch, useSelector } from "react-redux";
import { Applicant, CurrentUserType } from "../../Interfaces";
import { AppDispatch, RootState } from "../../store/store";
import { fetchAllVacancies } from "../../store/vacancySlice";
import { Vacancy } from "../../Interfaces";
import { Link } from "react-router-dom";
import defaultAvatar from "../../assets/defaultAvatar.png";

const containerStyle = {
  width: "100%",
  height: "400px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
  borderRadius: "10px",
};

const center = {
  lat: 41.3828939,
  lng: 2.1774322,
};

interface ICenter {
  lat: number;
  lng: number;
}

const GoogleMaps: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<
    Applicant | Vacancy | null
  >(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDaIfGIGsLwAdkkp3mxtP_9AF7_YXIybBs",
  });
  const applicants = useSelector(
    (s: RootState) => s.applicant.applicant
  ) as unknown as Applicant[]; //THIS IS BAD TYPESCRIPT REFACTOR THIS ROSIE
  const vacancies = useSelector(
    (state: RootState) => state.vacancy.vacancies
  ) as unknown as Vacancy[];

  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(
    (s: RootState) => s.currentUser
  ) as unknown as CurrentUserType;

  useEffect(() => {
    console.log("IDDDDD from googlemaps page!!!", currentUser.role);
    if (currentUser.role === "recruiter") {
      dispatch(fetchAllApplicants());
    }
    if (currentUser.role === "applicant") {
      dispatch(fetchAllVacancies());
    }
  }, [dispatch, currentUser]);

  const mapper = currentUser.role === "recruiter" ? applicants : vacancies;
  console.log("MAPPER:", mapper);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const onLoad = useCallback((map: google.maps.Map) => {
    // const bounds = new window.google.maps.LatLngBounds(
    //   center as google.maps.LatLngLiteral
    // );
    // map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);
  const isValidURL = (url: any) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  return isLoaded ? (
    <div className="flex justify-end">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center as google.maps.LatLngLiteral}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {mapper.length > 0 &&
          mapper.map((element) => (
            <Marker
              key={element.idAuth || element.id}
              position={{
                lat: Number(element.currentLocation[0]),
                lng: Number(element.currentLocation[1]),
              }}
              onClick={() => setSelectedElement(element)}
              icon={
                currentUser.role === "recruiter"
                  ? {
                      url: element?.picture ? element?.picture : defaultAvatar,
                      scaledSize: new window.google.maps.Size(40, 40),
                      anchor: new window.google.maps.Point(20, 20),
                    }
                  : {
                      url:
                        element?.recruiter.logo &&
                        isValidURL(element.recruiter.logo)
                          ? element.recruiter.logo
                          : defaultAvatar,
                      scaledSize: new window.google.maps.Size(40, 40),
                      anchor: new window.google.maps.Point(20, 20),
                    }
              }
            />
          ))}
        {selectedElement && (
          <InfoWindow
            position={{
              lat: Number(selectedElement.currentLocation[0]),
              lng: Number(selectedElement.currentLocation[1]),
            }}
            onCloseClick={() => setSelectedElement(null)}
          >
            {currentUser.role === "recruiter" ? (
              <div className="text-sm">
                <img
                  src={(selectedElement as Applicant).picture || defaultAvatar}
                  alt={(selectedElement as Applicant).name}
                  className="w-24 mb-2 rounded-full"
                />
                <h2 className="font-semibold">
                  <Link
                    to={`/applicant/${(selectedElement as Applicant).id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {(selectedElement as Applicant).name}{" "}
                    {(selectedElement as Applicant).familyName}
                  </Link>
                </h2>
                <p>Stack: {(selectedElement as Applicant).stack}</p>
                <p>Skills: {(selectedElement as Applicant).skillsProf}</p>
                <p>Email: {(selectedElement as Applicant).email}</p>
              </div>
            ) : (
              <div className="text-sm">
                <img
                  src={
                    (selectedElement as Vacancy).recruiter?.logo ||
                    defaultAvatar
                  }
                  alt={(selectedElement as Vacancy).title}
                  className="w-24 mb-2 rounded-full"
                />
                <h2 className="font-semibold">
                  <Link
                    to={`/vacancy/${(selectedElement as Vacancy).id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {(selectedElement as Vacancy).title}
                  </Link>
                </h2>
                <p>Stack: {(selectedElement as Vacancy).stack}</p>
                <p>About: {(selectedElement as Vacancy).about}</p>
                <p>Salary Range: {(selectedElement as Vacancy).salaryRange}</p>
              </div>
            )}
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default GoogleMaps;
