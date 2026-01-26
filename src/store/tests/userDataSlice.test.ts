import type { IUser } from "@/types/types";
import usersDataReducer, { getCitiesData, getSkillsData, getUsersData } from "../slices/userDataSlice/userDataSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

jest.mock('@/entities/api/index', () => ({
    fetchUsersApi: jest.fn(),
    fetchCitiesApi: jest.fn(),
    fetchSkillsApi: jest.fn(),
}));

type TestAction = PayloadAction<unknown, string, unknown, string>;

interface UsersState {
    users: IUser[] | null;
    cities: string[] | null;
    skills: Record<string, string[]> | null;
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

const mockUser: IUser = {
  id: 1,
  liked: 0,
  avatar: '',
  name: 'Екатерина',
  city: 'Москва',
  age: 20,
  dateOfBirth: '01.01.2000',
  gender: 'female',
  email: 'a@b.com',
  password: '123',
  createdAt: '2022-01-01',
  about: '',
  card_people: {
    skill: '',
    category: '',
    subcategory: '',
    description: '',
    photos: [],
  },
  skill_off: [],
};

const mockCities = ['Москва'];
const mockSkills = { 'Творчество': ['Рисование', 'Иллюстрация'] };

describe('userDataSlice', () => {
  test('Возвращает начальное состояние, если передан неизвестный экшен', () => {
    const state = usersDataReducer(undefined, {type: 'unknown'} as TestAction);
    expect(state).toEqual(initialState);
  });

  test('InitialState содержит правильные поля', () => {
    expect(initialState).toEqual({
        users: null,
        cities: null,
        skills: null,
        loading: false,
        error: null,
    })
  })

  describe('getUsersData (загрузка пользователей)', () => {
    test('При начале загрузки установается loading=true и error=null', () => {
      const state = usersDataReducer(initialState, { type: getUsersData.pending.type } as TestAction);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('После успешной загрузки пользователей данные записываются users, loading=false, error=null', () => {
      const state = usersDataReducer(initialState, { type: getUsersData.fulfilled.type, payload: [mockUser],} as TestAction);
      expect(state.loading).toBe(false);
      expect(state.users).toEqual([mockUser]);
      expect(state.error).toBeNull();
    });

    test('При ошибке загрузки пользователей устанавливается error, loading=false', () => {
      const state = usersDataReducer(initialState, { type: getUsersData.rejected.type, payload: 'Ошибка загрузки пользователей',} as TestAction);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка загрузки пользователей');
    });
  });

  describe('getCitiesData (загрузка городова))', () => {
    test('При начале загрузки городов установливается loading=true, error=null', () => {
      const state = usersDataReducer(initialState, { type: getCitiesData.pending.type} as TestAction);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('После успешной загрузки городов данные записываются в cities, loading=false, error=null', () => {
      const state = usersDataReducer(initialState, { type: getCitiesData.fulfilled.type, payload: mockCities, } as TestAction);
      expect(state.loading).toBe(false);
      expect(state.cities).toEqual(mockCities);
      expect(state.error).toBeNull();
    });

    test('При ошибке загрузки городов установливается error, loading=false', () => {
      const state = usersDataReducer(initialState, { type: getCitiesData.rejected.type, payload: 'Ошибка загрузки городов', } as TestAction);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка загрузки городов');
    });
  });

  describe('getSkillsData (загрузка навыков)', () => {
    test('При начале загрузки навыков установается loading=true, error=null', () => {
      const state = usersDataReducer(initialState, { type: getSkillsData.pending.type } as TestAction);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('После успешной загрузки навыков данные записываются в skills, loading=false, error=null', () => {
      const state = usersDataReducer(initialState, { type: getSkillsData.fulfilled.type, payload: mockSkills, } as TestAction);
      expect(state.loading).toBe(false);
      expect(state.skills).toEqual(mockSkills);
      expect(state.error).toBeNull();
    });

    test('При ошибке загрузки навыков устанавливается error, loading=false', () => {
      const state = usersDataReducer(initialState, { type: getSkillsData.rejected.type, payload: 'Ошибка загрузки навыков', } as TestAction);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка загрузки навыков');
    });
  });

  test('Неизменяемый редьюсер возвращает текущее состояние при неизвестном действии', () => {
    const prevState = { ...initialState, users: [mockUser] };
    const state = usersDataReducer(prevState, { type: 'unknown'} as TestAction);
    expect(state.users).toEqual([mockUser]);
  })
})
