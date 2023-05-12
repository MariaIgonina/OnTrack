import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { fetchAllApplicants } from "../../store/applicantSlice";
import { useDispatch, useSelector } from "react-redux";
import { Applicant } from "../../Interfaces";
import { AppDispatch, RootState } from "../../store/store";

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
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    null
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDaIfGIGsLwAdkkp3mxtP_9AF7_YXIybBs",
  });
  const applicants = useSelector(
    (s: RootState) => s.applicant.applicant
  ) as unknown as Applicant[]; //THIS IS BAD TYPESCRIPT REFACTOR THIS ROSIE
  const dispatch = useDispatch<AppDispatch>();
  console.log("googlemapsapplicats", applicants);

  useEffect(() => {
    dispatch(fetchAllApplicants());
  }, [dispatch]);

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

  return isLoaded ? (
    <div className="flex justify-end">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center as google.maps.LatLngLiteral}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {applicants.length > 0 &&
          applicants.map((applicant) => (
            <Marker
              key={applicant.idAuth}
              position={{
                lat: Number(applicant.currentLocation[0]),
                lng: Number(applicant.currentLocation[1]),
              }}
              onClick={() => setSelectedApplicant(applicant)}
              icon={{
                url: applicant.picture,
                scaledSize: new window.google.maps.Size(40, 40),
                anchor: new window.google.maps.Point(20, 20),
              }}
            />
          ))}
        {selectedApplicant && (
          <InfoWindow
            position={{
              lat: Number(selectedApplicant.currentLocation[0]),
              lng: Number(selectedApplicant.currentLocation[1]),
            }}
            onCloseClick={() => setSelectedApplicant(null)}
          >
            <div className="text-sm">
              <img
                src={selectedApplicant.picture}
                alt={selectedApplicant.name}
                className="w-24 mb-2 rounded-full"
              />
              <h2 className="font-semibold">
                {selectedApplicant.name} {selectedApplicant.familyName}
              </h2>
              <p>Stack: {selectedApplicant.stack}</p>
              <p>Skills: {selectedApplicant.skillsProf}</p>
              <p>Email: {selectedApplicant.email}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default GoogleMaps;
