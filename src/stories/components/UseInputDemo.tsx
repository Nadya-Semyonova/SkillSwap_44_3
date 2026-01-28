import { useState } from 'react';
import { Input } from '../../shared/ui/useInput';

export function UseInputDemo() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        padding: '24px',
        maxWidth: '500px',
        margin: '0 auto',
        fontFamily: 'var(--font-family-base)',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '16px' }}>Пример 1: Поле с заголовком (ТЗ пример)</h3>
        <Input title="Имя" placeholder="Введите ваше имя" onChange={setName} />
        <div style={{ marginTop: '8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Текущее значение: <strong>{name || 'пусто'}</strong>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Пример 2: Поле без заголовка</h3>
        <Input placeholder="Введите email" onChange={setEmail} />
        <div style={{ marginTop: '8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Текущее значение: <strong>{email || 'пусто'}</strong>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Пример 3: Пустое поле</h3>
        <Input />
        <div style={{ marginTop: '8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Компонент без пропсов
        </div>
      </div>

      <div
        style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: 'var(--color-accent-hover)',
          borderRadius: '8px',
        }}
      >
        <h4 style={{ marginBottom: '12px' }}>Сводка значений:</h4>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>
            <strong>Имя:</strong> {name || 'не указано'}
          </li>
          <li>
            <strong>Email:</strong> {email || 'не указан'}
          </li>
        </ul>
      </div>
    </div>
  );
}
