import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { socket } from "./socket"; // Change this import to get the socket from the store
import { Videocall, Track } from "../Interfaces";

import { RootState } from "./store";

import { initialTrack } from "./trackSlice";

const initialVideocall: Videocall = {
  id: 0,
  type: '',
  date: '',
  order: 0,
  link: '',
  title: '',
  status: false,
  hidden: false,
  Track: initialTrack,
  trackId: 0,
};



const url: string = "http://localhost:3000";

const fetchVideocallsByTrack = createAsyncThunk(
  "videocall/fetchVideocallByTrack",
  async function (trackId: number, { rejectWithValue }) {
    try {
      const response = await fetch(`${url}/videocallsByTrack/${trackId}`);
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

const createVideocall = createAsyncThunk(
  "videocall/createVideocall",
  async function (videocall: Videocall, { rejectWithValue }) {
    try {
      const response = await fetch(url + "/createVideocall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videocall),
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

const deleteVideocall = createAsyncThunk(
  "videocall/deleteVideocall",
  async function (videocallId: number, { rejectWithValue }) {
    try {
      const response = await fetch(`${url}/deleteVideocall/${videocallId}`, {
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
  videocallId: number;
  videocall: any;
}

const updateVideocall = createAsyncThunk(
  "videocall/updateVideocall",
  async function ({ videocallId, videocall }: IPutParams, { rejectWithValue }) {
    try {
      const response = await fetch(url + `/updateVideocall/${videocallId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videocall),
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
  videocall: Videocall,
    status: 'loading' | 'resolved' | 'rejected' | null,
    error: null | Error
}

export const videocallSlice = createSlice<IInitialState, { setVideocall: (_state: IInitialState, action: {payload:any})=> void }>({
  name: 'videocall',
  initialState: {
    videocall: initialVideocall,
    status: null,
    error: null
  },
  reducers: {
    setVideocall: (_state, action) => {
      return action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      //get by track id
      .addCase(fetchVideocallsByTrack.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchVideocallsByTrack.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(fetchVideocallsByTrack.fulfilled, (state, action) => {
        state.status = "resolved";
        state.videocall = action.payload;
        state.error = null;
      })
      // post
      .addCase(createVideocall.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createVideocall.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(createVideocall.fulfilled, (state, action) => {
        state.status = "resolved";
        state.videocall = action.payload;
        state.error = null;
      })
      // delete
      .addCase(deleteVideocall.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteVideocall.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(deleteVideocall.fulfilled, (state, action) => {
        state.status = "resolved";
        state.videocall = action.payload;
        state.error = null;
      })
      // update
      .addCase(updateVideocall.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateVideocall.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(updateVideocall.fulfilled, (state, action) => {
        state.status = "resolved";
        state.videocall = action.payload;
        state.error = null;
      });
    },
  }
);

export const { setVideocall } = videocallSlice.actions;

export { fetchVideocallsByTrack, createVideocall, deleteVideocall, updateVideocall };

export const selectvideocall = (state: RootState) => state.videocall;

export default videocallSlice.reducer;
