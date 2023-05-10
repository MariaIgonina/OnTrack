import { configureStore } from "@reduxjs/toolkit";

import applicantReducer from "./applicantSlice";
import recruiterReducer from "./recruiterSlice";
import vacancyReducer from "./vacancySlice";
import trackReducer from "./trackSlice";
import messageReducer from "./messageSlice";
import currentUserReducer from "./CurrentUserSlice";

export const store = configureStore({
  reducer: {
    applicant: applicantReducer,
    recruiter: recruiterReducer,
    vacancy: vacancyReducer,
    track: trackReducer,
    message: messageReducer,
    currentUser: currentUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
