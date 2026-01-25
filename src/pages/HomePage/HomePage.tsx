import Filters from '@widgets/Filters';
import UsersCardsRecommendations from '@widgets/UsersCardsRecommendations';
import Sort from '@/shared/assets/images/IconsSvg/Sort';
import { ButtonCancelFilter } from '@/shared/ui/AllButtons/ButtonCancelFilter';
import { useHomePage } from './libs/useHomePage';
import style from './HomePage.module.css';
import SectionsConstants from './libs/SectionsConstant';

export function HomePage() {
  const {
    loading,
    filteredUsers,
    sortedFilteredUsers,
    activeFilters,
    hasActiveFilters,
    sortByNewest,
    handleClickMore,
    handleClickReset,
    handleClickResetSelected,
    handleToggleSort,
    getSectionContent,
  } = useHomePage();

  if (loading) {
    return (
      <div>
        <h1>Загрузка...</h1>
      </div>
    );
  }

  if (filteredUsers) {
    if (hasActiveFilters) {
      return (
        <div className={style.homeSection}>
          <div className={style.filterButtonsContainer}>
            <h2 className={`${style.title} ${style.mainText}`}>Фильтры ({activeFilters.length})</h2>
            <ButtonCancelFilter
              title="Сбросить"
              textStyle={style.textButtonReset}
              fillSvg="var(--color-accent-pressed)"
              handleClick={handleClickReset}
            />
            {activeFilters.map((filter) => (
              <div key={filter} className={style.containerCancelButton}>
                <ButtonCancelFilter
                  title={filter}
                  textStyle={style.textButtonCancelFilter}
                  buttonStyle={style.buttonCancelFilter}
                  fillSvg="var(--color-text-primary)"
                  handleClick={() => handleClickResetSelected(filter)}
                />
              </div>
            ))}
          </div>
          <div className={style.homeContainer}>
            <Filters />
            <div className={style.RecommendationsContainer}>
              <UsersCardsRecommendations
                title={`${SectionsConstants[3]} ${sortedFilteredUsers?.length || 0}`}
                users={sortedFilteredUsers || []}
                handleClickMore={handleClickMore}
                buttonMore
                sortButton={
                  <button className={style.sortingButton} onClick={handleToggleSort}>
                    <Sort />
                    <p>{sortByNewest ? 'Сначала новые' : 'Сначала старые'}</p>
                  </button>
                }
              />
            </div>
          </div>
        </div>
      );
    }

    const { sections } = getSectionContent();

    return (
      <div>
        <div className={style.filterButtonsContainer}>
          <h2 className={`${style.title} ${style.mainText}`}>Фильтры</h2>
        </div>
        <div className={style.homeContainer}>
          <Filters />
          <div className={style.RecommendationsContainer}>
            {sections.map((section) => (
              <UsersCardsRecommendations
                key={section.title}
                title={section.title}
                users={section.users}
                buttonMore={section.buttonMore}
                handleClickMore={handleClickMore}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
