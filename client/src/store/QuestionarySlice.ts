import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { socket } from "./socket"; // Change this import to get the socket from the store
import { Questionary, Track } from "../Interfaces";

import { RootState } from "./store";

import { initialTrack } from "./trackSlice";

const initialQuestionary: Questionary = {
  id: 0,
  type: '',
  questions: [],
  answer: [],
  date: '',
  order: 0,
  status: false,
  title: '',
  hidden: false,
  Track: initialTrack,
  trackId: 0,
};


const url: string = "http://localhost:3000";

const fetchQuestionaryTrack = createAsyncThunk(
  "questionary/fetchQuestionaryTrack",
  async function (trackId: number, { rejectWithValue }) {
    try {
      const response = await fetch(`${url}/questionaryTrack/${trackId}`);
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

const createQuestionary = createAsyncThunk(
  "questionary/createQuestionary",
  async function (questionary: Questionary, { rejectWithValue }) {
    try {
      const response = await fetch(url + "/createQuestionary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionary),
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

const deleteQuestionary = createAsyncThunk(
  "questionary/deleteQuestionary",
  async function (questionaryId: number, { rejectWithValue }) {
    try {
      const response = await fetch(`${url}/deleteQuestionary/${questionaryId}`, {
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
  questionaryId: number;
  questionary: any;
}

const updateQuestionary = createAsyncThunk(
  "questionary/updateQuestionary",
  async function ({ questionaryId, questionary }: IPutParams, { rejectWithValue }) {
    try {
      const response = await fetch(url + `/updateQuestionary/${questionaryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionary),
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
  questionary: Questionary,
    status: 'loading' | 'resolved' | 'rejected' | null,
    error: null | Error
}

export const questionarySlice = createSlice<IInitialState, { setQuestionary: (_state: IInitialState, action: {payload:any})=> void }>({
  name: 'questionary',
  initialState: {
    questionary: initialQuestionary,
    status: null,
    error: null
  },
  reducers: {
    setQuestionary: (_state, action) => {
      return action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      //get by track id
      .addCase(fetchQuestionaryTrack.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchQuestionaryTrack.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(fetchQuestionaryTrack.fulfilled, (state, action) => {
        state.status = "resolved";
        state.questionary = action.payload;
        state.error = null;
      })
      // post
      .addCase(createQuestionary.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createQuestionary.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(createQuestionary.fulfilled, (state, action) => {
        state.status = "resolved";
        state.questionary = action.payload;
        state.error = null;
      })
      // delete
      .addCase(deleteQuestionary.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteQuestionary.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(deleteQuestionary.fulfilled, (state, action) => {
        state.status = "resolved";
        state.questionary = action.payload;
        state.error = null;
      })
      // update
      .addCase(updateQuestionary.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateQuestionary.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(updateQuestionary.fulfilled, (state, action) => {
        state.status = "resolved";
        state.questionary = action.payload;
        state.error = null;
      });
    },
  }
);

export const { setQuestionary } = questionarySlice.actions;

export { fetchQuestionaryTrack, createQuestionary, deleteQuestionary, updateQuestionary };

export const selectquestionary = (state: RootState) => state.questionary;

export default questionarySlice.reducer;
