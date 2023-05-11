import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { RootState } from "./store";

import { initialApplicant } from "./applicantSlice";

import { Experience } from "../Interfaces";


const initialExperience: Experience = {
  id: 0,
  jobTitle: '',
  company: '',
  startDate: new Date(),
  endDate: new Date(),
  description: '',
  applicant: initialApplicant,
  applicantId: 0,
}

const url:string = 'http://localhost:3000'

const fetchExperienceByApplicant  = createAsyncThunk (
  'experience/fetchExperienceByApplicant',
  async function (applicantId: number, {rejectWithValue}) {
    try {
      const response = await fetch (`${url}/experience/${applicantId}`)
      if (!response.ok) {
        throw new Error('Server error')
      }
      const data = await response.json()
      // console.log("DATA FROM REDUX THUNK : ", data)
      return data
    } catch (err) {
      if (err instanceof Error)
      return rejectWithValue(err.message)
    }    
  }
)

interface IPostParams {
  applicantId: number
  experience: Experience
}

const createExperience = createAsyncThunk(
  'experience/createExperience',
  async function ({applicantId, experience}: IPostParams, { rejectWithValue }) {
    try {
      const response = await fetch(`${url}/createExperience/${applicantId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(experience),
      });
      if (!response.ok) {
        throw new Error('Server error');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      if (err instanceof Error) return rejectWithValue(err.message);
    }
  }
);


interface IInitialState {
  experience: Experience,
    status: 'loading' | 'resolved' | 'rejected' | null,
    error: null | Error
}


export const experienceSlice = createSlice<IInitialState, { setExperience: (_state: IInitialState, action: {payload:any})=> void }>({
  name: 'experience',
  initialState: {
    experience: initialExperience,
    status: null,
    error: null
  },
  reducers: {
    setExperience: (_state, action) => {
      return action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      //get all experiences by applicant
      .addCase(fetchExperienceByApplicant.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchExperienceByApplicant.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as Error;
      })
      .addCase(fetchExperienceByApplicant.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.experience = action.payload;
        state.error = null;
      })
      //post one experience by applicant
      .addCase(createExperience.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createExperience.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as Error;
      })
      .addCase(createExperience.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.experience = action.payload;
        state.error = null;
      })
  }
});

export { initialExperience }

export const { setExperience } = experienceSlice.actions;
export { fetchExperienceByApplicant, createExperience }

export const selectexperience = (state : RootState) => state.experience

export default experienceSlice.reducer;
