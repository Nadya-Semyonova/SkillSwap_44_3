import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsersApi, fetchCitiesApi, fetchSkillsApi } from '@api/index';
import type { ISkillItem, IUser } from '@/types/types';

interface UsersState {
  users: IUser[] | null;
  cities: string[] | null;
  skills: ISkillItem | null;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: null,
  cities: null,
  skills: null,
  loading: false,
  error: null,
};

export const getUsersData = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const users = await fetchUsersApi();
    return users;
  } catch (error) {
    return rejectWithValue('Ошибка загрузки пользователей');
  }
});

export const getCitiesData = createAsyncThunk(
  'users/fetchCities',
  async (_, { rejectWithValue }) => {
    try {
      const cities = await fetchCitiesApi();
      return cities;
    } catch (error) {
      return rejectWithValue('Ошибка загрузки городов');
    }
  }
);

export const getSkillsData = createAsyncThunk(
  'users/fetchSkills',
  async (_, { rejectWithValue }) => {
    try {
      const skills = await fetchSkillsApi();
      return skills;
    } catch (error) {
      return rejectWithValue('Ошибка загрузки навыков');
    }
  }
);

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
      })
      .addCase(getUsersData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCitiesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCitiesData.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(getCitiesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getSkillsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSkillsData.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload;
      })
      .addCase(getSkillsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // if (state.users !== null && state.users.length !== 0) {
    //   state.popularUsers = [...state.users].sort((a, b) => b.liked - a.liked);

    //   state.newUsers = [...state.users].sort((a, b) => {
    //     const dateA = Number(a.createdAt.split('-').join(''));
    //     const dateB = Number(b.createdAt.split('-').join(''));
    //     return dateB - dateA;
    //   });
    // }
  },
});

// export const {} = usersDataSlice.actions;
const usersDataReducer = usersDataSlice.reducer;
export default usersDataReducer;
