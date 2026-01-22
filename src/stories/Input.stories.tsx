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

export const ControlledInput: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '400px' }}>
        <Input title={args.title} placeholder={args.placeholder} onChange={setValue} />
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

export const Empty: Story = {
  args: {},
};
