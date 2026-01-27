import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '@/types/types';
import { getUserFromLocalStorage, updateUserInLocalStorage } from '@/shared/lib/localstorage';

interface ProfileEditState {
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
}

const getInitialUser = (): IUser | null => {
  return getUserFromLocalStorage();
};

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export const saveProfileEdit = createAsyncThunk<IUser, void, { rejectValue: string }>(
  'profileEdit/saveProfileEdit',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { profileEdit: ProfileEditState };
      const { user } = state.profileEdit;

      if (!user) {
        return rejectWithValue('Пользователь не найден');
      }

      await sleep(300);

      const updatedUser = updateUserInLocalStorage(user);

      if (!updatedUser) {
        return rejectWithValue('Ошибка при сохранении данных');
      }

      return updatedUser;
    } catch {
      return rejectWithValue('Ошибка при сохранении данных');
    }
  }
);

const initialState: ProfileEditState = {
  user: getInitialUser(),
  isLoading: false,
  error: null,
};

const profileEditSlice = createSlice({
  name: 'profileEdit',
  initialState,
  reducers: {
    setUserData(state: ProfileEditState, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    updateUserField<T extends keyof IUser>(
      state: ProfileEditState,
      action: PayloadAction<{ field: T; value: IUser[T] }>
    ) {
      if (state.user) {
        state.user[action.payload.field] = action.payload.value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveProfileEdit.pending, (state: ProfileEditState) => {
        state.isLoading = true;
      })
      .addCase(saveProfileEdit.fulfilled, (state: ProfileEditState, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(saveProfileEdit.rejected, (state: ProfileEditState, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Неизвестная ошибка';
      });
  },
});

export const { setUserData, updateUserField } = profileEditSlice.actions;

export default profileEditSlice.reducer;
