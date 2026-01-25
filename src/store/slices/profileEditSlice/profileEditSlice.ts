import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { setTokenCookie } from '@/shared/libs/cookies';
import { setUserToLocalStorage } from '@/shared/libs/localstorage';
import type { IUser } from '@/types/types';

function calculateAge(dateOfBirth: string): number {
  const [day, month, year] = dateOfBirth.split('.').map(Number);
  if (!day || !month || !year) return 0;

  const today = new Date();
  let age = today.getFullYear() - year;

  if (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day)) {
    age -= 1;
  }

  return age;
}

type RegistrationFields = Omit<IUser, 'id' | 'liked' | 'createdAt' | 'age'>;

interface RegistrationState extends RegistrationFields {
  step: 1 | 2 | 3;
  loading: boolean;
  error: string | null;
}

const initialState: RegistrationState = {
  step: 1,
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

export const registerUser = createAsyncThunk(
  'registration/registerUser',
  async (_, { getState }) => {
    const state = getState() as { registration: RegistrationState };

    const newUser: IUser = {
      id: Date.now(),
      liked: 0,
      age: calculateAge(state.registration.dateOfBirth),
      createdAt: new Date().toISOString(),
      ...state.registration,
    };

    setUserToLocalStorage(newUser);
    setTokenCookie(`token_${newUser.id}`);

    return newUser;
  }
);

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<1 | 2 | 3>) => {
      state.step = action.payload;
    },
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
  setStep,
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
} = registrationSlice.actions;

export default registrationSlice.reducer;
