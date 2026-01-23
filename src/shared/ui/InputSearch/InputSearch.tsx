import Search from '@assets/img/IconsSvg/Search';
import styles from './InputSearch.module.css';

export default function InputSearch() {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <Search />
      </div>
      <input
        type="text"
        placeholder="Искать навык"
        className={styles.input}
        aria-label="Искать навык"
      />
    </div>
  );
}
