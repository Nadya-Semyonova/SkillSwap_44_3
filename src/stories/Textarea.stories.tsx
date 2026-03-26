import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '@shared/ui/Textarea/Textarea';
import '@shared/ui/Textarea/Textarea.module.css';
import '../shared/assets/styles/variables.css';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Заголовок поля (отображается как label)',
    },
    placeholder: {
      control: 'text',
      description: 'Текст подсказки в пустом поле',
    },
    value: {
      control: 'text',
      description: 'Контролируемое значение поля',
    },
    onChange: {
      action: 'changed',
      description: 'Обработчик изменения значения',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключено ли поле',
    },
    maxLength: {
      control: 'number',
      description: 'Максимальная длина текста',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS классы',
    },
    errorMessage: {
      control: 'text',
      description: 'Сообщение об ошибке валидации',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Автоматически установить фокус на поле при загрузке',
    },
    required: {
      control: 'boolean',
      description: 'Обязательное поле (автоматическая валидация на пустоту)',
    },
    requiredErrorMessage: {
      control: 'text',
      description: 'Кастомное сообщение об ошибке для обязательного поля',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

// Textarea по умолчанию
export const Default: Story = {
  args: {
    title: 'Описание',
  },
};

// Textarea с placeholder
export const WithPlaceholder: Story = {
  args: {
    title: 'Комментарий',
    placeholder: 'Введите ваш комментарий...',
  },
};

// Textarea с ошибкой валидации на пустоту
export const WithValidationError: Story = {
  args: {
    title: 'Описание',
    placeholder: 'Введите описание',
    value: '',
    errorMessage: 'Поле не может быть пустым',
  },
};

// Textarea с автоматической валидацией (required)
export const Required: Story = {
  args: {
    title: 'Обязательное поле',
    placeholder: 'Введите текст (поле обязательно)',
    value: '',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Поле с автоматической валидацией. Ошибка появится, если поле пустое или содержит только пробелы. Попробуйте очистить поле или ввести только пробелы.',
      },
    },
  },
};

// Textarea с кастомным сообщением об ошибке
export const RequiredWithCustomMessage: Story = {
  args: {
    title: 'Обязательное поле',
    placeholder: 'Введите описание',
    value: '',
    required: true,
    requiredErrorMessage: 'Это поле обязательно для заполнения',
  },
};

// Состояние: Пустое поле
export const Empty: Story = {
  args: {
    title: 'Описание',
    placeholder: 'Начните вводить текст...',
    value: '',
  },
};

// Состояние: С текстом
export const WithText: Story = {
  args: {
    title: 'О себе',
    placeholder: 'Расскажите о себе',
    value:
      'Это пример заполненного текстового поля. Здесь может быть любой текст, который пользователь ввел в textarea.',
  },
};

// Состояние: С фокусом
export const WithFocus: Story = {
  args: {
    title: 'Описание',
    placeholder: 'Поле в фокусе - начните вводить текст',
    value: '',
    autoFocus: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Это состояние показывает textarea с автоматическим фокусом. Поле получает фокус при загрузке компонента.',
      },
    },
  },
};

// Состояние: С ошибкой
export const WithError: Story = {
  args: {
    title: 'Описание',
    placeholder: 'Введите описание',
    value: '',
    errorMessage: 'Поле обязательно для заполнения',
  },
};

// Состояние: Disabled
export const Disabled: Story = {
  args: {
    title: 'Отключенное поле',
    placeholder: 'Это поле отключено',
    value: 'Текст в отключенном поле',
    disabled: true,
  },
};
