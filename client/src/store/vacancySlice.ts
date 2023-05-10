import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { Vacancy } from "../Interfaces"

import { RootState } from "./store";

import { initialRecruiter } from "./recruiterSlice";

const initialVacancy: Vacancy = {
  id: 0,
  recruiter: initialRecruiter,
  recruiterId: 0,
  about: '',
  title: '',
  jobTrack: [],
  workingHours: '',
  workingModal: '',
  skills: [],
  stack: [],
  requiredLanguages: [],
  experience: 0,
  location: '',
  salaryRange: 0,
}


const url:string = 'http://localhost:3000'

const fetchVacancy  = createAsyncThunk (
  'vacancy/fetchvacancy',
  async function (vacancyId: number, {rejectWithValue}) {
    try {
      const response = await fetch (`${url}/vacancy/${vacancyId}`)
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

const fetchAllVacancies  = createAsyncThunk (
  'vacancies/fetchallvacancies',
  async function (_, {rejectWithValue}) {
    try {
      const response = await fetch (url + '/vacanciesAll')
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

const createVacancy = createAsyncThunk(
  'vacancy/createVacancy',
  async function (vacancy: Vacancy, { rejectWithValue }) {
    try {
      const response = await fetch(url + '/createVacancy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vacancy),
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

const deleteVacancy = createAsyncThunk(
  'vacancy/deleteVacancy',
  async function (vacancyId: number, { rejectWithValue }) {
    try {
      const response = await fetch(`${url}/deleteVacancy/${vacancyId}`, {
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

interface IPutParams {
  vacancyId: number
  vacancy: any
}

const updateVacancy = createAsyncThunk(
  'vacancy/updateVacancy',
  async function ({vacancyId, vacancy}: IPutParams, { rejectWithValue }) {
    try {
      const response = await fetch(url + `/updateVacancy/${vacancyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vacancy),
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
  vacancy: Vacancy,
    status: 'loading' | 'resolved' | 'rejected' | null,
    error: null | Error
}


export const vacancySlice = createSlice<IInitialState, { setVacancy: (_state: IInitialState, action: {payload:any})=> void }>({
  name: 'vacancy',
  initialState: {
    vacancy: initialVacancy,
    status: null,
    error: null
  },
  reducers: {
    setVacancy: (_state, action) => {
      return action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      //getOne
      .addCase(fetchVacancy.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchVacancy.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as Error;
      })
      .addCase(fetchVacancy.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.vacancy = action.payload;
        state.error = null;
      })
      //getAll
      .addCase(fetchAllVacancies.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllVacancies.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as Error;
      })
      .addCase(fetchAllVacancies.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.vacancy = action.payload;
        state.error = null;
      })
      // post
      .addCase(createVacancy.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createVacancy.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as Error;
      })
      .addCase(createVacancy.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.vacancy = action.payload;
        state.error = null;
      })
      // delete
      .addCase(deleteVacancy.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteVacancy.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as Error;
      })
      .addCase(deleteVacancy.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.vacancy = action.payload;
        state.error = null;
      })
      // update
      .addCase(updateVacancy.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateVacancy.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as Error;
      })
      .addCase(updateVacancy.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.vacancy = action.payload;
        state.error = null;
      })
  }
});

export { initialVacancy }

export const { setVacancy } = vacancySlice.actions;
export { fetchVacancy, fetchAllVacancies, createVacancy, deleteVacancy, updateVacancy }

export const selectvacancy = (state : RootState) => state.vacancy

export default vacancySlice.reducer;
