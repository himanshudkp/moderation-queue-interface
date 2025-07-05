import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "../slices/postsSlice";

export const store = configureStore({
  reducer: postsSlice,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
