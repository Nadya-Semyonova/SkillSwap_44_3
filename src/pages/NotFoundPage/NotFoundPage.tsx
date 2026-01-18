import styles from './NotFoundPage.module.css';
import Error404 from '../../../public/img/IllustrationsSvg/Error404';

function NotFoundPage() {
  return (
    <div className={styles.content}>
      <div className={styles.illustration}>
        <Error404 />
      </div>

      <div className={styles.textBlock}>
        <h1 className={styles.title}>Страница не найдена</h1>
        <p className={styles.text}>
          К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже.
        </p>
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

export default NotFoundPage;
