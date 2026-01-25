import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { RegistrationStep2 } from '@pages/RegistersPages/RegistrationStep2/RegistrationStep2';
import store from '@store/store';

const meta: Meta<typeof RegistrationStep2> = {
  title: 'Pages/Registration/Step2',
  component: RegistrationStep2,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RegistrationStep2>;

// Основная история
export const Default: Story = {
  render: () => <RegistrationStep2 />,
};

// История с демонстрацией
export const FormDemo: Story = {
  render: () => <RegistrationStep2 />,
  parameters: {
    docs: {
      description: {
        story: 'Форма заполнения информации о пользователе на втором шаге регистрации',
      },
    },
  },
};
