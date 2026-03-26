# SkillSwap - Платформа обмена навыками
Проект «SkillSwap» — платформа обмена навыками «Я научу / Хочу научиться»
Название и краткое описание
SkillSwap — одностраничное (SPA) приложение, в котором пользователи публикуют навыки двух типов:
●	“Учу” — навыки, которыми пользователь готов делиться;

●	“Учусь” — навыки, которым пользователь хочет научиться.
Сервис позволяет находить взаимно подходящие пары, отправлять заявки на обмен и вести список текущих/завершённых сессий. Все данные берутся из JSON-моков; постоянные состояния (избранное, заявки, настройки) — в localStorage.

## Установка для разработчиков (Внимательно!):

- Клонируйте репозиторий

- Установите зависимости **`npm ci` вместо `npm install`** - это критически важно для одинаковых версий

- Запуск в режиме разработки `npm run dev`

### Проверка что всё работает:

1. Проверка TypeScript
   `npm run type-check`

2. Проверка линтера
   `npm run lint`

3. Проверка стилей
   `npm run lint:styles`

4. Проверка форматирования
   `npm run format:check`

5. Запуск dev-сервера
   `npm run dev`

6. Запуск Storybook
   `npm run storybook`

**Основная команда для проверок**

`npm run type-check && npm run lint && npm run format:check`

#### Технологии проекта на 16.01

- Vite - сборщик

- React 18 + TypeScript - основной стек

- Redux Toolkit - глобальное состояние

- React Router v6 - маршрутизация

- React Hook Form + Yup - формы и валидация

- Axios - HTTP-клиент

- Jest + RTL - тестирование

- ESLint (Airbnb) + Prettier + Stylelint - линтинг

- Storybook - документация компонентов

##### Code Style

- Типизация: Всегда используйте TypeScript типы

- Именование: PascalCase для компонентов, camelCase для остального

##### Рекомендации

**Частые коммиты** - не ждите конца дня, коммитьте каждый завершенный кусок

**Команды для фиксов**

`npm run lint:fix`

`npm run lint:styles:fix`

`npm run format`

# Архитектура

```
.storybook/                      # Основная папка сторибука
│
public/                          # Общая папка для моков и img
├── db/
│   ├── skills.json
│   ├── users.json
├── img/
src/
├── app/                         # Инициализация приложения
│   ├── App.module.css
│   ├── App.tsx                  # Корневой компонент всего приложения
│   ├── AppRoute.tsx             # Конфигурация всех маршрутов приложения
│   └── providers/               # Провайдеры контекстов (Redux, Router)
│
│
├── entities/                    # Бизнес-сущности приложения
│   └── user.ts
│
│
├── features/                   # Бизнес-фичи (основная логика)
│   ├── auth/                   # ФИЧА: Аутентификация и авторизация
│   │   ├── api/                # API-запросы для работы с авторизацией
│   │   │   └── authApi.ts      # Методы: register()
│   │   └── model/              # Модель данных и стейт-менеджмент
│   │
│   │
│   └── hooks/                  # Общие хуки бизнеса для фич
│       # Возможно: useAuth(), useSkills(), useLocalStorage()
│
├── index.css                   # Глобальные стили (сброс, базовые стили)
├── layouts/                    # Макеты (шаблоны) страниц
│   └── layout.tsx              # Основной layout: Header + Footer + Main
│
│
├── main.tsx
├── pages/
│   ├── CreateSkillPage/
│   ├── ErrorPage/              # Страница 500 ошибки
│   ├── FavoritesPage/
│   ├── HomePage/
│   │   ├── HomePage.module.css
│   │   └── HomePage.tsx
│   ├── NotFoundPage/           # Страница 404
│   ├── ProfilePage/
│   ├── RegisterPage/           # Страница регистрации
│   └── SkillPage/              # Страница деталей навыка
│
├── shared/                     # Переиспользуемый код (без бизнес-логики)
│   ├── assets/                 # Статические ресурсы
│   │   ├── fonts/              # Шрифты проекта
│   │   └── styles/
│   │       └── variables.css   # CSS-переменные
│   │
│   ├── hooks/                  # Переиспользуемые React хуки
│   │   # Будет: useDebounce, useLocalStorage, useMediaQuery
│   │
│   ├── lib/                    # Вспомогательные библиотеки
│   │   ├── constants/          # Константы приложения
│   │   │   ├── lazyApp.ts
│   │   │   └── routes.ts       # Все маршруты приложения (пути)
│   │   └── helpers/            # Хелпер-функции
│   │
│   └── ui/                     # UI-компоненты
│
├── store/                      # Глобальное состояние (Redux Toolkit)
│   ├── slices/
│   └── store.ts
│
├── stories/                    # Storybook (документация компонентов)
│   └── TestButton.stories.tsx  # Пример Storybook-стори
│
├── types/                      # Глобальные TypeScript типы
│   └── types.ts
│
├── vite-env.d.ts               # Типы для Vite
└── widgets/                    # Самостоятельные виджеты
    ├── Card/                   # Виджет карточки навыка
    └── FiltersBar/             # Виджет панели фильтров
```
