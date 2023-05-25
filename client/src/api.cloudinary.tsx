const url = "http://localhost:3000/";

export const uploadImage = async (base64EncodedImage: string) => {

    try {
      const response = await fetch(`${url}postToCloudinary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: base64EncodedImage }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      return responseData;
    } catch (error: any) {
      console.error("Error:", error);
      throw new Error(error);
    }
  }


export const loadImages = async function () {
    try {
      const response = await fetch(`${url}getFromCloudinary`);
      if (!response.ok){
        throw new Error('Server error')
      }
      const data = await response.json();

    return data
} catch (error: any) {
    console.error("Error:", error);
    throw new Error(error);
  } 
}
