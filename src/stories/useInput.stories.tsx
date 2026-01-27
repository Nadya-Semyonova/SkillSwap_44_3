import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../shared/ui/useInput';
import { UseInputDemo } from './components/UseInputDemo';

const meta: Meta<typeof Input> = {
  title: 'UI/useInput',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Универсальный компонент Input для ввода текста. Поддерживает заголовок, placeholder и обработку изменений.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Заголовок поля (отображается над input)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Текст placeholder (отображается когда поле пустое)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    onChange: {
      description: 'Callback функция, вызываемая при изменении значения',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const WithTitleAndPlaceholder: Story = {
  args: {
    title: 'Имя',
    placeholder: 'Введите ваше имя',
  },
  name: '📝 Пример из ТЗ',
  parameters: {
    docs: {
      description: {
        story:
          'Пример использования компонента как указано в техническом задании: с заголовком "Имя" и placeholder "Введите ваше имя".',
      },
    },
  },
};

export const PlaceholderOnly: Story = {
  args: {
    placeholder: 'Введите текст...',
  },
  name: 'Только placeholder',
};

export const TitleOnly: Story = {
  args: {
    title: 'Поле ввода',
  },
  name: 'Только заголовок',
};

export const Empty: Story = {
  args: {},
  name: 'Пустой компонент',
};

export const InteractiveDemo: Story = {
  render: () => <UseInputDemo />,
  name: '📊 Демонстрация работы',
  parameters: {
    docs: {
      description: {
        story: 'Интерактивная демонстрация работы компонента с отображением текущих значений.',
      },
    },
  },
};

export const UsageDocumentation: Story = {
  render: () => (
    <div style={{ maxWidth: '800px', fontFamily: 'var(--font-family-base)' }}>
      <h1 style={{ marginBottom: '24px' }}>📚 Документация компонента Input</h1>

      <h2 style={{ marginBottom: '16px' }}>Описание</h2>
      <p style={{ marginBottom: '20px' }}>
        Универсальный компонент для текстового ввода. Принимает три пропса: <code>title</code>,{' '}
        <code>placeholder</code> и <code>onChange</code>.
      </p>

      <h2 style={{ marginBottom: '16px' }}>Импорт</h2>
      <pre
        style={{
          padding: '16px',
          backgroundColor: 'var(--color-bg-card)',
          borderRadius: '8px',
          border: '1px solid var(--color-bg-toggle)',
          overflowX: 'auto',
          marginBottom: '20px',
        }}
      >
        {`import { Input } from '@shared/ui/useInput';`}
      </pre>

      <h2 style={{ marginBottom: '16px' }}>Примеры использования</h2>

      <h3 style={{ marginBottom: '12px' }}>1. Базовый пример (из ТЗ)</h3>
      <div
        style={{
          marginBottom: '24px',
          padding: '16px',
          backgroundColor: 'var(--color-accent-hover)',
          borderRadius: '8px',
        }}
      >
        <Input
          title="Имя"
          placeholder="Введите ваше имя"
          // onChange={(value) => console.log('Имя изменено:', value)}
        />
      </div>
      <pre
        style={{
          padding: '16px',
          backgroundColor: 'var(--color-bg-card)',
          borderRadius: '8px',
          border: '1px solid var(--color-bg-toggle)',
          overflowX: 'auto',
          marginBottom: '24px',
        }}
      >
        {`<Input 
  title="Имя"
  placeholder="Введите ваше имя"
  onChange={(value) => console.log(value)}
/>`}
      </pre>

      <h3 style={{ marginBottom: '12px' }}>2. Использование в форме</h3>
      <pre
        style={{
          padding: '16px',
          backgroundColor: 'var(--color-bg-card)',
          borderRadius: '8px',
          border: '1px solid var(--color-bg-toggle)',
          overflowX: 'auto',
          marginBottom: '24px',
        }}
      >
        {`import { useState } from 'react';
import { Input } from '@shared/ui/useInput';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form>
      <Input
        title="ФИО"
        placeholder="Иванов Иван Иванович"
        onChange={handleInputChange('name')}
      />
      <Input
        title="Email"
        placeholder="example@mail.com"
        onChange={handleInputChange('email')}
      />
      <Input
        title="Телефон"
        placeholder="+7 (999) 123-45-67"
        onChange={handleInputChange('phone')}
      />
    </form>
  );
}`}
      </pre>

      <h3 style={{ marginBottom: '12px' }}>3. Поле поиска</h3>
      <pre
        style={{
          padding: '16px',
          backgroundColor: 'var(--color-bg-card)',
          borderRadius: '8px',
          border: '1px solid var(--color-bg-toggle)',
          overflowX: 'auto',
          marginBottom: '24px',
        }}
      >
        {`function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div>
      <Input
        placeholder="Поиск..."
        onChange={setSearchQuery}
      />
      {searchQuery && (
        <p>Результаты поиска по запросу: {searchQuery}</p>
      )}
    </div>
  );
}`}
      </pre>

      <h2 style={{ marginBottom: '16px' }}>Пропсы</h2>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '20px',
          border: '1px solid var(--color-bg-toggle)',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: 'var(--color-accent-hover)' }}>
            <th
              style={{
                padding: '12px',
                border: '1px solid var(--color-bg-toggle)',
                textAlign: 'left',
              }}
            >
              Пропс
            </th>
            <th
              style={{
                padding: '12px',
                border: '1px solid var(--color-bg-toggle)',
                textAlign: 'left',
              }}
            >
              Тип
            </th>
            <th
              style={{
                padding: '12px',
                border: '1px solid var(--color-bg-toggle)',
                textAlign: 'left',
              }}
            >
              Обязательный
            </th>
            <th
              style={{
                padding: '12px',
                border: '1px solid var(--color-bg-toggle)',
                textAlign: 'left',
              }}
            >
              Описание
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '12px', border: '1px solid var(--color-bg-toggle)' }}>
              <code>title</code>
            </td>
            <td style={{ padding: '12px', border: '1px solid var(--color-bg-toggle)' }}>string</td>
            <td style={{ padding: '12px', border: '1px solid var(--color-bg-toggle)' }}>Нет</td>
            <td style={{ padding: '12px', border: '1px solid var(--color-bg-toggle)' }}>
              Заголовок поля. Отображается над input.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '12px', border: '1px solid var(--color-bg-toggle)' }}>
              <code>placeholder</code>
            </td>
            <td style={{ padding: '12px', border: '1px solid var(--color-bg-toggle)' }}>string</td>
            <td style={{ padding: '12px', border: '1px solid var(--color-bg-toggle)' }}>Нет</td>
            <td style={{ padding: '12px', border: '1px solid var(--color-bg-toggle)' }}>
              Текст placeholder. Отображается когда поле пустое.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '12px', border: '1px solid var(--color-bg-toggle)' }}>
              <code>onChange</code>
            </td>
            <td style={{ padding: '12px', border: '1px solid var(--color-bg-toggle)' }}>
              (value: string) ={'>'} void
            </td>
            <td style={{ padding: '12px', border: '1px solid var(--color-bg-toggle)' }}>Нет</td>
            <td style={{ padding: '12px', border: '1px solid var(--color-bg-toggle)' }}>
              Функция обратного вызова. Вызывается при изменении значения в поле.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 style={{ marginBottom: '16px' }}>Особенности</h2>
      <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
        <li style={{ marginBottom: '8px' }}>
          Компонент использует CSS переменные из <code>variables.css</code>
        </li>
        <li style={{ marginBottom: '8px' }}>
          Поддерживает состояние focus с визуальным выделением
        </li>
        <li style={{ marginBottom: '8px' }}>Имеет адаптивную ширину (не фиксированную)</li>
        <li style={{ marginBottom: '8px' }}>Соответствует дизайн-системе проекта</li>
        <li style={{ marginBottom: '8px' }}>
          Проходит проверку линтерами: <code>npm run lint</code>
        </li>
      </ul>

      <div
        style={{
          padding: '20px',
          backgroundColor: 'var(--color-accent-hover)',
          borderRadius: '8px',
          border: '1px solid var(--color-accent)',
        }}
      >
        <h3 style={{ marginBottom: '12px' }}>🚀 Быстрый старт</h3>
        <p>Просто импортируйте компонент и используйте:</p>
        <pre
          style={{
            padding: '12px',
            backgroundColor: 'var(--color-bg-card)',
            borderRadius: '6px',
            marginTop: '12px',
          }}
        >
          {`// Минимальный пример
<Input placeholder="Введите текст" />

// Полный пример
<Input 
  title="Заголовок"
  placeholder="Введите значение"
  onChange={(value) => console.log(value)}
/>`}
        </pre>
      </div>
    </div>
  ),
  name: '📚 Полная документация',
  parameters: {
    docs: {
      description: {
        story: 'Исчерпывающая документация по использованию компонента Input с примерами кода.',
      },
    },
  },
};
