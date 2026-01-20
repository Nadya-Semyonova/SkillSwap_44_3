/* eslint-disable react/require-default-props */
import { NavLink } from 'react-router-dom';
import styles from './RegisterButton.module.css';

export interface RegisterButtonProps {
  className?: string;
}

export default function RegisterButton({ className = '' }: RegisterButtonProps) {
  return (
    <NavLink
      to="/register"
      className={({ isActive }) => `${styles.button} ${className} ${isActive ? styles.active : ''}`}
      aria-label="Зарегистрироваться"
    >
      <span className={styles.text}>Зарегистрироваться</span>
    </NavLink>
  );
}
