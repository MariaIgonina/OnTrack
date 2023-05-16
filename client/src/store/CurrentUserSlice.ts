import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { useDispatch } from "react-redux";

interface CurrentUserState {
  id: string | undefined;
  role: string | undefined;
}

interface IInitialState {
  currentUser: { id: string | undefined; role: string | undefined };
  status: "loading" | "resolved" | "rejected" | null;
  error: null | Error;
}

const initialState: CurrentUserState = {
  id: undefined,
  role: undefined,
};

const url: string = "http://localhost:3000";

const findUser = createAsyncThunk(
  "applicant/finduser",
  async function (id: string, { rejectWithValue }) {
    try {
      const response = await fetch(`${url}/findUser/${id}`);
      if (!response.ok) {
        throw new Error("Server error");
      }
      const data = await response.json();
      console.log("!!!!!!!!! DATA FROM REDUX THUNK : ", data);
      // useDispatch(setCurrentUser({id: data.id, role: ""}))
      return data;
    } catch (err) {
      if (err instanceof Error) return rejectWithValue(err.message);
    }
  }
);
interface IInitialState {
  currentUser: CurrentUserState;
  status: "loading" | "resolved" | "rejected" | null;
  error: null | Error;
}

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
      //findUser
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
