const TOKEN_COOKIE_NAME = 'auth_token';
const TOKEN_EXPIRES_DAYS = 7;

export const generateAuthToken = (userId: number): string => {
  const timestamp = Date.now();
  return `token_${userId}_${timestamp}`;
};

export const setTokenCookie = (token: string, expiresDays: number = TOKEN_EXPIRES_DAYS): void => {
  const date = new Date();
  date.setTime(date.getTime() + expiresDays * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${TOKEN_COOKIE_NAME}=${token};${expires};path=/;SameSite=Strict`;
};

export const getTokenCookie = (): string | null => {
  const name = `${TOKEN_COOKIE_NAME}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');

  for (let i = 0; i < cookieArray.length; i += 1) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }

  return null;
};

export const removeTokenCookie = (): void => {
  document.cookie = `${TOKEN_COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Strict`;
};

export const hasTokenCookie = (): boolean => {
  return getTokenCookie() !== null;
};
