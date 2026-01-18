import type { Meta, StoryObj } from '@storybook/react';
import ButtonDefault from '../shared/ui/ButtonDefault';
import '../shared/ui/ButtonDefault/ButtonDefault.module.css'; // Импорт стилей

const meta: Meta<typeof ButtonDefault> = {
  title: 'Components/ButtonDefault',
  component: ButtonDefault,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Текст кнопки',
    },
    handleClick: {
      action: 'clicked',
      description: 'Обработчик клика',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonDefault>;

// Основная история с базовыми параметрами
export const Primary: Story = {
  args: {
    name: 'Кнопка владельца',
  },
};

// Пример с другим текстом
export const WithDifferentText: Story = {
  args: {
    name: 'Сохранить изменения',
  },
};

// Пример с длинным текстом
export const LongText: Story = {
  args: {
    name: 'Очень длинный текст на кнопке который может не поместиться',
  },
};

// Пример с кастомным обработчиком
export const WithCustomHandler: Story = {
  args: {
    name: 'Кнопка с кастомным обработчиком',
    handleClick: () => {},
  },
};
