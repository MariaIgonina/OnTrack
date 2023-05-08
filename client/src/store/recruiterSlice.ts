import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { Recruiter } from "../Interfaces"

import { RootState } from "./store";


const initialRecruiter: Recruiter = {
  id: 0,
  name: '',
  vacancies: [],
  logo: '',
  founded: '',
  about: '',
  externalLinks: [],
  headOffice: '',
  track: []
}


const url:string = 'http://localhost:3000'

const fetchRecruiter  = createAsyncThunk (
  'recruiter/fetchrecruiter',
  async function (_, {rejectWithValue}) {
    try {
      const response = await fetch (url + '/recruiter/1')
      if (!response.ok) {
        throw new Error('Server error')
      }
      const data = await response.json()
      console.log("RECRUTER FROM REDUX THUNK : ", data)
      return data
    } catch (err) {
      if (err instanceof Error)
      return rejectWithValue(err.message)
    }    
  }
)

interface IInitialState {
  recruiter: Recruiter,
    status: 'loading' | 'resolved' | 'rejected' | null,
    error: null | Error
}


export const recruiterSlice = createSlice<IInitialState, { setRecruiter: (_state: IInitialState, action: {payload:any})=> void }>({
  name: 'recruter',
  initialState: {
    recruiter: initialRecruiter,
    status: null,
    error: null
  },
  reducers: {
    setRecruiter: (_state, action) => {
      return action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecruiter.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRecruiter.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as Error;
      })
      .addCase(fetchRecruiter.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.recruiter = action.payload;
        state.error = null;
      })
  }
});


export const { setRecruiter } = recruiterSlice.actions;
export { fetchRecruiter }

export const selectrecruiter = (state : RootState) => state.recruiter

export default recruiterSlice.reducer;
