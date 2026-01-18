/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import Search from '../../../../public/img/IconsSvg/Search';
import styles from './InputSearch.module.css';

export interface InputSearchProps {
  className?: string;
  placeholder?: string;
}

export default function InputSearch({
  className = '',
  placeholder = 'Искать навык',
}: InputSearchProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.iconContainer}>
        <Search />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        disabled // заглушка
        aria-label="Искать навык"
      />
    </div>
  );
}
