import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { socket } from "./socket"; // Change this import to get the socket from the store
import { Message, Track } from "../Interfaces";

import { RootState } from "./store";

import { initialTrack } from "./trackSlice";

const initialMessage: Message = {
  id: 0,
  trackId: 0,
  text: "",
  date: "",
  author: "recruiter",
  files: [],
};

interface IInitialState {
  messages: Message[];
  message: Message;
  status: "loading" | "resolved" | "rejected" | null;
  error: null | Error;
}

const initialState: IInitialState = {
  messages: [], // Add this line
  message: initialMessage,
  status: null,
  error: null,
};

const url: string = "http://localhost:3000";

const fetchMessagesByTrack = createAsyncThunk(
  "messages/fetchAllMessages",
  async function (trackId, { rejectWithValue }) {
    try {
      const response = await fetch(`${url}/messagesByTrack/${trackId}`);
      if (!response.ok) {
        throw new Error("Server error");
      }
      const data = await response.json();
      // console.log("ALL MESSAGES BY TRACK : ", data);
      return data;
    } catch (err) {
      if (err instanceof Error) return rejectWithValue(err.message);
    }
  }
);

const createMessage = createAsyncThunk(
  "message/createMessage",
  async function (message: Message, { rejectWithValue }) {
    try {
      const response = await fetch(url + "/createMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      if (!response.ok) {
        throw new Error("Server error");
      }
      const data = await response.json();
      await socket.emit("sendMessage", data);
      return data;
    } catch (err) {
      if (err instanceof Error) return rejectWithValue(err.message);
    }
  }
);

const deleteMessage = createAsyncThunk(
  "message/deleteMessage",
  async function (messageId: number, { rejectWithValue }) {
    try {
      const response = await fetch(`${url}/deleteMessage/${messageId}`, {
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

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (_state, action) => {
      return action.payload;
    },
    newMessageReceived: (state, action) => {
      // Add the new message to the state
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      //get by track id
      .addCase(fetchMessagesByTrack.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMessagesByTrack.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(fetchMessagesByTrack.fulfilled, (state, action) => {
        state.status = "resolved";
        state.messages = action.payload;
        state.error = null;
      })
      // post
      .addCase(createMessage.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.status = "resolved";
        state.message = action.payload;
        // state.messages.push(action.payload);
        state.error = null;
      })
      // delete
      .addCase(deleteMessage.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.status = "resolved";
        state.message = action.payload;
        state.error = null;
      });
  },
});

export const { setMessage, newMessageReceived } = messageSlice.actions;

export { fetchMessagesByTrack, createMessage, deleteMessage };

export const selectmessage = (state: RootState) => state.message;

export default messageSlice.reducer;
