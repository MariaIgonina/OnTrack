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
  async function (recruiterId: number, {rejectWithValue}) {
    try {
      const response = await fetch (`${url}/recruiter/${recruiterId}`)
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

const createRecruiter = createAsyncThunk(
  'recruiter/createRecruiter',
  async function (recruiter: Recruiter, { rejectWithValue }) {
    try {
      const response = await fetch(url + '/createRecruiter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recruiter),
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

const deleteRecruiter = createAsyncThunk(
  'recruiter/deleteRecruiter',
  async function (recruiterId: number, { rejectWithValue }) {
    try {
      const response = await fetch(`${url}/deleteRecruiter/${recruiterId}`, {
        method: 'DELETE',
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

const updateRecruiter = createAsyncThunk(
  'recruiter/updateRecruiter',
  async function (recruiterId: number, recruiter: Recruiter, { rejectWithValue }) {
    try {
      const response = await fetch(url + `/updateRecruiter/${recruiterId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recruiter),
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
  recruiter: Recruiter,
    status: 'loading' | 'resolved' | 'rejected' | null,
    error: null | Error
}


export const recruiterSlice = createSlice<IInitialState, { setRecruiter: (_state: IInitialState, action: {payload:any})=> void }>({
  name: 'recruiter',
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
      //getOne
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
      //post
      .addCase(createRecruiter.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createRecruiter.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as Error;
      })
      .addCase(createRecruiter.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.recruiter = action.payload;
        state.error = null;
      })
      //delete
      .addCase(deleteRecruiter.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteRecruiter.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as Error;
      })
      .addCase(deleteRecruiter.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.recruiter = action.payload;
        state.error = null;
      })
      //update
      .addCase(updateRecruiter.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateRecruiter.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as Error;
      })
      .addCase(updateRecruiter.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.recruiter = action.payload;
        state.error = null;
      })

  }
});

export { initialRecruiter }

export const { setRecruiter } = recruiterSlice.actions;

export { fetchRecruiter, createRecruiter, deleteRecruiter, updateRecruiter }

export const selectrecruiter = (state : RootState) => state.recruiter

export default recruiterSlice.reducer;
