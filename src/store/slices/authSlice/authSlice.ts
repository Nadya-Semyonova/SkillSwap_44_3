import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setTokenCookie, getTokenCookie, removeTokenCookie } from '@shared/lib/cookies';
import {
  setUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '@shared/lib/localstorage';
import { fetchUserInfoApi } from '@/entities/api/index';
import type { IUser } from '@/types/types';

interface AuthState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: getUserFromLocalStorage(),
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

      const token = generateAuthToken(user.id);
      setTokenCookie(token);
      setUserToLocalStorage(user);

      return user;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка авторизации');
    }
  }
);

export const loadUserFromStorage = createAsyncThunk(
  'auth/loadUserFromStorage',
  async (_, { rejectWithValue }) => {
    try {
      const token = getTokenCookie();
      if (!token) {
        return rejectWithValue('Токен не найден');
      }

      const user = getUserFromLocalStorage();
      if (!user) {
        removeTokenCookie();
        return rejectWithValue('Данные пользователя не найдены');
      }

      return user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка загрузки пользователя'
      );
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
      removeTokenCookie();
      removeUserFromLocalStorage();
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
      })
      .addCase(loadUserFromStorage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loadUserFromStorage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
        removeTokenCookie();
        removeUserFromLocalStorage();
      });
  },
});

export const { logout, clearError } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
