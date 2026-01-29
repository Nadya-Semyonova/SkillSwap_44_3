import type { PayloadAction } from '@reduxjs/toolkit';
import registerReducer, {
  setAvatar,
  setName,
  setCity,
  setDateOfBirth,
  setGender,
  setEmail,
  setPassword,
  setAbout,
  setSkill,
  setPhotos,
  setSkillOff,
  registerUser,
} from '../slices/registerUserSlice.ts/registerUserSlice';

jest.mock('@/shared/lib/cookies/cookies', () => ({
  setTokenCookie: jest.fn(),
}));

jest.mock('@/shared/lib/localstorage', () => ({
  setUserToLocalStorage: jest.fn(),
}));

type TestAction = PayloadAction<unknown, string, unknown, string>;

const mockUser = {
  avatar: 'avatar.jpg',
  name: 'Ivan Ivanov',
  city: 'Moscow',
  dateOfBirth: '1994-06-01',
  gender: 'Male',
  email: 'ivan@mail.ru',
  password: 'password1234',
  about: 'Me',
  card_people: {
    skill: 'React',
    category: 'Frontend',
    subcategory: 'JavaScript',
    description: 'React development',
    photos: ['photo.jpg'],
  },
  skill_off: ['Angular'],
};

describe('registerUserSlice', () => {
  const initialState = {
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

  describe('initialState', () => {
    test('должен возвращать корректное начальное состояние', () => {
      const state = registerReducer(undefined, { type: 'unknown' } as TestAction);
      expect(state).toEqual(initialState);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('user info reducers', () => {
    test('должен устанавливать аватар, имя, город, дату рождения', () => {
      let state = registerReducer(initialState, setAvatar(mockUser.avatar));
      state = registerReducer(state, setName(mockUser.name));
      state = registerReducer(state, setCity(mockUser.city));
      state = registerReducer(state, setDateOfBirth(mockUser.dateOfBirth));
      expect(state.avatar).toBe(mockUser.avatar);
      expect(state.name).toBe(mockUser.name);
      expect(state.city).toBe(mockUser.city);
      expect(state.dateOfBirth).toBe(mockUser.dateOfBirth);
    });

    test('должен устанавливать пол, email, пароль, описание', () => {
      let state = registerReducer(initialState, setGender(mockUser.gender));
      state = registerReducer(state, setEmail(mockUser.email));
      state = registerReducer(state, setPassword(mockUser.password));
      state = registerReducer(state, setAbout(mockUser.about));
      expect(state.gender).toBe(mockUser.gender);
      expect(state.email).toBe(mockUser.email);
      expect(state.password).toBe(mockUser.password);
      expect(state.about).toBe(mockUser.about);
    });
  });

  describe('skill and card_people reducers', () => {
    test('должен устанавливать умения и фотографии', () => {
      let state = registerReducer(initialState, setSkill(mockUser.card_people.skill));
      state = registerReducer(state, setPhotos(mockUser.card_people.photos));
      expect(state.card_people.skill).toBe(mockUser.card_people.skill);
      expect(state.card_people.photos).toEqual(mockUser.card_people.photos);
    });

    test('должен устанавливать отключенные умения', () => {
      const state = registerReducer(initialState, setSkillOff(mockUser.skill_off));
      expect(state.skill_off).toEqual(mockUser.skill_off);
    });

    test('должен обновлять фотографии при повторном вызове', () => {
      let state = registerReducer(initialState, setPhotos(['photo1.jpg']));
      expect(state.card_people.photos).toEqual(['photo1.jpg']);
      state = registerReducer(state, setPhotos(['photo1.jpg', 'photo2.jpg']));
      expect(state.card_people.photos).toEqual(['photo1.jpg', 'photo2.jpg']);
    });
  });

  describe('registerUser asyncThunk', () => {
    test('должен установить loading = true при pending', () => {
      const action = { type: registerUser.pending.type };
      const state = registerReducer(initialState, action as TestAction);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('должен установить loading = false при fulfilled', () => {
      const action = { type: registerUser.fulfilled.type };
      const state = registerReducer({ ...initialState, loading: true }, action as TestAction);
      expect(state.loading).toBe(false);
    });

    test('должен установить error и loading = false при rejected', () => {
      const errorMessage = 'Ошибка регистрации';
      const action = {
        type: registerUser.rejected.type,
        error: { message: errorMessage },
      };
      const state = registerReducer(
        { ...initialState, loading: true },
        action as unknown as TestAction
      );
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('state transitions and workflows', () => {
    test('должен обрабатывать полный цикл регистрации', () => {
      let state = initialState;

      // Заполняем данные пользователя
      state = registerReducer(state, setEmail(mockUser.email));
      state = registerReducer(state, setPassword(mockUser.password));
      state = registerReducer(state, setName(mockUser.name));
      expect(state.email).toBe(mockUser.email);
      expect(state.password).toBe(mockUser.password);
      expect(state.name).toBe(mockUser.name);

      // Начало регистрации
      state = registerReducer(state, { type: registerUser.pending.type } as TestAction);
      expect(state.loading).toBe(true);

      // Успешная регистрация
      state = registerReducer(state, { type: registerUser.fulfilled.type } as TestAction);
      expect(state.loading).toBe(false);
    });

    test('Должен очищать error при new pending', () => {
      let state = {
        ...initialState,
        error: 'Предыдущая ошибка',
        loading: false,
      };

      const action = { type: registerUser.pending.type };
      state = registerReducer(state, action as TestAction);
      expect(state.error).toBeNull();
      expect(state.loading).toBe(true);
    });

    test('должен обновлять данные', () => {
      let state = initialState;
      state = registerReducer(state, setPassword(mockUser.password));
      state = registerReducer(state, setAvatar(mockUser.avatar));
      state = registerReducer(state, setCity(mockUser.city));

      expect(state.password).toBe(mockUser.password);
      expect(state.avatar).toBe(mockUser.avatar);
      expect(state.city).toBe(mockUser.city);
    });
  });
});
