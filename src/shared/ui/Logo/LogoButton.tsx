import Logo from '../../../../public/img/LogoSvg/Logo';
import styles from './LogoButton.module.css';

export default function LogoButton() {
  return (
    <button type="button" className={styles.logoButton} aria-label="SkillSwap Логотип">
      <Logo />
      <span className={styles.logoText}>SkillSwap</span>
    </button>
  );
}
