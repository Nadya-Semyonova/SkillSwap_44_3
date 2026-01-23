import Request from '@/shared/assets/images/IconsSvg/Request';
import MessageText from '@/shared/assets/images/IconsSvg/MessageText';
import Like from '@/shared/assets/images/IconsSvg/Like';
import Idea from '@/shared/assets/images/IconsSvg/Idea';
import User from '@/shared/assets/images/IconsSvg/User';
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
