import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { Applicant, Track } from "../Interfaces"

import { RootState } from "./store";


const initialApplicant: Applicant = {
  idDB: 0,
  idAuth: '',
  email: '',
  picture: '',
  name: '',
  familyName: '',
  age: 0,
  phone: '',
  location: '',
  inProgressApplications: [],
  coordinateX: '',
  coordinateY: '',
  readyToMove: false,
  workingHours: '',
  workingModal: '',
  socialMedia: [],
  skillsProf: [],
  stack: [],
  compLanguages: [],
  about: '',
  video: '',
  education: [],
  experiences: [],
  languages: [],
  hobbies: [],
  salaryRange: 0,
  desiredLocation: '',
  nonDesiredLocation: '',
  desiredWorkingModal: '',
}


const url:string = 'http://localhost:3000'

const fetchApplicant  = createAsyncThunk (
  'applicant/fetchapplicant',
  async function (_, {rejectWithValue}) {
    try {
      const response = await fetch (url + '/applicant/5')
      if (!response.ok) {
        throw new Error('Server error')
      }
      const data = await response.json()
      console.log("DATA FROM REDUX THUNK : ", data)
      return data
    } catch (err) {
      if (err instanceof Error)
      return rejectWithValue(err.message)
    }    
  }
)

interface IInitialState {
  applicant: Applicant,
    status: 'loading' | 'resolved' | 'rejected' | null,
    error: null | Error
}


export const applicantSlice = createSlice<IInitialState, { setApplicant: (_state: IInitialState, action: {payload:any})=> void }>({
  name: 'applicant',
  initialState: {
    applicant: initialApplicant,
    status: null,
    error: null
  },
  reducers: {
    setApplicant: (_state, action) => {
      return action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplicant.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchApplicant.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as Error;
      })
      .addCase(fetchApplicant.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.applicant = action.payload;
        state.error = null;
      })
  }
});


export const { setApplicant } = applicantSlice.actions;
export { fetchApplicant }

export const selectapplicant = (state : RootState) => state.applicant

export default applicantSlice.reducer;
