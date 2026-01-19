import { NavLink } from 'react-router-dom';
import styles from './AboutProject.module.css';

export default function AboutProject() {
  return (
    <NavLink to="" className={styles.AboutProjectbutton} end role="button" aria-label="О проекте">
      О проекте
    </NavLink>
  );
}
