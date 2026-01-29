import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IEditUser } from '@/types/types';
import { updateUserInLocalStorage } from '@/shared/lib/localstorage';

interface ProfileEditState {
  user: IEditUser | null;
  isLoading: boolean;
  error: string | null;
}

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

const calculateAge = (date: string) => {
  console.log(date);
  return 0;
};

export const saveProfileEdit = createAsyncThunk<IEditUser, void, { rejectValue: string }>(
  'profileEdit/saveProfileEdit',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { profileEdit: ProfileEditState };
      const { user } = state.profileEdit;

      if (!user) {
        return rejectWithValue('Пользователь не найден');
      }

      await sleep(300);

      const updatedUser = updateUserInLocalStorage({
        ...user,
        age: calculateAge(user.dateOfBirth),
      });

      if (!updatedUser) {
        return rejectWithValue('Ошибка при сохранении данных');
      }

      return {
        email: updatedUser.email,
        name: updatedUser.name,
        dateOfBirth: updatedUser.dateOfBirth,
        gender: updatedUser.gender,
        city: updatedUser.city,
        about: updatedUser.about,
      };
    } catch {
      return rejectWithValue('Ошибка при сохранении данных');
    }
  }
);

const initialState: ProfileEditState = {
  user: null,
  isLoading: false,
  error: null,
};

const profileEditSlice = createSlice({
  name: 'profileEdit',
  initialState,
  reducers: {
    setUserData(state: ProfileEditState, action: PayloadAction<IEditUser>) {
      state.user = action.payload;
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

export const { setUserData } = profileEditSlice.actions;

export default profileEditSlice.reducer;
