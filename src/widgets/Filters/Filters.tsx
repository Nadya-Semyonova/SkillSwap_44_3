import FilterMultiButtons from '@shared/ui/FilterMultiButton';
import FilterSingleButtons from '@shared/ui/FilterSingleButton';
import cities from '@public/db/city.json';
import skillsCategory from '@public/db/skills.json';
import { FilterOptions, DEFAULT_SHOW_COUNT } from './libs/FilterConstants';
import style from './Filters.module.css';
import { useFiltersButtons } from './hooks/useFiltersButtons';

export default function Filters() {
  const {
    activeLearn,
    setLearn,
    activeAuthor,
    setAuthor,
    activeCities,
    activeCategoryButton,
    activeSkills,
    showAllCities,
    showAllSkills,
    handleClickCity,
    handleClickArrayButton,
    handleClickSkill,
    toggleShowAllCities,
    toggleShowAllSkills,
  } = useFiltersButtons();

  const citiesToShow = showAllCities ? cities : cities.slice(0, DEFAULT_SHOW_COUNT);

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
              <FilterSingleButtons name={filter} handleClick={setLearn} isActive={activeLearn} />
            </div>
          ))}
        </div>
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
              <FilterSingleButtons name={filter} handleClick={setAuthor} isActive={activeAuthor} />
            </div>
          ))}
        </div>
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
