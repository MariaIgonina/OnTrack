import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { Track } from "../Interfaces"

import { RootState } from "./store";

import { initialVacancy } from "./vacancySlice";

import { initialApplicant } from "./applicantSlice";
import { initialRecruiter } from "./recruiterSlice";

const initialTrack: Track = {
  id: 0,
  steps: [],
  recruiterID: 0,
  applicantID: 0,
  reject: false,
  notes: '',
  vacancy: initialVacancy,
  vacancyId: 0,
  message: [],
  applicant: initialApplicant,
  recruiter: initialRecruiter
}


const url:string = 'http://localhost:3000'

const fetchTrack  = createAsyncThunk (
  'track/fetchtrack',
  async function (_, {rejectWithValue}) {
    try {
      const response = await fetch (url + '/track/1')
      if (!response.ok) {
        throw new Error('Server error')
      }
      const data = await response.json()
      console.log("TRACK FROM REDUX THUNK : ", data)
      return data
    } catch (err) {
      if (err instanceof Error)
      return rejectWithValue(err.message)
    }    
  }
)

const createTrack = createAsyncThunk(
  'track/createtrack',
  async function (track: Track, { rejectWithValue }) {
    try {
      const response = await fetch(url + '/recruiter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(track),
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
  track: Track,
    status: 'loading' | 'resolved' | 'rejected' | null,
    error: null | Error
}


export const trackSlice = createSlice<IInitialState, { setTrack: (_state: IInitialState, action: {payload:any})=> void }>({
  name: 'track',
  initialState: {
    track: initialTrack,
    status: null,
    error: null
  },
  reducers: {
    setTrack: (_state, action) => {
      return action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      //getOne
      .addCase(fetchTrack.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTrack.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as Error;
      })
      .addCase(fetchTrack.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.track = action.payload;
        state.error = null;
      })
      // post
      .addCase(createTrack.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createTrack.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as Error;
      })
      .addCase(createTrack.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.track = action.payload;
        state.error = null;
      })
  }
});


export const { setTrack } = trackSlice.actions;
export { fetchTrack, createTrack }

export const selecttrack = (state : RootState) => state.track

export default trackSlice.reducer;