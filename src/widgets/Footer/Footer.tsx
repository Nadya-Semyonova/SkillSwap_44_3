import Logotype from '@/shared/ui/Logotype';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.branding}>
          <Logotype />
        </div>

        <div className={styles.navMenu}>
          <nav className={styles.navSection}>
            <ul className={styles.navList}>
              <li>
                <a href="/about" className={styles.navLink}>
                  О проекте
                </a>
              </li>
              <li>
                <a href="/skills" className={styles.navLink}>
                  Все навыки
                </a>
              </li>
            </ul>
          </nav>

          <nav className={styles.navSection}>
            <ul className={styles.navList}>
              <li>
                <a href="/contacts" className={styles.navLink}>
                  Контакты
                </a>
              </li>
              <li>
                <a href="/blog" className={styles.navLink}>
                  Блог
                </a>
              </li>
            </ul>
          </nav>

          <nav className={styles.navSection}>
            <ul className={styles.navList}>
              <li>
                <a href="/privacy" className={styles.navLink}>
                  Политика конфиденциальности
                </a>
              </li>
              <li>
                <a href="/terms" className={styles.navLink}>
                  Пользовательское соглашение
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <p className={styles.copyright}>SkillSwap – 2025</p>
      </div>
    </footer>
  );
}
