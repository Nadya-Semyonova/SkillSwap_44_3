import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IUser } from '../../../types/types';

interface UsersState {
  users: IUser[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: null,
  loading: false,
  error: null,
};

// export const getUsersData = createAsyncThunk(
//     'users',
//     async() => {
//         const response =
//     }
// )

const usersDataSlice = createSlice({
  name: 'Users',
  initialState,
  reducers: {},
});

export const {} = usersDataSlice.actions;
const usersDataReducer = usersDataSlice.reducer;
export default usersDataReducer;
