import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import type {} from 'redux-thunk/extend-redux'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware()
});

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
