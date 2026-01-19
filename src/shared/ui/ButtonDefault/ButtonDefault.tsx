import type { IButtonDefault } from '@/types/types';
import style from './ButtonDefault.module.css';

export default function ButtonDefault({ name, handleClick, styleButton }: IButtonDefault) {
  return (
    <button
      type="button"
      onClick={() => handleClick()}
      className={`${style.button} ${styleButton}`}
    >
      {name}
    </button>
  );
}
