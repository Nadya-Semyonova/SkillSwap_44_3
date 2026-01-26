import type { PayloadAction } from '@reduxjs/toolkit';
import authReducer, {
  logout,
  clearError,
  getUserInfoData,
  loadUserFromStorage,
} from '../authSlice/authSlice';
import type { IUser } from '@/types/types';

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

interface AuthState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

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

    test('должен корректно очищать ошибку при logout', () => {
      const stateWithError: AuthState = {
        user: null,
        loading: false,
        error: 'Some error',
      };
      const state = authReducer(stateWithError, logout());
      expect(state.error).toBeNull();
      expect(state.user).toBeNull();
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

    test('должен оставлять user и loading без изменений при clearError', () => {
      const stateWithError: AuthState = {
        user: mockUser,
        loading: true,
        error: 'Some error',
      };
      const state = authReducer(stateWithError, clearError());
      expect(state.error).toBeNull();
      expect(state.user).toEqual(mockUser);
      expect(state.loading).toBe(true);
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

    test('должен установить error и loading = false, очистить user при ошибке (rejected)', () => {
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

    test('должен перезаписывать user при новом успешном запросе', () => {
      const stateWithUser: AuthState = {
        user: mockUser,
        loading: false,
        error: null,
      };

      const newUser: IUser = {
        ...mockUser,
        id: 2,
        name: 'Jane Doe',
        email: 'jane@example.com',
      };

      const action = {
        type: getUserInfoData.fulfilled.type,
        payload: newUser,
      };
      const state = authReducer(stateWithUser, action as TestAction);
      expect(state.user).toEqual(newUser);
      expect(state.user?.id).toBe(2);
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

    test('должен установить error, loading = false и очистить user при ошибке (rejected)', () => {
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

    test('должен загружать user из localStorage при успехе', () => {
      const stateBeforeLoad: AuthState = {
        user: null,
        loading: true,
        error: null,
      };

      const action = {
        type: loadUserFromStorage.fulfilled.type,
        payload: mockUser,
      };
      const state = authReducer(stateBeforeLoad, action as TestAction);
      expect(state.user).toEqual(mockUser);
    });
  });

  describe('combined reducer scenarios', () => {
    test('должен обрабатывать последовательность: pending -> fulfilled', () => {
      let state = initialState;

      const pendingAction = { type: getUserInfoData.pending.type };
      state = authReducer(state, pendingAction as TestAction);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();

      const fulfilledAction = {
        type: getUserInfoData.fulfilled.type,
        payload: mockUser,
      };
      state = authReducer(state, fulfilledAction as TestAction);
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.error).toBeNull();
    });

    test('должен обрабатывать последовательность: pending -> rejected', () => {
      let state = initialState;

      const pendingAction = { type: getUserInfoData.pending.type };
      state = authReducer(state, pendingAction as TestAction);
      expect(state.loading).toBe(true);

      const rejectedAction = {
        type: getUserInfoData.rejected.type,
        payload: 'Ошибка авторизации',
      };
      state = authReducer(state, rejectedAction as TestAction);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка авторизации');
      expect(state.user).toBeNull();
    });

    test('должен очищать ошибку после logout', () => {
      let state: AuthState = {
        user: null,
        loading: false,
        error: 'Ошибка авторизации',
      };

      state = authReducer(state, logout());
      expect(state.error).toBeNull();
      expect(state.user).toBeNull();
    });

    test('должен правильно обновлять состояние после успешной авторизации и logout', () => {
      let state = initialState;

      // Авторизация успешна
      const fulfilledAction = {
        type: getUserInfoData.fulfilled.type,
        payload: mockUser,
      };
      state = authReducer(state, fulfilledAction as TestAction);
      expect(state.user).toEqual(mockUser);
      expect(state.loading).toBe(false);

      state = authReducer(state, logout());
      expect(state.user).toBeNull();
      expect(state.loading).toBe(false);
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

    test('должен сохранять user при clearError', () => {
      const stateWithData: AuthState = {
        user: mockUser,
        loading: false,
        error: 'Some error',
      };
      const state = authReducer(stateWithData, clearError());
      expect(state.user).toEqual(mockUser);
      expect(state.error).toBeNull();
    });

    test('должен обрабатывать empty error string', () => {
      const action = {
        type: getUserInfoData.rejected.type,
        payload: '',
      };
      const state = authReducer(initialState, action as TestAction);
      expect(state.error).toBe('');
      expect(state.loading).toBe(false);
    });

    test('должен обрабатывать null payload при fulfilled', () => {
      const action = {
        type: getUserInfoData.fulfilled.type,
        payload: null,
      };
      const state = authReducer(initialState, action as TestAction);
      expect(state.user).toBeNull();
      expect(state.loading).toBe(false);
    });

    test('должен сохранять loading при clearError во время загрузки', () => {
      const stateLoading: AuthState = {
        user: null,
        loading: true,
        error: 'Error during loading',
      };
      const state = authReducer(stateLoading, clearError());
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });
  });

  describe('async thunk payload scenarios', () => {
    test('должен обрабатывать different error messages для getUserInfoData', () => {
      const errorMessages = [
        'Неверный email или пароль',
        'Сервер недоступен',
        'Ошибка подключения',
      ];

      errorMessages.forEach((errorMsg) => {
        const action = {
          type: getUserInfoData.rejected.type,
          payload: errorMsg,
        };
        const state = authReducer(initialState, action as TestAction);
        expect(state.error).toBe(errorMsg);
        expect(state.user).toBeNull();
      });
    });

    test('должен обрабатывать different error messages для loadUserFromStorage', () => {
      const errorMessages = [
        'Токен не найден',
        'Данные пользователя не найдены',
        'Ошибка загрузки пользователя',
      ];

      errorMessages.forEach((errorMsg) => {
        const state = authReducer(initialState, {
          type: loadUserFromStorage.rejected.type,
          payload: errorMsg,
        } as TestAction);
        expect(state.error).toBe(errorMsg);
        expect(state.user).toBeNull();
        expect(state.loading).toBe(false);
      });
    });

    test('должен сохранять только error при rejected, очищая пользователя', () => {
      const stateWithUser: AuthState = {
        user: mockUser,
        loading: false,
        error: null,
      };

      const action = {
        type: getUserInfoData.rejected.type,
        payload: 'Error message',
      };
      const state = authReducer(stateWithUser, action as TestAction);
      expect(state.user).toBeNull();
      expect(state.error).toBe('Error message');
      expect(state.loading).toBe(false);
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

    test('должен корректно переходить от pending к rejected для getUserInfoData', () => {
      let state = initialState;

      state = authReducer(state, { type: getUserInfoData.pending.type } as TestAction);
      expect(state.loading).toBe(true);

      state = authReducer(state, {
        type: getUserInfoData.rejected.type,
        payload: 'Auth error',
      } as TestAction);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Auth error');
      expect(state.user).toBeNull();
    });

    test('должен корректно переходить от pending к fulfilled для loadUserFromStorage', () => {
      let state = initialState;

      state = authReducer(state, { type: loadUserFromStorage.pending.type } as TestAction);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();

      state = authReducer(state, {
        type: loadUserFromStorage.fulfilled.type,
        payload: mockUser,
      } as TestAction);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.user).toEqual(mockUser);
    });

    test('должен корректно переходить от pending к rejected для loadUserFromStorage', () => {
      let state = initialState;

      state = authReducer(state, { type: loadUserFromStorage.pending.type } as TestAction);
      expect(state.loading).toBe(true);

      state = authReducer(state, {
        type: loadUserFromStorage.rejected.type,
        payload: 'Storage error',
      } as TestAction);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Storage error');
      expect(state.user).toBeNull();
    });
  });

  describe('complex workflows', () => {
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

      // SetError (например, новая ошибка)
      state = authReducer(state, {
        type: getUserInfoData.rejected.type,
        payload: 'New error',
      } as TestAction);
      expect(state.error).toBe('New error');

      // ClearError
      state = authReducer(state, clearError());
      expect(state.error).toBeNull();
    });

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

    test('должен восстанавливаться от ошибки с повторным запросом', () => {
      let state = initialState;

      // Ошибка
      state = authReducer(state, {
        type: getUserInfoData.rejected.type,
        payload: 'Error',
      } as TestAction);
      expect(state.error).toBe('Error');
      expect(state.user).toBeNull();

      // Очистка ошибки
      state = authReducer(state, clearError());
      expect(state.error).toBeNull();

      // Повторный запрос
      state = authReducer(state, { type: getUserInfoData.pending.type } as TestAction);
      expect(state.loading).toBe(true);

      state = authReducer(state, {
        type: getUserInfoData.fulfilled.type,
        payload: mockUser,
      } as TestAction);
      expect(state.user).toEqual(mockUser);
      expect(state.loading).toBe(false);
    });
  });

  describe('reducer with various user objects', () => {
    test('должен корректно обрабатывать user с пустыми skill_off', () => {
      const userWithEmptySkills: IUser = { ...mockUser, skill_off: [] };
      const action = {
        type: getUserInfoData.fulfilled.type,
        payload: userWithEmptySkills,
      };
      const state = authReducer(initialState, action as TestAction);
      expect(state.user?.skill_off).toEqual([]);
    });

    test('должен корректно обрабатывать user с заполненными skill_off', () => {
      const userWithSkills: IUser = {
        ...mockUser,
        skill_off: ['skill1', 'skill2', 'skill3'],
      };
      const action = {
        type: getUserInfoData.fulfilled.type,
        payload: userWithSkills,
      };
      const state = authReducer(initialState, action as TestAction);
      expect(state.user?.skill_off).toHaveLength(3);
      expect(state.user?.skill_off).toContain('skill1');
    });

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
