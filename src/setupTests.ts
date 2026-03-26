import '@testing-library/jest-dom';

// Глобальные типы для Jest
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toContain(expected: unknown): R;
      toBe(expected: unknown): R;
      toEqual(expected: unknown): R;
    }
  }
}
