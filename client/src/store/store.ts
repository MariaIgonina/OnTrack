import { configureStore } from '@reduxjs/toolkit'

import applicantReducer from "./applicantSlice"
import recruiterReducer from "./recruiterSlice"




export const store = configureStore({
  reducer: {
    applicant: applicantReducer,
    recruiter: recruiterReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch