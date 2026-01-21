// src/stories/Selector.stories.tsx

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Selector } from '../shared/ui/useSelector';

const meta: Meta<typeof Selector> = {
  title: 'Shared/UI/Selector',
  component: Selector,
  argTypes: {
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
} satisfies Meta<typeof Selector>;

export default meta;

type Story = StoryObj<typeof Selector>;

interface BasicTemplateProps {
  title?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

function BasicTemplate(props: BasicTemplateProps): JSX.Element {
  const { title, placeholder, error, disabled, required } = props;

  const [selectedOptions, setSelectedOptions] = useState<Record<string, boolean>>({});

  const toggleOption = (key: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const options = [
    { key: 'business', label: 'Бизнес и карьера' },
    { key: 'creative', label: 'Творчество и искусство' },
    { key: 'languages', label: 'Иностранные языки' },
    { key: 'health', label: 'Здоровье и лайфстайл' },
    { key: 'home', label: 'Дом и уют' },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <Selector
        title={title}
        placeholder={placeholder}
        error={error}
        disabled={disabled}
        required={required}
        onChange={(value) => toggleOption(value as string)}
      >
        {options.map(({ key, label }) => {
          const id = `selector-option-${key}`;

          return (
            <div
              key={key}
              className="checkbox-container"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <input
                id={id}
                type="checkbox"
                name={key}
                checked={!!selectedOptions[key]}
                onChange={() => toggleOption(key)}
                disabled={disabled}
                className="checkbox-input"
              />

              <label
                htmlFor={id}
                className="checkbox-label"
                style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
              >
                {label}
              </label>
            </div>
          );
        })}
      </Selector>
    </div>
  );
}

BasicTemplate.defaultProps = {
  title: '',
  placeholder: 'Выберите значение',
  error: '',
  disabled: false,
  required: false,
};

export const Default: Story = {
  render: BasicTemplate,
  args: {
    title: 'Категория навыка, которому хотите научиться',
    placeholder: 'Выберите категорию',
  },
};

export const WithError: Story = {
  render: BasicTemplate,
  args: {
    title: 'Категория навыка',
    placeholder: 'Выберите категорию',
    error: 'Пожалуйста, выберите категорию',
  },
};

export const Disabled: Story = {
  render: BasicTemplate,
  args: {
    title: 'Категория навыка',
    placeholder: 'Выберите категорию',
    disabled: true,
  },
};

export const Required: Story = {
  render: BasicTemplate,
  args: {
    title: 'Категория навыка',
    placeholder: 'Выберите категорию',
    required: true,
  },
};
