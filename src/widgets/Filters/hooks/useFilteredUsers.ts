import { FilterOptions } from '@widgets/Filters/libs/FilterConstants';
import type { IFilteredUsers } from '@widgets/Filters/libs/types';
import { useSelector } from '@store/store';

export function useFilteredUsers({
  activeLearn,
  activeAuthor,
  activeCities,
  activeSkills,
}: IFilteredUsers) {
  const usersData = useSelector((state) => state.users.users);

  if (!usersData) {
    console.log('массив пуст');
    return null;
  }

  let result = [...usersData];

  if (activeSkills.length > 0) {
    switch (activeLearn) {
      case FilterOptions.base[0]:
        result = result.filter(
          (user) =>
            user.skill_off.some((skill) => activeSkills.includes(skill)) ||
            activeSkills.includes(user.card_people.skill)
        );
        break;
      case FilterOptions.base[1]:
        result = result.filter((user) =>
          user.skill_off.some((skill) => activeSkills.includes(skill))
        );
        break;
      case FilterOptions.base[2]:
        result = result.filter((user) => activeSkills.includes(user.card_people.skill));
        break;
      default:
        result = result.filter(
          (user) =>
            user.skill_off.some((skill) => activeSkills.includes(skill)) ||
            activeSkills.includes(user.card_people.skill)
        );
        break;
    }
  }

  if (activeAuthor && activeAuthor !== FilterOptions.authors[0]) {
    result = result.filter(
      (user) => user.gender.toLocaleLowerCase() === activeAuthor.toLocaleLowerCase()
    );
  }

  if (activeCities && activeCities.length > 0) {
    result = result.filter((user) => activeCities.includes(user.city));
  }

  return result;
}
