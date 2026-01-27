import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',  // Используем ts-jest для работы с TypeScript
  testEnvironment: 'jsdom',  // Тестовая среда для браузера (например, для React)
  transform: {
    '^.+\\.tsx?$': 'ts-jest',  // Преобразуем .ts и .tsx файлы с помощью ts-jest
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',  // Алиас для @
    '@widgets/(.*)': '<rootDir>/src/widgets/$1',  // Алиас для @widgets
  },
  moduleFileExtensions: ['js', 'ts', 'tsx'],  // Расширения для TypeScript файлов
  transformIgnorePatterns: ['/node_modules/'],  // Игнорируем node_modules
};

export default config;