import type { PayloadAction } from '@reduxjs/toolkit';
import profileEditReducer, {
  setUserData,
  saveProfileEdit,
} from '../slices/profileEditSlice/profileEditSlice';
import type { IEditUser } from '@/types/types';

jest.mock('@/shared/lib/localstorage', () => ({
  updateUserInLocalStorage: jest.fn(),
}));

type TestAction = PayloadAction<unknown, string, unknown, string>;

const mockUserData: IEditUser = {
  email: 'tralala@mail.ru',
  name: 'Tralala Trululu',
  dateOfBirth: '1993-07-15',
  gender: 'Male',
  city: 'Saint Petersburg',
  about: 'Software Developer',
};

describe('profileEditSlice', () => {
  const initialState = {
    user: null,
    isLoading: false,
    error: null,
  };

  describe('initialState', () => {
    test('должен возвращать корректное начальное состояние', () => {
      const state = profileEditReducer(undefined, { type: 'unknown' } as TestAction);
      expect(state).toEqual(initialState);
      expect(state.user).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('setUserData reducer', () => {
    test('должен устанавливать данные пользователя', () => {
      const state = profileEditReducer(initialState, setUserData(mockUserData));
      expect(state.user).toEqual(mockUserData);
      expect(state.error).toBeNull();
    });

    test('должен обновлять существующие данные пользователя', () => {
      const initialWithUser = { ...initialState, user: mockUserData };
      const updatedUserData: IEditUser = {
        ...mockUserData,
        name: 'Jane Doe',
        city: 'Los Angeles',
      };
      const state = profileEditReducer(initialWithUser, setUserData(updatedUserData));
      expect(state.user?.name).toBe('Jane Doe');
      expect(state.user?.city).toBe('Los Angeles');
      expect(state.user?.email).toBe(mockUserData.email);
    });

    test('должен сохранять корректные типы данных', () => {
      const state = profileEditReducer(initialState, setUserData(mockUserData));
      expect(typeof state.user?.email).toBe('string');
      expect(typeof state.user?.name).toBe('string');
      expect(typeof state.user?.gender).toBe('string');
    });
  });

  describe('saveProfileEdit asyncThunk', () => {
    test('должен установить isLoading = true при pending', () => {
      const action = { type: saveProfileEdit.pending.type };
      const state = profileEditReducer(
        { ...initialState, user: mockUserData },
        action as TestAction
      );
      expect(state.isLoading).toBe(true);
      expect(state.user).toEqual(mockUserData);
      expect(state.error).toBeNull();
    });

    test('должен установить isLoading = false и сохранить данные при fulfilled', () => {
      const action = {
        type: saveProfileEdit.fulfilled.type,
        payload: mockUserData,
      };
      const state = profileEditReducer(
        { ...initialState, isLoading: true },
        action as unknown as TestAction
      );
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUserData);
      expect(state.error).toBeNull();
    });

    test('должен установить error и isLoading = false при rejected', () => {
      const errorMessage = 'Пользователь не найден';
      const action = {
        type: saveProfileEdit.rejected.type,
        payload: errorMessage,
      };
      const state = profileEditReducer(
        { ...initialState, isLoading: true },
        action as unknown as TestAction
      );
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });

    test('должен обработать ошибку и установить error сообщение', () => {
      const errorMessage = 'Ошибка при сохранении данных';
      const action = {
        type: saveProfileEdit.rejected.type,
        payload: errorMessage,
      };
      const state = profileEditReducer(initialState, action as unknown as TestAction);
      expect(state.error).toBe(errorMessage);
      expect(state.isLoading).toBe(false);
    });

    test('должен установить isLoading = false при fulfilled, сохраняя предыдущую ошибку', () => {
      const stateWithError = {
        user: mockUserData,
        isLoading: true,
        error: 'Ошибка сохранения',
      };
      const action = {
        type: saveProfileEdit.fulfilled.type,
        payload: mockUserData,
      };
      const state = profileEditReducer(stateWithError, action as unknown as TestAction);
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUserData);
    });

    test('должен обновить данные пользователя при успешном сохранении', () => {
      const updatedUserData: IEditUser = {
        ...mockUserData,
        name: 'Updated Name',
        about: 'Updated about',
      };
      const action = {
        type: saveProfileEdit.fulfilled.type,
        payload: updatedUserData,
      };
      const state = profileEditReducer(
        { ...initialState, isLoading: true, user: mockUserData },
        action as unknown as TestAction
      );
      expect(state.user?.name).toBe('Updated Name');
      expect(state.user?.about).toBe('Updated about');
      expect(state.isLoading).toBe(false);
    });
  });

  describe('state transitions', () => {
    test('должен обработать последовательность pending -> fulfilled', () => {
      let state = profileEditReducer(initialState, setUserData(mockUserData));
      state = profileEditReducer(state, { type: saveProfileEdit.pending.type } as TestAction);
      expect(state.isLoading).toBe(true);

      const action = {
        type: saveProfileEdit.fulfilled.type,
        payload: mockUserData,
      };
      state = profileEditReducer(state, action as unknown as TestAction);
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUserData);
    });

    test('должен обработать последовательность pending -> rejected', () => {
      let state = profileEditReducer(initialState, setUserData(mockUserData));
      state = profileEditReducer(state, { type: saveProfileEdit.pending.type } as TestAction);

      const action = {
        type: saveProfileEdit.rejected.type,
        payload: 'Ошибка при сохранении',
      };
      state = profileEditReducer(state, action as unknown as TestAction);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка при сохранении');
    });
  });
});
