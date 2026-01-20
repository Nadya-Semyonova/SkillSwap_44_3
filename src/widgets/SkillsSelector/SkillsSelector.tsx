import skills from '@public/db/skills.json';
import { useState } from 'react';
import type { SkillsData } from './libs/types';
import styles from './SkillsSelector.module.css';
import { SkillsCategoriesConstant } from './libs/SkillsCategoriesConstant';

const skillsData = skills as SkillsData;
function SkillsSelector() {
  const [selectedSkill, setSelectedSkill] = useState<string>('');

  const toggleSkill = (skill: string) => {
    setSelectedSkill((prev) => (prev === skill ? '' : skill));
  };

  return (
    <div className={styles.wrapper}>
      {Object.entries(skillsData).map(([category, categorySkills]) => (
        <section key={category} className={styles.category}>
          <span
            className={`${styles.category__icon} ${styles[SkillsCategoriesConstant[category].className]}`}
          >
            {SkillsCategoriesConstant[category].icon}
          </span>

          <div className={styles.category__content}>
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
