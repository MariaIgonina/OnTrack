import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface CurrentUserState {
  id: string;
  role: string;
}

interface IInitialState {
  currentUser: CurrentUserState;
  status: "loading" | "resolved" | "rejected" | null;
  error: null | Error;
}

const initialState: CurrentUserState = {
  id: "",
  role: "undefined",
};

const url: string = "http://localhost:3000";

const findUser = createAsyncThunk(
  "applicant/getuserRole",
  async function (idAuth: string, { rejectWithValue }) {
    try {
      const response = await fetch(url + `/userrole/${idAuth}`);
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

export const currentUserSlice = createSlice<
  IInitialState,
  { setCurrentUser: (_state: IInitialState, action: { payload: any }) => void }
>({
  name: "currentUser",
  initialState: {
    currentUser: initialState,
    status: null,
    error: null,
  },
  reducers: {
    setCurrentUser: (_state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findUser.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(findUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as Error;
      })
      .addCase(findUser.fulfilled, (state, action) => {
        state.status = "resolved";
        state.currentUser = action.payload;
        state.error = null;
      });
  },
});

export const { setCurrentUser } = currentUserSlice.actions;
export { findUser };
export const currentUserReducer = (state: RootState) => state.currentUser;
export default currentUserSlice.reducer;
