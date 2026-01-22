import CheckBoxEmpty from '@assets/img/IconsSvg/CheckBoxEmpty';
import CheckBoxDone from '@assets/img/IconsSvg/CheckBoxDone';
import CheckBoxRemove from '@assets/img/IconsSvg/CheckBoxRemove';
import ChevronDown from '@assets/img/IconsSvg/ChevronDown';
import type { IMultiFilterButton } from '@/types/types';
import style from './FilterMultiButton.module.css';

export default function FilterMultiButtons({
  name,
  handleClick,
  isActiveArray,
  arrayButton,
}: IMultiFilterButton) {
  const isActive = isActiveArray.includes(name);
  if (arrayButton === true) {
    return (
      <button type="button" onClick={() => handleClick(name)} className={`${style.buttonFilter}`}>
        {isActive ? <CheckBoxRemove fill="var(--color-accent-pressed)" /> : <CheckBoxEmpty />}
        {name}
        <div
          className={`${style.chevronContainer} ${isActive ? style.chevronContainerActive : ''}`}
        >
          <ChevronDown />
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => handleClick(name)}
      className={`${style.buttonFilter} ${isActive ? style.active : ''}`}
    >
      {isActive ? <CheckBoxDone fill="var(--color-accent-pressed)" /> : <CheckBoxEmpty />}
      {name}
    </button>
  );
}
