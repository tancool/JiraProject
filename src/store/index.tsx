import { configureStore } from '@reduxjs/toolkit';
import { projectListSlice } from './../screens/projectList/projectListSlice';

export const rootReducer = {
  projectList: projectListSlice.reducer
};

export const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;