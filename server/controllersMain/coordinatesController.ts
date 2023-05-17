import { Request, Response } from "express";

import axios from "axios";

const MAPS_KEY = process.env.MAPS_KEY;
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
      )}&key=${MAPS_KEY}`
    );
    const data = await response.json();
    console.log("API response:", data);

    if (data.status === "OK") {
      const coordinates = data.results[0].geometry.location;
      return { lat: coordinates.lat, lng: coordinates.lng };
    }
  } catch (error) {
    console.error("Error fetching city coordinates:", error);
  }

  return null;
};

export const fetchCitySuggestions = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/autocomplete/json",
      {
        params: {
          input: req.query.input as string,
          types: "(cities)",
          key: process.env.MAPS_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    res.status(500).json({ error: "Error fetching city suggestions" });
  }
};
