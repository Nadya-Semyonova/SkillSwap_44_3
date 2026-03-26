import { useState } from 'react';
import { useSelector } from '@store/store';
import type { SkillsData } from './libs/types';
import styles from './SkillsSelector.module.css';
import { SkillsCategoriesConstant } from './libs/SkillsCategoriesConstant';

function SkillsSelector() {
  const skills = useSelector((state) => state.users.skills);

  const skillsData = skills as SkillsData;
  const [selectedSkill, setSelectedSkill] = useState<string>('');

  const toggleSkill = (skill: string) => {
    setSelectedSkill((prev) => (prev === skill ? '' : skill));
  };

  if (!skillsData) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      {Object.entries(skillsData).map(([category, categorySkills]) => (
        <section key={category} className={styles.category}>
          <span
            className={`${styles.categoryIcon} ${styles[SkillsCategoriesConstant[category].className]}`}
          >
            {SkillsCategoriesConstant[category].icon}
          </span>

          <div className={styles.categoryContent}>
            <h2>{category}</h2>

            <ul className={styles.skills}>
              {categorySkills.map((skill) => {
                const isSelected = selectedSkill === skill;

                return (
                  <li key={skill}>
                    <button
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`${styles.skill} ${isSelected ? styles.selected : ''}`}
                    >
                      {skill}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}

export default SkillsSelector;
