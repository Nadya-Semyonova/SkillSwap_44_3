import RadioButtonEmpty from '@public/img/IconsSvg/RadioButtonEmpty';
import RadioButtonActive from '@public/img/IconsSvg/RadioButtonActive';
import type { ISingleFilterButton } from '@/types/types';
import style from './FilterSingleButton.module.css';

export default function FilterSingleButtons({ name, handleClick, isActive }: ISingleFilterButton) {
  const isSelected = isActive === name;

  return (
    <button
      type="button"
      onClick={() => handleClick(name)}
      className={`${style.buttonFilter} ${isSelected ? style.active : ''}`}
    >
      {isSelected ? <RadioButtonActive fill="var(--color-accent-pressed)" /> : <RadioButtonEmpty />}
      {name}
    </button>
  );
}
