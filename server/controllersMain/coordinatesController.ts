interface LatLngLiteral {
  lat: number;
  lng: number;
}

export const fetchCityCoordinates = async (
  cityName: string
): Promise<LatLngLiteral | null> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        cityName
      )}&key=AIzaSyDaIfGIGsLwAdkkp3mxtP_9AF7_YXIybBs`
    );
    const data = await response.json();

    if (data.status === "OK") {
      const coordinates = data.results[0].geometry.location;
      return { lat: coordinates.lat, lng: coordinates.lng };
    }
  } catch (error) {
    console.error("Error fetching city coordinates:", error);
  }

  return null;
};
