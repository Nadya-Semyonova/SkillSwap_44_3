import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { RegistrationStep2 } from '../features/auth/registration/ui/RegistrationStep2/RegistrationStep2';
import '../features/auth/registration/ui/RegistrationStep2/RegistrationStep2.module.css';

const meta: Meta<typeof RegistrationStep2> = {
  title: 'Features/Registration/RegistrationStep2',
  component: RegistrationStep2,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#f9faf7',
        },
        {
          name: 'white',
          value: '#ffffff',
        },
      ],
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ minHeight: '100vh', padding: '20px', backgroundColor: 'var(--color-bg-main)' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RegistrationStep2>;

// Основная история с базовыми параметрами
export const Default: Story = {
  render: () => <RegistrationStep2 />,
};

// История с центрированным контейнером для лучшего просмотра
export const Centered: Story = {
  render: () => (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <RegistrationStep2 />
    </div>
  ),
};

// История с белым фоном для контраста
export const OnWhiteBackground: Story = {
  parameters: {
    backgrounds: {
      default: 'white',
    },
  },
  render: () => <RegistrationStep2 />,
};

// История с минимальным отступом
export const Compact: Story = {
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ padding: '0' }}>
        <Story />
      </div>
    ),
  ],
  render: () => <RegistrationStep2 />,
};
