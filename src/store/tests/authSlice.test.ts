import type { PayloadAction } from '@reduxjs/toolkit';
import authReducer, {
  logout,
  clearError,
  getUserInfoData,
  loadUserFromStorage,
} from '../slices/authSlice/authSlice';

import type { IUser } from '@/types/types';
export interface AuthState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

jest.mock('@shared/lib/cookies', () => ({
  setTokenCookie: jest.fn(),
  getTokenCookie: jest.fn(),
  removeTokenCookie: jest.fn(),
}));

jest.mock('@shared/lib/localstorage', () => ({
  setUserToLocalStorage: jest.fn(),
  getUserFromLocalStorage: jest.fn(() => null),
  removeUserFromLocalStorage: jest.fn(),
}));

jest.mock('@/entities/api/index', () => ({
  fetchUserInfoApi: jest.fn(),
}));

type TestAction = PayloadAction<unknown, string, unknown, string>;

const mockUser: IUser = {
  id: 1,
  liked: 0,
  avatar: 'avatar.jpg',
  name: 'John Doe',
  city: 'Moscow',
  age: 30,
  dateOfBirth: '1994-01-01',
  gender: 'Male',
  email: 'john@example.com',
  password: 'password123',
  createdAt: '2024-01-01',
  about: 'About me',
  card_people: {
    skill: 'React',
    category: 'Frontend',
    subcategory: 'JavaScript',
    description: 'React development',
    photos: ['photo1.jpg'],
  },
  skill_off: [],
};

describe('authSlice', () => {
  const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
  };

  describe('initialState', () => {
    test('должен возвращать корректное начальное состояние', () => {
      const state = authReducer(undefined, { type: 'unknown' } as TestAction);
      expect(state.user).toBeNull();
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('logout reducer', () => {
    test('должен очищать данные пользователя при logout', () => {
      const stateWithUser: AuthState = {
        user: mockUser,
        loading: false,
        error: null,
      };
      const state = authReducer(stateWithUser, logout());
      expect(state.user).toBeNull();
      expect(state.error).toBeNull();
      expect(state.loading).toBe(false);
    });
  });

  describe('clearError reducer', () => {
    test('должен очищать ошибку', () => {
      const stateWithError: AuthState = {
        user: null,
        loading: false,
        error: 'Ошибка авторизации',
      };
      const state = authReducer(stateWithError, clearError());
      expect(state.error).toBeNull();
    });
  });

  describe('getUserInfoData asyncThunk', () => {
    test('должен установить loading = true при начале запроса (pending)', () => {
      const action = { type: getUserInfoData.pending.type };
      const state = authReducer(initialState, action as TestAction);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('должен установить user и loading = false при успешном запросе (fulfilled)', () => {
      const action = {
        type: getUserInfoData.fulfilled.type,
        payload: mockUser,
      };
      const state = authReducer(initialState, action as TestAction);
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.error).toBeNull();
    });

    test('должен установить error и loading = false при ошибке (rejected)', () => {
      const errorMessage = 'Неверный email или пароль';
      const action = {
        type: getUserInfoData.rejected.type,
        payload: errorMessage,
      };
      const state = authReducer(initialState, action as TestAction);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.user).toBeNull();
    });
  });

  describe('loadUserFromStorage asyncThunk', () => {
    test('должен установить loading = true при начале запроса (pending)', () => {
      const action = { type: loadUserFromStorage.pending.type };
      const state = authReducer(initialState, action as TestAction);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('должен установить user и loading = false при успешной загрузке (fulfilled)', () => {
      const action = {
        type: loadUserFromStorage.fulfilled.type,
        payload: mockUser,
      };
      const state = authReducer(initialState, action as TestAction);
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.error).toBeNull();
    });

    test('должен установить error при ошибке (rejected)', () => {
      const errorMessage = 'Токен не найден';
      const action = {
        type: loadUserFromStorage.rejected.type,
        payload: errorMessage,
      };
      const state = authReducer(initialState, action as TestAction);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.user).toBeNull();
    });
  });

  describe('combined reducer scenarios', () => {
    test('должен обрабатывать полный цикл: pending -> fulfilled -> logout -> clearError', () => {
      let state = initialState;

      // Запрос начался
      state = authReducer(state, { type: getUserInfoData.pending.type } as TestAction);
      expect(state.loading).toBe(true);

      // Запрос успешен
      state = authReducer(state, {
        type: getUserInfoData.fulfilled.type,
        payload: mockUser,
      } as TestAction);
      expect(state.user).toEqual(mockUser);
      expect(state.loading).toBe(false);

      // Logout
      state = authReducer(state, logout());
      expect(state.user).toBeNull();

      // SetError
      state = authReducer(state, {
        type: getUserInfoData.rejected.type,
        payload: 'New error',
      } as TestAction);
      expect(state.error).toBe('New error');

      // ClearError
      state = authReducer(state, clearError());
      expect(state.error).toBeNull();
    });
  });

  describe('edge cases', () => {
    test('должен обрабатывать multiple rejected actions подряд', () => {
      let state = initialState;

      const error1 = 'Первая ошибка';
      const action1 = {
        type: getUserInfoData.rejected.type,
        payload: error1,
      };
      state = authReducer(state, action1 as TestAction);
      expect(state.error).toBe(error1);

      const error2 = 'Вторая ошибка';
      const action2 = {
        type: loadUserFromStorage.rejected.type,
        payload: error2,
      };
      state = authReducer(state, action2 as TestAction);
      expect(state.error).toBe(error2);
    });
  });

  describe('state transitions', () => {
    test('должен корректно переходить от pending к fulfilled для getUserInfoData', () => {
      let state = initialState;

      state = authReducer(state, { type: getUserInfoData.pending.type } as TestAction);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.user).toBeNull();

      state = authReducer(state, {
        type: getUserInfoData.fulfilled.type,
        payload: mockUser,
      } as TestAction);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.user).toEqual(mockUser);
    });
  });

  describe('complex workflows', () => {
    test('должен обрабатывать multiple consecutive requests', () => {
      let state = initialState;

      // Первый запрос
      state = authReducer(state, { type: getUserInfoData.pending.type } as TestAction);
      state = authReducer(state, {
        type: getUserInfoData.fulfilled.type,
        payload: mockUser,
      } as TestAction);
      expect(state.user?.id).toBe(1);

      // Второй запрос (новый пользователь)
      state = authReducer(state, { type: getUserInfoData.pending.type } as TestAction);
      const newUser: IUser = { ...mockUser, id: 2, name: 'New User' };
      state = authReducer(state, {
        type: getUserInfoData.fulfilled.type,
        payload: newUser,
      } as TestAction);
      expect(state.user?.id).toBe(2);
      expect(state.user?.name).toBe('New User');
    });
  });

  describe('reducer with various user objects', () => {
    test('должен сохранять все поля user при fulfilled', () => {
      const userWithAllFields: IUser = {
        ...mockUser,
        age: 25,
        gender: 'Female',
        about: 'Detailed about',
      };
      const action = {
        type: getUserInfoData.fulfilled.type,
        payload: userWithAllFields,
      };
      const state = authReducer(initialState, action as TestAction);
      expect(state.user?.age).toBe(25);
      expect(state.user?.gender).toBe('Female');
      expect(state.user?.about).toBe('Detailed about');
    });
  });
});
