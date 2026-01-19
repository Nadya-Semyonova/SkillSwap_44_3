import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import usersData from '@public/db/users.json';
import type { IUser } from '@/types/types';

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

interface UsersJsonData {
  users: IUser[];
}

export const getUsersData = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    const data = usersData as UsersJsonData;
    return data.users;
  } catch (error) {
    return rejectWithValue('Failed to fetch users');
  }
});

const usersDataSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersData.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;

        // if (state.users !== null && state.users.length !== 0) {
        //   state.popularUsers = [...state.users].sort((a, b) => b.liked - a.liked);

        //   state.newUsers = [...state.users].sort((a, b) => {
        //     const dateA = Number(a.createdAt.split('-').join(''));
        //     const dateB = Number(b.createdAt.split('-').join(''));
        //     return dateB - dateA;
        //   });
        // }
      })
      .addCase(getUsersData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// export const {} = usersDataSlice.actions;
const usersDataReducer = usersDataSlice.reducer;
export default usersDataReducer;
