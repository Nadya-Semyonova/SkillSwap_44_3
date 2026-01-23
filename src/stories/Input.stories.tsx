import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Input } from '../shared/ui/useInput';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Заголовок поля',
    },
    placeholder: {
      control: 'text',
      description: 'Текст placeholder',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel'],
      description: 'Тип input поля',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключенное состояние',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Введите текст',
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Имя',
    placeholder: 'Введите ваше имя',
  },
};

export const Email: Story = {
  args: {
    title: 'Email',
    placeholder: 'example@mail.com',
    type: 'email',
  },
};

export const Password: Story = {
  args: {
    title: 'Пароль',
    placeholder: 'Введите пароль',
    type: 'password',
  },
};

export const Disabled: Story = {
  args: {
    title: 'Отключенное поле',
    placeholder: 'Недоступно для ввода',
    disabled: true,
  },
};

export const ControlledInput: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '400px' }}>
        <Input {...args} value={value} onChange={setValue} />
        <div>
          <strong>Текущее значение:</strong> {value || 'пусто'}
        </div>
      </div>
    );
  },
  args: {
    title: 'Управляемое поле',
    placeholder: 'Введите текст...',
  },
};
