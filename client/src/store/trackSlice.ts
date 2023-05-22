import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Track } from "../Interfaces";

import { RootState } from "./store";

import { initialVacancy } from "./vacancySlice";
import { initialApplicant } from "./applicantSlice";
import { initialRecruiter } from "./recruiterSlice";
import { useState } from "react";
import React from "react";
import { ConstructionOutlined } from "@mui/icons-material";

const initialTrack: Track[] = []

const url: string = "http://localhost:3000";

interface IGetParams {
  getTrackByWhat:
    | "getTracksByVacancy"
    | "getTracksByRecruiter"
    | "getTracksByApplicant"
    | "getTrackById";
  id: number;
}

const fetchTrack = createAsyncThunk(
  "track/fetchtrack",
  async function ({ getTrackByWhat, id }: IGetParams, { rejectWithValue }) {
    try {
      const response = await fetch(`${url}/${getTrackByWhat}/${id}`);
      if (!response.ok) {
        throw new Error("Server error");
      }
      const data = await response.json();
      // console.log("TRACK FROM REDUX THUNK : ", data);
      return data;
    } catch (err) {
      if (err instanceof Error) return rejectWithValue(err.message);
    }
  }
);

const fetchTracksByRecruiter = createAsyncThunk(
  "track/fetchtracksbyrecruiter",
  async function ({ getTrackByWhat, id }: IGetParams, { rejectWithValue }) {

    try {
      const response = await fetch(`${url}/${getTrackByWhat}/${id}`);
      if (!response.ok) {
        throw new Error("Server error");
      }
      const data = await response.json();
      // console.log("TRACKS FROM REDUX THUNK : ", data);
      return data;
    } catch (err) {
      console.log("error in track slice");
      if (err instanceof Error) return rejectWithValue(err.message);
    }
  }
);

const createTrack = createAsyncThunk(
  "track/createtrack",
  async function (track: Track, { rejectWithValue }) {
    try {
      const response = await fetch(url + "/createTrack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(track),
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
const duplicateTrack = createAsyncThunk(
  "track/duplicateTrack",
  async function (newTrack: any, { rejectWithValue }) {
    try {
      const response = await fetch(url + "/duplicateTrack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTrack),
      });
      if (!response.ok) {
        throw new Error("Server error");
      }
      const data = await response.json();
      // console.log("DATA from duplicateTrack SLICE:", data);
      return data;
    } catch (err) {
      if (err instanceof Error) return rejectWithValue(err.message);
    }
  }
);

const deleteTrack = createAsyncThunk(
  "track/deleteTrack",
  async function (trackId: number, { rejectWithValue }) {
    try {
      const response = await fetch(`${url}/deletetrack/${trackId}`, {
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
  trackId: number;
  track: any;
}

const updateTrack = createAsyncThunk(
  "track/updateTrack",
  async function ({ trackId, track }: IPutParams, { rejectWithValue }) {
    try {
      const response = await fetch(url + `/updatetrack/${trackId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(track),
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
  track: Track[];
  status: "loading" | "resolved" | "rejected" | null;
  error: null | Error;
}

export const trackSlice = createSlice<
  IInitialState,
  { setTrack: (_state: IInitialState, action: { payload: any }) => void }
>({
  name: "track",
  initialState: {
    track: initialTrack,
    status: null,
    error: null,
  },
  reducers: {
    setTrack: (_state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //getOne
      .addCase(fetchTrack.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTrack.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(fetchTrack.fulfilled, (state, action) => {
        state.status = "resolved";
        state.track = action.payload;
        state.error = null;
      })
      //getbyRecruiter
      .addCase(fetchTracksByRecruiter.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTracksByRecruiter.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(fetchTracksByRecruiter.fulfilled, (state, action) => {
        state.status = "resolved";
        state.track = action.payload;
        state.error = null;
      })
      // post
      .addCase(createTrack.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createTrack.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(createTrack.fulfilled, (state, action) => {
        state.status = "resolved";
        state.track = action.payload;
        state.error = null;
      })
      // delete
      .addCase(deleteTrack.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteTrack.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(deleteTrack.fulfilled, (state, action) => {
        state.status = "resolved";
        state.track = action.payload;
        state.error = null;
      })
      // update
      .addCase(updateTrack.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateTrack.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(updateTrack.fulfilled, (state, action) => {
        state.status = "resolved";
        state.track = action.payload;
        state.error = null;
      });
  },
});

export { initialTrack };

export const { setTrack } = trackSlice.actions;

export {
  fetchTrack,
  createTrack,
  deleteTrack,
  updateTrack,
  fetchTracksByRecruiter,
  duplicateTrack,
};

export const selecttrack = (state: RootState) => state.track;

export default trackSlice.reducer;
