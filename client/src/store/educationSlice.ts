import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { RootState } from "./store";

import { initialApplicant } from "./applicantSlice";
import { Education } from "../Interfaces";


const initialEducation = {
  // id: 0,
  place: '',
  startDate: new Date(),
  endDate: new Date(),
  degree: '',
  speciality: '',
  // applicant: initialApplicant,
  // applicantIdDB: 0
}

const url:string = 'http://localhost:3000'

const fetchEducationByApplicant  = createAsyncThunk (
  'education/fetchEducationByApplicant',
  async function (applicantId: number, {rejectWithValue}) {
    try {
      const response = await fetch (`${url}/education/${applicantId}`)
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
  education: Education
}

const createEducation = createAsyncThunk(
  'education/createEducation',
  async function ({applicantId, education}: IPostParams, { rejectWithValue }) {
    try {
      const response = await fetch(`${url}/createEducationTitle/${applicantId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(education),
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
  education: Education,
    status: 'loading' | 'resolved' | 'rejected' | null,
    error: null | Error
}


export const educationSlice = createSlice<IInitialState, { setEducation: (_state: IInitialState, action: {payload:any})=> void }>({
  name: 'education',
  initialState: {
    education: initialEducation,
    status: null,
    error: null
  },
  reducers: {
    setEducation: (_state, action) => {
      return action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      //get all educations by applicant
      .addCase(fetchEducationByApplicant.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEducationByApplicant.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as Error;
      })
      .addCase(fetchEducationByApplicant.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.education = action.payload;
        state.error = null;
      })
      //post one education by applicant
      .addCase(createEducation.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createEducation.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as Error;
      })
      .addCase(createEducation.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.education = action.payload;
        state.error = null;
      })
  }
});

export { initialEducation }

export const { setEducation } = educationSlice.actions;
export { fetchEducationByApplicant, createEducation }

export const selecteducation = (state : RootState) => state.education

export default educationSlice.reducer;