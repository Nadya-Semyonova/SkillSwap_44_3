import { getSkillColor } from '@shared/lib/constants/SkillColors';
import { declensionAge } from '@shared/lib/helpers/declension';
import ButtonDefault from '@shared/ui/ButtonDefault';
import { NavLink } from 'react-router-dom';
import { CARD_CONSTANTS } from '@/widgets/Card/libs/types';
import type { CardProps } from '@/widgets/Card/libs/types';
import style from './Card.module.css';
import CardConstants from './libs/CardConstants';
import LikeButton from '@/features/LikeButton';

function Card({
  user,
  variant = 'default',
  showFullName = true,
  fixedHeight = undefined,
}: CardProps & { fixedHeight?: string }) {
  // Формируем текст возраста с правильным склонением
  const ageText = user.age ? declensionAge(user.age) : '';

  // Формируем отображаемое имя
  const displayName = showFullName ? `${user.name}` : user.name;

  // Ограничиваем количество видимых тегов
  const visibleSkills = user.skill_off.slice(0, CARD_CONSTANTS.MAX_VISIBLE_SKILLS);
  const hiddenSkillsCount = Math.max(0, user.skill_off.length - CARD_CONSTANTS.MAX_VISIBLE_SKILLS);

  return (
    <div className={style.content} style={fixedHeight ? { height: fixedHeight } : {}}>
      <div className={style.header}>
        <img
          className={style.avatar}
          src={user.avatar || CARD_CONSTANTS.DEFAULT_AVATAR}
          alt={user.name}
          onError={(e) => {
            e.currentTarget.src = CARD_CONSTANTS.DEFAULT_AVATAR;
          }}
        />
        <div className={style.contentInfo}>
          <h2 className={style.name}>{displayName}</h2>
          <span className={style.caption}>
            {user.city}
            {ageText && `, ${ageText}`}
          </span>
        </div>

        {variant === 'default' && (
          <div className={style.likeContainer}>
            <LikeButton user={user} />
          </div>
        )}
      </div>
      {variant === 'profile' && <span className={style.aboutText}>{user.about}</span>}
      {user.card_people && (
        <div className={style.skillsSection}>
          <h4 className={style.skillTitle}>{CardConstants[0]}</h4>
          <span
            className={style.skillItem}
            style={{ backgroundColor: getSkillColor(user.card_people.skill) }}
            title={user.card_people.description}
          >
            {user.card_people.skill}
          </span>
        </div>
      )}

      <div className={style.skillsSection}>
        <h4 className={style.skillTitle}>{CardConstants[1]}</h4>
        <div className={style.skillItemsContainer}>
          {visibleSkills.map((skill) => (
            <span
              key={`${skill}-${user.id}`}
              className={style.skillItem}
              style={{ backgroundColor: getSkillColor(skill) }}
              title={skill}
            >
              {skill}
            </span>
          ))}

          {/* Тег "+N" если есть скрытые скиллы */}
          {hiddenSkillsCount > 0 && (
            <span
              className={`${style.skillItemNumber} ${style.moreTag}`}
              title={`Ещё ${hiddenSkillsCount} навыков`}
            >
              +{hiddenSkillsCount}
            </span>
          )}
        </div>
      </div>
      {variant !== 'profile' && (
        <NavLink to={`/${user.id}`}>
          <ButtonDefault
            name="Подробнее" // обязательный пропс
            styleButton={style.detailsButton} // опционально
          />
        </NavLink>
      )}
    </div>
  );
}

export default Card;
