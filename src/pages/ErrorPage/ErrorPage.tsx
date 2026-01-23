import Error500 from '@assets/img/IllustrationsSvg/Error500';
import styles from './ErrorPage.module.css';

function ErrorPage() {
  return (
    <div className={styles.content}>
      <div className={styles.illustration}>
        <Error500 />
      </div>

      <div className={styles.textBlock}>
        <h1 className={styles.title}>На сервере произошла ошибка</h1>
        <p className={styles.text}>Попробуйте позже или вернитесь на главную страницу</p>
      </div>

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
