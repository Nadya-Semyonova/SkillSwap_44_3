import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { setTokenCookie, generateAuthToken } from '@shared/libs/cookies';
import { setUserToLocalStorage } from '@shared/libs/localstorage';
import type { IUser } from '@/types/types';

export type ProfileEditUpdatePayload = {
  id: number;
} & Partial<
  Omit<IUser, 'card_people'> & {
    card_people?: Partial<IUser['card_people']>;
  }
>;

interface ProfileEditState {
  users: IUser[];
}

const initialState: ProfileEditState = {
  users: [],
};

const profileEditSlice = createSlice({
  name: 'profileEdit',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    /* eslint-disable no-param-reassign -- Immer draft mutation */
    updateUser: (state, action: PayloadAction<ProfileEditUpdatePayload>) => {
      const { id, card_people: cardPeopleUpdate, ...rest } = action.payload;
      const user = state.users.find((u) => u.id === id);
      if (!user) return;
      Object.entries(rest).forEach(([key, value]) => {
        if (value !== undefined && key !== 'id') {
          (user as Record<string, unknown>)[key] = value;
        }
      });
      if (cardPeopleUpdate && typeof cardPeopleUpdate === 'object') {
        user.card_people = { ...user.card_people, ...cardPeopleUpdate };
      }
    },
    /* eslint-enable no-param-reassign */
  },
});

export const saveUserToStorage = createAsyncThunk(
  'profileEdit/saveUserToStorage',
  async (user: IUser, { rejectWithValue }) => {
    try {
      setUserToLocalStorage(user);
      const token = generateAuthToken(user.id);
      setTokenCookie(token);
      return user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка сохранения в localStorage'
      );
    }
  }
);

export const { setUsers, updateUser } = profileEditSlice.actions;
export const profileEditReducer = profileEditSlice.reducer;
export default profileEditReducer;
