import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserInfoApi } from '@/entities/api/index';
import type { IUser } from '@/types/types';

interface AuthState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const getUserInfoData = createAsyncThunk(
  'auth/fetchUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const user = await fetchUserInfoApi(email, password);
      if (!user) {
        return rejectWithValue('Неверный email или пароль');
      }
      return user;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка авторизации');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfoData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUserInfoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
