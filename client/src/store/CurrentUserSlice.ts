import { createSlice } from "@reduxjs/toolkit";
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
  role: "",
};

export const currentUserSlice = createSlice({
  // createSlice<
  //   IInitialState,
  //   { setCurrentUser: (_state: IInitialState, action: { payload: any }) => void }
  // >({
  name: "currentUser",
  initialState,
  // {
  //   currentUser: initialState,
  //   status: null,
  //   error: null,
  // },
  reducers: {
    setCurrentUser: (_state, action) => {
      return action.payload;
    },
  },
});

export const { setCurrentUser } = currentUserSlice.actions;
export const currentUserReducer = (state: RootState) => state.currentUser;
export default currentUserSlice.reducer;
