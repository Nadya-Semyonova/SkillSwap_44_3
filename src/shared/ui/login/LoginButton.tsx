/* eslint-disable react/require-default-props */
import { NavLink } from 'react-router-dom';
import styles from './LoginButton.module.css';

export interface LoginButtonProps {
  className?: string;
}

export default function LoginButton({ className = '' }: LoginButtonProps) {
  return (
    <NavLink
      to="/login"
      className={({ isActive }) => `${styles.button} ${className} ${isActive ? styles.active : ''}`}
      aria-label="Войти"
    >
      <span className={styles.text}>Войти</span>
    </NavLink>
  );
}
