import type { IButtonDefault } from '@/types/types';
import style from './ButtonDefault.module.css';

export default function ButtonDefault({ name, handleClick, styleButton, type }: IButtonDefault) {
  if (handleClick) {
    return (
      <button
        type={type}
        onClick={() => handleClick()}
        className={`${style.button} ${styleButton}`}
      >
        {name}
      </button>
    );
  }

  return (
    <button type={type} className={`${style.button} ${styleButton}`}>
      {name}
    </button>
  );
}
