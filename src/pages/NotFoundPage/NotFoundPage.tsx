import Error404 from '@/shared/assets/images/IllustrationsSvg/Error404';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <div className={styles.content}>
      <section className={styles.section}>
        <div className={styles.illustration}>
          <Error404 />
        </div>

        <div className={styles.textBlock}>
          <h1 className={styles.title}>Страница не найдена</h1>
          <p className={styles.text}>
            К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте
            позже.
          </p>
        </div>
      </section>

      <div className={styles.actions}>
        <button type="button" className={styles.button}>
          Сообщить об ошибке
        </button>

        <button type="button" className={`${styles.button} ${styles.buttonActive}`}>
          На главную
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;
