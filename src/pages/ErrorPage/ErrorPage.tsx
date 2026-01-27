import Error500 from '@/shared/assets/images/IllustrationsSvg/Error500';
import styles from './ErrorPage.module.css';

function ErrorPage() {
  return (
    <div className={styles.content}>
      <section className={styles.section}>
        <div className={styles.illustration}>
          <Error500 />
        </div>

        <div className={styles.textBlock}>
          <h2 className={styles.title}>На сервере произошла ошибка</h2>
          <p className={styles.text}>Попробуйте позже или вернитесь на главную страницу</p>
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

export default ErrorPage;
