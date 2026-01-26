import type { IUser } from '@/types/types';

const USER_STORAGE_KEY = 'user_data';

export const setUserToLocalStorage = (user: IUser): void => {
  try {
    const userJson = JSON.stringify(user);
    localStorage.setItem(USER_STORAGE_KEY, userJson);
  } catch {
    // Ошибка при удалении пользователя из LocalStorage
  }
};

export const getUserFromLocalStorage = (): IUser | null => {
  try {
    const userJson = localStorage.getItem(USER_STORAGE_KEY);
    if (!userJson) {
      return null;
    }
    return JSON.parse(userJson) as IUser;
  } catch {
    return null;
  }
};

export const removeUserFromLocalStorage = (): void => {
  try {
    localStorage.removeItem(USER_STORAGE_KEY);
  } catch {
    // Ошибка при удалении пользователя из LocalStorage
  }
};

export const hasUserInLocalStorage = (): boolean => {
  return getUserFromLocalStorage() !== null;
};
