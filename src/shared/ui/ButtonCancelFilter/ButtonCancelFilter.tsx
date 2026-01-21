import Cross from '@public/img/iconsSvg/Cross';
import style from './ButtonCancelFilter.module.css';
import type { IButtonCancelFilter } from './types/types';

export default function ButtonCancelFilter({
  title,
  textStyle,
  buttonStyle,
  fillSvg,
  handleClick,
}: IButtonCancelFilter) {
  return (
    <div className={`${style.buttonContainer} ${buttonStyle}`}>
      <span className={`${style.title} ${textStyle}`}>{title}</span>
      <button
        className={style.button}
        type="button"
        aria-label="Отменить фильтр"
        onClick={() => handleClick(title)}
      >
        <Cross fill={fillSvg} />
      </button>
    </div>
  );
}
