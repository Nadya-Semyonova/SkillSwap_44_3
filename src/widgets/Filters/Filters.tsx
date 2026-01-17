import { useState } from 'react';
import style from './Filters.module.css';
import FilterMultiButtons from '../../shared/FilterMultiButton';
import FilterSingleButtons from '../../shared/FilterSingleButton';
import { FilterOptions } from './FilterConstants';
import cities from '../../../public/db/city.json';
import skillsCategory from '../../../public/db/skills.json';

export default function Filters() {
  const [activeLearn, setActiveLearn] = useState<string>('Всё');
  const [activeCities, setActiveCities] = useState<string[]>(['']);
  const [activeCategoryButton, setActiveCategoryButton] = useState<string[]>([]);
  const [activeSkills, setActiveSkills] = useState<string[]>([]);

  // Состояния для кнопок "Показать еще"
  const [showAllCities, setShowAllCities] = useState<boolean>(false);
  const [showAllSkills, setShowAllSkills] = useState<boolean>(false);

  const DEFAULT_SHOW_COUNT = 5;

  const handleClickCity = (city: string) => {
    if (activeCities.includes(city)) {
      setActiveCities(activeCities.filter((c) => c !== city));
    } else {
      setActiveCities([...activeCities, city]);
    }
  };

  const handleClickArrayButton = (categoryName: string) => {
    if (activeCategoryButton.includes(categoryName)) {
      setActiveCategoryButton([]);
      setActiveSkills([]);
    } else {
      setActiveCategoryButton([categoryName]);
      setActiveSkills([]);
    }
  };

  const handleClickSkill = (skillName: string) => {
    setActiveSkills((prev) =>
      prev.includes(skillName) ? prev.filter((s) => s !== skillName) : [...prev, skillName]
    );
  };

  const toggleShowAllCities = () => {
    setShowAllCities(!showAllCities);
  };

  const toggleShowAllSkills = () => {
    setShowAllSkills(!showAllSkills);
  };

  // Получаем города для отображения
  const citiesToShow = showAllCities ? cities : cities.slice(0, DEFAULT_SHOW_COUNT);

  // Получаем категории навыков для отображения
  const skillCategories = Object.entries(skillsCategory);
  const skillCategoriesToShow = showAllSkills
    ? skillCategories
    : skillCategories.slice(0, DEFAULT_SHOW_COUNT);

  return (
    <div className={style.filterContainer}>
      <h2 className={`${style.title} ${style.mainText}`}>Фильтры</h2>
      <div className={style.filters}>
        <div>
          {FilterOptions.base.map((filter) => (
            <div key={filter} className={style.buttonsContainer}>
              <FilterSingleButtons
                name={filter}
                handleClick={setActiveLearn}
                isActive={activeLearn}
              />
            </div>
          ))}
        </div>

        {/* Секция навыков с кнопкой "Показать еще" */}
        <div>
          <h3 className={`${style.filterTitle} ${style.mainText}`}>Навыки</h3>
          {skillCategoriesToShow.map(([categoryName, skills]) => (
            <div key={categoryName} className={style.buttonsContainer}>
              <FilterMultiButtons
                name={categoryName}
                handleClick={handleClickArrayButton}
                isActiveArray={activeCategoryButton}
                arrayButton
              />
              {activeCategoryButton.includes(categoryName) && (
                <div className={style.moreButtonsContainer}>
                  {skills.map((skill) => (
                    <div key={skill}>
                      <FilterMultiButtons
                        name={skill}
                        handleClick={handleClickSkill}
                        isActiveArray={activeSkills}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Кнопка "Показать еще" для навыков */}
          {skillCategories.length > DEFAULT_SHOW_COUNT && (
            <div className={style.buttonsContainer}>
              <button
                type="button"
                className={`${style.showMoreButton} ${style.mainText}`}
                onClick={toggleShowAllSkills}
              >
                {showAllSkills ? '' : `Все категории`}
              </button>
            </div>
          )}
        </div>

        <div>
          <h3 className={`${style.filterTitle} ${style.mainText}`}>Пол автора</h3>
          {FilterOptions.authors.map((filter) => (
            <div key={filter} className={style.buttonsContainer}>
              <FilterSingleButtons
                name={filter}
                handleClick={setActiveLearn}
                isActive={activeLearn}
              />
            </div>
          ))}
        </div>

        {/* Секция городов с кнопкой "Показать еще" */}
        <div>
          <h3 className={`${style.filterTitle} ${style.mainText}`}>Город</h3>
          {citiesToShow.map((city) => (
            <div key={city} className={style.buttonsContainer}>
              <FilterMultiButtons
                name={city}
                handleClick={handleClickCity}
                isActiveArray={activeCities}
              />
            </div>
          ))}

          {/* Кнопка "Показать еще" для городов */}
          {cities.length > DEFAULT_SHOW_COUNT && (
            <div className={style.buttonsContainer}>
              <button
                type="button"
                className={`${style.showMoreButton} ${style.mainText}`}
                onClick={toggleShowAllCities}
              >
                {showAllCities ? '' : `Все города`}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
