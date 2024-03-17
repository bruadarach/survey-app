import { configureStore } from "@reduxjs/toolkit";
import { titleSlice } from "../reducers/titleSlice";
import { questionSlice } from "../reducers/questionSlice";

export const store = configureStore({
  reducer: {
    title: titleSlice.reducer,
    question: questionSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
