import { configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';
import usersDataReducer from '@store/slices/userDataSlice/userDataSlice';
import filtersReducer from '@store/slices/filtersSlice/filtersSlice';
import authReducer from './slices/authSlice/authSlice';

const rootReducer = {
  users: usersDataReducer,
  filters: filtersReducer,
  auth: authReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
export { rootReducer };
