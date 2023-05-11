import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Applicant, Track } from "../Interfaces";

import { RootState } from "./store";

const initialApplicant: Applicant = {
  idDB: 0,
  idAuth: "",
  email: "",
  picture: "",
  name: "",
  familyName: "",
  age: new Date(),
  phone: "",
  location: "",
  track: [],
  currentLocation: [],
  readyToMove: false,
  workingHours: "",
  workingModal: "",
  socialMedia: [],
  skillsProf: [],
  stack: [],
  compLanguages: [],
  about: "",
  video: "",
  education: [],
  experiences: [],
  languages: [],
  hobbies: [],
  salaryRange: 0,
  desiredLocation: [],
  nonDesiredLocation: [],
  desiredWorkingModal: "",
};

const url: string = "http://localhost:3000";

const fetchApplicant = createAsyncThunk(
  "applicant/fetchapplicant",
  async function (applicantId: number, { rejectWithValue }) {
    console.log(applicantId);
    try {
      const response = await fetch(`${url}/applicant/${applicantId}`);
      if (!response.ok) {
        throw new Error("Server error");
      }
      const data = await response.json();
      // console.log("DATA FROM REDUX THUNK : ", data);
      return data;
    } catch (err) {
      if (err instanceof Error) return rejectWithValue(err.message);
    }
  }
);

const fetchAllApplicants = createAsyncThunk(
  "applicant/fetchAllApplicants",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(url + "/applicants");
      if (!response.ok) {
        throw new Error("Server error");
      }
      const data = await response.json();
      //console.log("ALL APPLICANTS : ", data);
      return data;
    } catch (err) {
      if (err instanceof Error) return rejectWithValue(err.message);
    }
  }
);

const fetchFilteredApplicants = createAsyncThunk(
  "applicant/fetchFilteredApplicants",

  async function (query: string, { rejectWithValue }) {
    try {
      const response = await fetch(url + `/filterApplicants/${query}`);
      if (!response.ok) {
        throw new Error("Server error");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      if (err instanceof Error) return rejectWithValue(err.message);
    }
  }
);

const createApplicant = createAsyncThunk(
  "applicant/createApplicant",
  async function (applicant: Applicant, { rejectWithValue }) {
    console.log(applicant);
    try {
      const response = await fetch(url + "/createApplicant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicant),
      });
      if (!response.ok) {
        throw new Error("Server error");
      }
      const data = await response.json();
      console.log("inside create Applicant");
      const filteredData = {
        ...data,
        message: {
          ...data.message,
          date: undefined, // Exclude the non-serializable date value
        },
      };
      console.log(filteredData);
      return filteredData;
      //return data;
    } catch (err) {
      if (err instanceof Error) {
        console.log("bad things have happened");
        return rejectWithValue(err.message);
      }
    }
  }
);

const deleteApplicant = createAsyncThunk(
  "applicant/deleteApplicant",
  async function (applicantId: number, { rejectWithValue }) {
    try {
      const response = await fetch(`${url}/deleteApplicant/${applicantId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Server error");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      if (err instanceof Error) return rejectWithValue(err.message);
    }
  }
);

interface IPutParams {
  applicantId: number;
  applicant: any;
}

//How will we call it!!!!!!!!!!!
// const testPut = {
//   applicantId: 1,
//   applicant: {email: 'newemail'}
// }
// updateApplicant(testPut)

const updateApplicant = createAsyncThunk(
  "applicant/updateApplicant",
  async function ({ applicantId, applicant }: IPutParams, { rejectWithValue }) {
    try {
      const coordinates = await fetchCityCoordinates(applicant.location);
      if (coordinates) {
        applicant.currentLocation = [
          coordinates.lat.toString(),
          coordinates.lng.toString(),
        ];
      }
      const response = await fetch(url + `/updateApplicant/${applicantId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicant),
      });
      if (!response.ok) {
        throw new Error("Server error");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      if (err instanceof Error) return rejectWithValue(err.message);
    }
  }
);

interface IInitialState {
  applicant: Applicant;
  status: "loading" | "resolved" | "rejected" | null;
  error: null | Error;
}

export const applicantSlice = createSlice<
  IInitialState,
  { setApplicant: (_state: IInitialState, action: { payload: any }) => void }
>({
  name: "applicant",
  initialState: {
    applicant: initialApplicant,
    status: null,
    error: null,
  },
  reducers: {
    setApplicant: (_state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //getOne
      .addCase(fetchApplicant.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchApplicant.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(fetchApplicant.fulfilled, (state, action) => {
        state.status = "resolved";
        state.applicant = action.payload;
        state.error = null;
      })
      //getAll
      .addCase(fetchAllApplicants.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllApplicants.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(fetchAllApplicants.fulfilled, (state, action) => {
        state.status = "resolved";
        state.applicant = action.payload;
        state.error = null;
      })
      //getFiltered
      .addCase(fetchFilteredApplicants.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFilteredApplicants.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(fetchFilteredApplicants.fulfilled, (state, action) => {
        state.status = "resolved";
        state.applicant = action.payload;
        state.error = null;
      })
      //create
      .addCase(createApplicant.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createApplicant.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(createApplicant.fulfilled, (state, action) => {
        state.status = "resolved";
        state.applicant = action.payload;
        state.error = null;
      })
      //delete
      .addCase(deleteApplicant.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteApplicant.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(deleteApplicant.fulfilled, (state, action) => {
        state.status = "resolved";
        state.applicant = action.payload;
        state.error = null;
      })
      //update
      .addCase(updateApplicant.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateApplicant.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(updateApplicant.fulfilled, (state, action) => {
        state.status = "resolved";
        state.applicant = action.payload;
        state.error = null;
      });
  },
});

export { initialApplicant };

export const { setApplicant } = applicantSlice.actions;
export {
  fetchApplicant,
  fetchAllApplicants,
  fetchFilteredApplicants,
  createApplicant,
  deleteApplicant,
  updateApplicant,
};

export const selectapplicant = (state: RootState) => state.applicant;

export default applicantSlice.reducer;

const fetchCityCoordinates = async (
  cityName: string
): Promise<google.maps.LatLngLiteral | null> => {
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
