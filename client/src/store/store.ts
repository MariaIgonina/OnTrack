import { configureStore } from "@reduxjs/toolkit";

import applicantReducer from "./applicantSlice";
import recruiterReducer from "./recruiterSlice";
import vacancyReducer from "./vacancySlice";
import trackReducer from "./trackSlice";
import messageReducer from "./messageSlice";
import educationReducer from "./educationSlice";
import experienceReducer from "./experienceSlice";
import currentUserReducer from "./CurrentUserSlice";
import questionaryReducer from "./QuestionarySlice";
import videocallReducer from "./VideoCallSlice"
import sandboxReducer from "./SandboxSlice"

export const store = configureStore({
  reducer: {
    applicant: applicantReducer,
    recruiter: recruiterReducer,
    vacancy: vacancyReducer,
    track: trackReducer,
    message: messageReducer,
    education: educationReducer,
    experience: experienceReducer,
    currentUser: currentUserReducer,
    videocall: videocallReducer,
    sandbox: sandboxReducer,
    questionary: questionaryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

import { socket } from "./socket"; // Import the socket instance
import { newMessageReceived } from "./messageSlice"; // Import the newMessageReceived action

socket.on("newMessage", (message:any) => {
  store.dispatch(newMessageReceived(message));
});
