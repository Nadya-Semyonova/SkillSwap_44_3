import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { setTokenCookie } from '@/shared/lib/cookies/cookies';
import { setUserToLocalStorage } from '@/shared/lib/localstorage';
import type { IUser } from '@/types/types';

type RegistrationFields = Omit<IUser, 'id' | 'liked' | 'createdAt' | 'age'>;

interface RegistrationState extends RegistrationFields {
  loading: boolean;
  error: string | null;
}

const initialState: RegistrationState = {
  avatar: '',
  name: '',
  city: '',
  dateOfBirth: '',
  gender: '',
  email: '',
  password: '',
  about: '',
  card_people: {
    skill: '',
    category: '',
    subcategory: '',
    description: '',
    photos: [],
  },
  skill_off: [],
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk<IUser, void>(
  'registration/registerUser',
  async (_, { getState }) => {
    const state = getState() as { registration: RegistrationState };

    const newUser: IUser = {
      id: Date.now(),
      liked: 0,
      age: 0,
      createdAt: new Date().toISOString(),
      avatar: state.registration.avatar,
      name: state.registration.name,
      city: state.registration.city,
      dateOfBirth: state.registration.dateOfBirth,
      gender: state.registration.gender,
      email: state.registration.email,
      password: state.registration.password,
      about: state.registration.about,
      card_people: { ...state.registration.card_people },
      skill_off: [...state.registration.skill_off],
    };

    setUserToLocalStorage(newUser);
    setTokenCookie(`token_${newUser.id}`);

    return newUser;
  }
);

const registerUserSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setDateOfBirth: (state, action: PayloadAction<string>) => {
      state.dateOfBirth = action.payload;
    },
    setGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setAbout: (state, action: PayloadAction<string>) => {
      state.about = action.payload;
    },
    setSkill: (state, action: PayloadAction<string>) => {
      state.card_people.skill = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.card_people.category = action.payload;
    },
    setSubcategory: (state, action: PayloadAction<string>) => {
      state.card_people.subcategory = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.card_people.description = action.payload;
    },
    setPhotos: (state, action: PayloadAction<string[]>) => {
      state.card_people.photos = action.payload;
    },
    setSkillOff: (state, action: PayloadAction<string[]>) => {
      state.skill_off = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка регистрации';
      });
  },
});

export const {
  setAvatar,
  setName,
  setCity,
  setDateOfBirth,
  setGender,
  setEmail,
  setPassword,
  setAbout,
  setSkill,
  setCategory,
  setSubcategory,
  setDescription,
  setPhotos,
  setSkillOff,
} = registerUserSlice.actions;

const registerReducer = registerUserSlice.reducer;
export default registerReducer;
