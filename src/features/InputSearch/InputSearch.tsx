import Search from '@/shared/assets/images/IconsSvg/Search';
import styles from './InputSearch.module.css';

type InputSearchProps = {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
};

export default function InputSearch({ value, onChange, onFocus = undefined }: InputSearchProps) {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <Search />
      </div>
      <input
        type="text"
        placeholder="Поиск"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        className={styles.input}
        aria-label="Поиск"
      />
    </div>
  );
}
