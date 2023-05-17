const url: string = "http://localhost:3000";

export const getVacancy = async function (vacancyId: number, thunk: any) {
  try {
    const response = await fetch(`${url}/vacancy/${vacancyId}`);
    if (!response.ok) {
      throw new Error("Server error");
    }
    const data = await response.json();
    // console.log("DATA FROM REDUX 1 id : ", data);
    return data;
  } catch (err) {
    if (err instanceof Error && thunk)
      return thunk.rejectWithValue(err.message);
    else if (err instanceof Error) {
      return err.message;
    }
  }
};

export const getRecruiter = async function (recruiterId: number, thunk: any) {
  try {
    const response = await fetch(`${url}/recruiter/${recruiterId}`);
    if (!response.ok) {
      throw new Error("Server error");
    }
    const data = await response.json();
    // console.log("RECRUTER FROM REDUX THUNK : ", data);
    return data;
  } catch (err) {
    if (err instanceof Error && thunk)
      return thunk.rejectWithValue(err.message);
    else if (err instanceof Error) {
      return err.message;
    }
  }
};

export const getApplicant = async function (applicantId: number, thunk: any) {
  try {
    const response = await fetch(`${url}/applicant/${applicantId}`);
    if (!response.ok) {
      throw new Error("Server error");
    }
    const data = await response.json();
    // console.log("DATA FROM REDUX THUNK : ", data);
    return data;
  } catch (err) {
    if (err instanceof Error && thunk)
      return thunk.rejectWithValue(err.message);
    else if (err instanceof Error) {
      return err.message;
    }
  }
};

export const getFilteredApplicants = async function (url2: URL, thunk: any) {
  try {
    const response = await fetch(url2);
    if (!response.ok) {
      throw new Error("Server error");
    }
    const data = await response.json();
    console.log("data we need", data);
    return data;
  } catch (err) {
    if (err instanceof Error && thunk)
      return thunk.rejectWithValue(err.message);
    else if (err instanceof Error) {
      return err.message;
    }
  }
};
