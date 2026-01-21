import Filters from '@widgets/Filters';
import { useSelector } from '@store/store';
import UsersCardsRecommendations from '@widgets/UsersCardsRecommendations';
import { useFilteredUsers } from '@widgets/Filters/hooks/useFilteredUsers';
import { FilterOptions } from '@widgets/Filters/libs/FilterConstants';
import { ButtonCancelFilter } from '@shared/ui/ButtonCancelFilter';
import style from './HomePage.module.css';

export function HomePage() {
  const { loading } = useSelector((state) => state.users);

  const { activeLearn, activeAuthor, activeSkills, activeCities } = useSelector(
    (state) => state.filters
  );
  const filteredUsers = useFilteredUsers({ activeLearn, activeAuthor, activeCities, activeSkills });

  if (loading) {
    return (
      <div>
        <h1>Загрузка...</h1>
      </div>
    );
  }

  if (filteredUsers) {
    if (
      activeLearn !== FilterOptions.base[0] ||
      activeAuthor !== FilterOptions.authors[0] ||
      activeSkills.length > 0 ||
      activeCities.length > 0
    ) {
      const handleClickCancel = () => {};
      const activeFilters = [
        ...(activeLearn !== FilterOptions.base[0] ? [activeLearn] : ''),
        ...(activeAuthor !== FilterOptions.authors[0] ? [activeAuthor] : ''),
        ...activeSkills,
        ...activeCities,
      ];
      return (
        <div className={style.homeSection}>
          <div className={style.filterButtonsContainer}>
            <h2 className={`${style.title} ${style.mainText}`}>Фильтры ({activeFilters.length})</h2>
            <ButtonCancelFilter
              title="Сбросить"
              textStyle={style.textButtonReset}
              fillSvg="var(--color-accent-pressed)"
              handleClick={handleClickCancel}
            />
            {activeFilters.map((filter) => (
              <div key={filter} className={style.containerCancelButton}>
                <ButtonCancelFilter
                  title={filter}
                  textStyle={style.textButtonCancelFilter}
                  buttonStyle={style.buttonCancelFilter}
                  fillSvg="var(--color-text-primary)"
                  handleClick={handleClickCancel}
                />
              </div>
            ))}
          </div>
          <div className={style.homeContainer}>
            <Filters />
            <div className={style.RecommendationsContainer}>
              <UsersCardsRecommendations
                title={`Подходящие предложения: ${filteredUsers.length}`}
                users={filteredUsers}
              />
            </div>
          </div>
        </div>
      );
    }
    const popularUsers = filteredUsers.sort((a, b) => b.liked - a.liked).slice(0, 3);
    const newUsers = filteredUsers
      .sort((a, b) => {
        const dateA = Number(b.createdAt.replace(/-/g, ''));
        const dateB = Number(a.createdAt.replace(/-/g, ''));
        return dateA - dateB;
      })
      .slice(0, 3);
    const recommendationsUsers = filteredUsers.slice(0, 9);
    return (
      <div>
        {/* править наверное надо, что внизу */}
        <div className={style.filterButtonsContainer}>
          <h2 className={`${style.title} ${style.mainText}`}>Фильтры</h2>
        </div>
        <div className={style.homeContainer}>
          <Filters />
          <div className={style.RecommendationsContainer}>
            <UsersCardsRecommendations title="Популярное" users={popularUsers} />
            <UsersCardsRecommendations title="Новое" users={newUsers} />
            <UsersCardsRecommendations title="Рекомендуем" users={recommendationsUsers} />
          </div>
        </div>
      </div>
    );
  }
}
