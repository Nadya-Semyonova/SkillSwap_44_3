import Logo from '@assets/img/LogoSvg/Logo';
import style from './Logotype.module.css';

export default function Logotype() {
  return (
    <span className={style.logo}>
      <Logo /> SkillSwap
    </span>
  );
}
