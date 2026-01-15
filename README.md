# SkillSwap - Платформа обмена навыками

## Установка для разработчиков (Внимательно!):

 - Клонируйте репозиторий

 - Установите зависимости **`npm ci` вместо `npm install`** - это критически важно для одинаковых версий

 - Запуск в режиме разработки `npm run dev`

### Проверка что всё работает:

 - npm run build - должен пройти без ошибок

 - npm run lint - проверка кода

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

###### Рекомендации

**Частые коммиты** - не ждите конца дня, коммитьте каждый завершенный кусок

**Проверять билд** - если `npm run build` не проходит, нельзя пушить

**Команды для фиксов**

`npm run lint:fix`

`npm run lint:styles:fix` - ошибка может возникать из-за пустых ксс файлов

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
│   └── hooks/                  # Общие хуки для фич
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
