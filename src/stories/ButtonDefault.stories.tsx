import type { Meta, StoryObj } from '@storybook/react';
import ButtonDefault from '../shared/ui/ButtonDefault';

const meta: Meta<typeof ButtonDefault> = {
  title: 'Components/OwnerButton',
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
    handleClick: () => console.log('Кнопка нажата'),
  },
};

// Пример с другим текстом
export const WithDifferentText: Story = {
  args: {
    name: 'Сохранить изменения',
    handleClick: () => console.log('Сохранение...'),
  },
};

// Пример с длинным текстом
export const LongText: Story = {
  args: {
    name: 'Очень длинный текст на кнопке который может не поместиться',
    handleClick: () => console.log('Длинная кнопка нажата'),
  },
};

// Пример без обработчика (используем действие Storybook)
export const NoHandler: Story = {
  args: {
    name: 'Кнопка без кастомного обработчика',
  },
};
