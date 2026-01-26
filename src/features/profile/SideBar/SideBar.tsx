import Request from '@/shared/assets/images/IconsSvg/Request';
import MessageText from '@/shared/assets/images/IconsSvg/MessageText';
import Like from '@/shared/assets/images/IconsSvg/Like';
import Idea from '@/shared/assets/images/IconsSvg/Idea';
import User from '@/shared/assets/images/IconsSvg/User';
import styles from './SideBar.module.css';
import { SIDEBAR_BUTTONS } from './sideBarConstants';

const iconComponents = {
  Request,
  MessageText,
  Like,
  Idea,
  User,
};

interface SideBarProps {
  activeButton: string;
  onButtonClick: (buttonId: string) => void;
}

function SideBar({ activeButton, onButtonClick }: SideBarProps) {
  const handleKeyDown = (event: React.KeyboardEvent, buttonId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onButtonClick(buttonId);
    }
  };

  return (
    <div className={styles.sideBarContainer}>
      <ul className={styles.sideBar}>
        {SIDEBAR_BUTTONS.map((button) => {
          const IconComponent = iconComponents[button.icon];
          const isActive = activeButton === button.id;

          return (
            <li key={button.id}>
              <button
                type="button"
                className={`${styles.item} ${isActive ? styles.active : ''}`}
                onClick={() => onButtonClick(button.id)}
                onKeyDown={(e) => handleKeyDown(e, button.id)}
                aria-label={button.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <IconComponent />
                {button.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideBar;
