export const fetchCitySuggestionsFromServer = async (
  input: string
): Promise<string[]> => {
  try {
    console.log("Fetching city suggestions");
    const response = await fetch(
      `http://localhost:3000/city-suggestions?input=${encodeURIComponent(
        input
      )}`
    );
    console.log("Received city suggestions");
    if (!response.ok) {
      throw new Error("Error fetching city suggestions");
    }
    console.log("response helper:", response);
    const data = await response.json();
    console.log("data helper:", data);
    return data.predictions.map((prediction: any) => prediction.description);
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return [];
  }
};
