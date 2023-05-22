import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { socket } from "./socket"; // Change this import to get the socket from the store
import { Sandbox, Track } from "../Interfaces";

import { RootState } from "./store";

import { initialTrack } from "./trackSlice";

const initialSandbox: Sandbox = {
  type: '',
  date: '',
  hidden: false,
  title: '',
  code: '',
  checked: false,
  Track: initialTrack,
  trackId: 0,
  status: false
};


const url: string = "http://localhost:3000";

const fetchSandboxesByTrack = createAsyncThunk(
  "sandbox/fetchSandboxesByTrack",
  async function (trackId: number, { rejectWithValue }) {
    try {
      const response = await fetch(`${url}/getcode/${trackId}`);
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

const createSandbox = createAsyncThunk(
  "sandbox/createSandbox",
  async function (sandbox: Sandbox, { rejectWithValue }) {
    try {
      const response = await fetch(url + "/createcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sandbox),
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

const deleteSandbox = createAsyncThunk(
  "sandbox/deleteSandbox",
  async function (sandboxId: number, { rejectWithValue }) {
    try {
      const response = await fetch(`${url}/deletecode/${sandboxId}`, {
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
  sandboxId: number;
  sandbox: any;
}

const updateSandbox = createAsyncThunk(
  "sandbox/updateSandbox",
  async function ({ sandboxId, sandbox }: IPutParams, { rejectWithValue }) {
    try {
      const response = await fetch(url + `/updatecode/${sandboxId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sandbox),
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
  sandbox: Sandbox,
    status: 'loading' | 'resolved' | 'rejected' | null,
    error: null | Error
}

export const sandboxSlice = createSlice<IInitialState, { setSandbox: (_state: IInitialState, action: {payload:any})=> void }>({
  name: 'sandbox',
  initialState: {
    sandbox: initialSandbox,
    status: null,
    error: null
  },
  reducers: {
    setSandbox: (_state, action) => {
      return action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      //get by track id
      .addCase(fetchSandboxesByTrack.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSandboxesByTrack.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(fetchSandboxesByTrack.fulfilled, (state, action) => {
        state.status = "resolved";
        state.sandbox = action.payload;
        state.error = null;
      })
      // post
      .addCase(createSandbox.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createSandbox.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(createSandbox.fulfilled, (state, action) => {
        state.status = "resolved";
        state.sandbox = action.payload;
        state.error = null;
      })
      // delete
      .addCase(deleteSandbox.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteSandbox.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(deleteSandbox.fulfilled, (state, action) => {
        state.status = "resolved";
        state.sandbox = action.payload;
        state.error = null;
      })
      // update
      .addCase(updateSandbox.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateSandbox.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(updateSandbox.fulfilled, (state, action) => {
        state.status = "resolved";
        state.sandbox = action.payload;
        state.error = null;
      });
    },
  }
);

export const { setSandbox } = sandboxSlice.actions;

export { fetchSandboxesByTrack, createSandbox, deleteSandbox, updateSandbox };

export const selectsandbox = (state: RootState) => state.sandbox;

export default sandboxSlice.reducer;
