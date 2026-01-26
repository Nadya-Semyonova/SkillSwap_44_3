import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { IUser } from '@/types/types';
import { getUserFromLocalStorage, updateUserInLocalStorage } from '@/shared/lib/localstorage';

type ProfileEditFields = Pick<
  IUser,
  'email' | 'name' | 'dateOfBirth' | 'gender' | 'city' | 'about'
>;

interface ProfileEditState {
  data: ProfileEditFields;
  isLoading: boolean;
  error: string | null;
}

const emptyData: ProfileEditFields = {
  email: '',
  name: '',
  dateOfBirth: '',
  gender: '',
  city: '',
  about: '',
};

const getInitialData = (): ProfileEditFields => {
  const user = getUserFromLocalStorage();

  if (!user) return emptyData;

  return {
    email: user.email,
    name: user.name,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    city: user.city,
    about: user.about,
  };
};

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export const saveProfileEditToLocalStorage = createAsyncThunk<
  ProfileEditFields,
  void,
  { rejectValue: string }
>('profileEdit/saveProfileEditToLocalStorage', async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as { profileEdit: ProfileEditState };
    const patch = state.profileEdit.data;

    await sleep(300);

    const updatedUser = updateUserInLocalStorage(patch);

    if (!updatedUser) {
      return rejectWithValue('Пользователь не найден в localStorage');
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
});

const initialState: ProfileEditState = {
  data: getInitialData(),
  isLoading: false,
  error: null,
};

const profileEditSlice = createSlice({
  name: 'profileEdit',
  initialState,
  reducers: {
    loadInitialState(state) {
      state.data = getInitialData();
      state.isLoading = false;
      state.error = null;
    },

    setEmail(state, action: PayloadAction<string>) {
      state.data.email = action.payload;
    },

    setName(state, action: PayloadAction<string>) {
      state.data.name = action.payload;
    },

    setDateOfBirth(state, action: PayloadAction<string>) {
      state.data.dateOfBirth = action.payload;
    },

    setGender(state, action: PayloadAction<string>) {
      state.data.gender = action.payload;
    },

    setCity(state, action: PayloadAction<string>) {
      state.data.city = action.payload;
    },

    setAbout(state, action: PayloadAction<string>) {
      state.data.about = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveProfileEditToLocalStorage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveProfileEditToLocalStorage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(saveProfileEditToLocalStorage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Неизвестная ошибка';
      });
  },
});

export const { loadInitialState, setEmail, setName, setDateOfBirth, setGender, setCity, setAbout } =
  profileEditSlice.actions;

export default profileEditSlice.reducer;
