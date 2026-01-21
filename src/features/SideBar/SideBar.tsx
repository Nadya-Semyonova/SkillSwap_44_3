import Request from '@public/img/IconsSvg/Request';
import MessageText from '@public/img/IconsSvg/MessageText';
import Like from '@public/img/IconsSvg/Like';
import Idea from '@public/img/IconsSvg/Idea';
import User from '@public/img/IconsSvg/User';
import styles from './SideBar.module.css';

function SideBar() {
  return (
    <div className={styles.sideBarContainer}>
      <ul className={styles.sideBar}>
        <li className={styles.item}>
          <Request />
          Заявки
        </li>
        <li className={styles.item}>
          <MessageText />
          Мои обмены
        </li>
        <li className={styles.item}>
          <Like />
          Избранное
        </li>
        <li className={styles.item}>
          <Idea />
          Мои навыки
        </li>
        <li className={styles.item}>
          <User />
          Личные данные
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
