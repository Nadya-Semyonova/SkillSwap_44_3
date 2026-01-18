import type { IOvnerButton } from '../../../types/types';
import style from './OvnerButton.module.css';

export default function OwnerButton({ name, handleClick }: IOvnerButton) {
  return (
    <button type="button" onClick={() => handleClick()} className={style.button}>
      {name}
    </button>
  );
}
