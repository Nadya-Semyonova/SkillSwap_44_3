/* eslint-disable react/require-default-props */
import { NavLink } from 'react-router-dom';
import styles from './AboutProject.module.css';

export interface AboutProjectProps {
  className?: string;
  to?: string;
}

export default function AboutProject({ className = '', to = '' }: AboutProjectProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${styles.AboutProjectbutton} ${className} ${isActive ? styles.active : ''}`
      }
      end
      role="button"
      aria-label="О проекте"
    >
      <span className={styles.AboutProjecttext}>О проекте</span>
    </NavLink>
  );
}
