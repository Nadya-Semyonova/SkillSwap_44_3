import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import Header from '@features/header/header';
import authReducer from '@store/slices/authSlice/authSlice';
import usersDataReducer from '@store/slices/userDataSlice/userDataSlice';
import filtersReducer from '@store/slices/filtersSlice/filtersSlice';
import registerReducer from '@store/slices/registerUserSlice.ts/registerUserSlice';
import '@shared/assets/styles/theme/light.css';
import '@shared/assets/styles/theme/dark.css';
import { authorizedUserMock } from './mocks/headerMocks';
import type { IUser } from '@/types/types';

interface HeaderStoryProps {
  userData: IUser | null;
}

const meta: Meta<HeaderStoryProps> = {
  title: 'Components/Header',
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
  },
  argTypes: {
    userData: {
      control: 'object',
      description: 'Объект пользователя или null для гостя',
    },
  },
};

export default meta;

type Story = StoryObj<HeaderStoryProps>;

const createMockStore = (user: IUser | null = null) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      users: usersDataReducer,
      filters: filtersReducer,
      registration: registerReducer,
    },
    preloadedState: {
      auth: {
        user,
        loading: false,
        error: null,
      },
    },
  });
};

function HeaderWithProviders({
  userData = null,
  theme = 'light',
}: {
  userData?: IUser | null;
  theme?: 'light' | 'dark';
}) {
  const store = createMockStore(userData);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(theme);

  useEffect(() => {
    setCurrentTheme(theme);
    const root = document.documentElement;
    root.classList.remove('light-theme', 'dark-theme');
    root.classList.add(`${theme}-theme`);
  }, [theme]);

  return (
    <div className={`${currentTheme}-theme`}>
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    </div>
  );
}

export const GuestDefault: Story = {
  render: (args) => <HeaderWithProviders userData={args.userData} />,
  args: {
    userData: null,
  },
};

export const AuthorizedDefault: Story = {
  render: (args) => <HeaderWithProviders userData={args.userData} />,
  args: {
    userData: authorizedUserMock,
  },
};

export const AuthorizedWithSkillsMenu: Story = {
  render: (args) => <HeaderWithProviders userData={args.userData} />,
  args: {
    userData: authorizedUserMock,
  },
  play: async ({ canvasElement }) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    const skillsButton = canvasElement.querySelector(
      'button[aria-label="Все навыки"]'
    ) as HTMLButtonElement | null;

    if (skillsButton) {
      skillsButton.click();
    }
  },
};

export const WithActiveSearch: Story = {
  render: (args) => <HeaderWithProviders userData={args.userData} />,
  args: {
    userData: authorizedUserMock,
  },
  play: ({ canvasElement }) => {
    const searchInput = canvasElement.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement | null;
    if (searchInput) {
      searchInput.focus();
      searchInput.value = 'React';
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  },
};

export const WithOpenNotifications: Story = {
  render: (args) => <HeaderWithProviders userData={args.userData} />,
  args: {
    userData: authorizedUserMock,
  },
  play: async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    const notificationsButton = document.querySelector(
      'button[aria-label="Уведомления"]'
    ) as HTMLElement | null;

    if (notificationsButton) {
      const event = new MouseEvent('mousedown', { bubbles: true });
      notificationsButton.dispatchEvent(event);
    }
  },
};
