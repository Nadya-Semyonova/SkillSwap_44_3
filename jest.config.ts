import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Используем ts-jest для работы с TypeScript
  testEnvironment: 'jsdom', // Тестовая среда для браузера (например, для React)
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Преобразуем .ts и .tsx файлы с помощью ts-jest
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1', // Алиас для @
    '@widgets/(.*)': '<rootDir>/src/widgets/$1', // Алиас для @widgets
    '^@api/(.*)$': '<rootDir>/src/entities/api/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@layouts/(.*)$': '<rootDir>/src/layouts/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@public/(.*)$': '<rootDir>/public/$1',
    '^@db/(.*)$': '<rootDir>/src/db/$1',
    '^@img/(.*)$': '<rootDir>/src/shared/assets/images/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'ts', 'tsx'], // Расширения для TypeScript файлов
  transformIgnorePatterns: ['/node_modules/'], // Игнорируем node_modules
};

export default config;