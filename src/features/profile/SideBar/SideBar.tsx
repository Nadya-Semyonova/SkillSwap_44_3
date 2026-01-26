import { useCallback } from 'react';
import styles from './SideBar.module.css';
import { SIDEBAR_BUTTONS, ICON_COMPONENTS } from './libs/sideBarConstants';
import type { SideBarProps } from './libs/types';

function SideBar({ activeButton, onButtonClick }: SideBarProps) {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, buttonId: string) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onButtonClick(buttonId);
      }
    },
    [onButtonClick]
  );

  return (
    <div className={styles.sideBarContainer}>
      <ul className={styles.sideBar}>
        {SIDEBAR_BUTTONS.map((button) => {
          const IconComponent = ICON_COMPONENTS[button.icon];
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
