import { useEffect, useState } from 'react';
import type { SkillsData } from '../../types/types';
import styles from './SkillsSelector.module.css';
import { categoryIcons } from './SkillsCategories';

function SkillsSelector() {
  const [skillsData, setSkillsData] = useState<SkillsData>({});
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  useEffect(() => {
    fetch('/db/skills.json')
      .then((res) => res.json())
      .then((data: SkillsData) => {
        setSkillsData(data);
      })
      .catch((err) => {
        console.error('Ошибка загрузки навыков', err);
      });
  }, []);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((item) => item !== skill) : [...prev, skill]
    );
  };

  return (
    <div className={styles.wrapper}>
      {Object.entries(skillsData).map(([category, skills]) => (
        <section key={category} className={styles.category}>
          <span className={`${styles.category__icon} ${styles[categoryIcons[category].className]}`}>
            {categoryIcons[category].icon}
          </span>

          <div className={styles.category__content}>
            <h2>{category}</h2>

            <ul className={styles.skills}>
              {skills.map((skill) => {
                const isSelected = selectedSkills.includes(skill);

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
