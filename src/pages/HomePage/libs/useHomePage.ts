import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFilteredUsers } from '@widgets/Filters/hooks/useFilteredUsers';
import { FilterOptions } from '@widgets/Filters/libs/FilterConstants';
import { clearFilters, clearSelectedFilter } from '@store/slices/filtersSlice/filtersSlice';
import type { RootState } from '@store/store';
import SectionsConstants from './SectionsConstant';

export const useHomePage = () => {
  const { loading } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const [more, setMore] = useState<string>('');
  const [sortByNewest, setSortByNewest] = useState<boolean>(true);

  const { activeLearn, activeAuthor, activeSkills, activeCities } = useSelector(
    (state: RootState) => state.filters
  );

  const filteredUsers = useFilteredUsers({ activeLearn, activeAuthor, activeCities, activeSkills });

  const activeFilters = useMemo(() => {
    const filters = [];
    if (activeLearn !== FilterOptions.base[0]) filters.push(activeLearn);
    if (activeAuthor !== FilterOptions.authors[0]) filters.push(activeAuthor);
    filters.push(...activeSkills);
    filters.push(...activeCities);
    return filters;
  }, [activeLearn, activeAuthor, activeSkills, activeCities]);

  const hasActiveFilters = useMemo(() => {
    return (
      activeLearn !== FilterOptions.base[0] ||
      activeAuthor !== FilterOptions.authors[0] ||
      activeSkills.length > 0 ||
      activeCities.length > 0
    );
  }, [activeLearn, activeAuthor, activeSkills, activeCities]);

  const sortedFilteredUsers = useMemo(() => {
    if (!filteredUsers) return null;

    return [...filteredUsers].sort((a, b) => {
      const dateA = Number(a.createdAt.replace(/-/g, ''));
      const dateB = Number(b.createdAt.replace(/-/g, ''));
      return sortByNewest ? dateB - dateA : dateA - dateB;
    });
  }, [filteredUsers, sortByNewest]);

  const userCategories = useMemo(() => {
    if (!filteredUsers) {
      return {
        popularUsers: [],
        newUsers: [],
        recommendationsUsers: [],
      };
    }

    const popularUsers = [...filteredUsers].sort((a, b) => b.liked - a.liked);

    const newUsers = [...filteredUsers].sort((a, b) => {
      const dateA = Number(b.createdAt.replace(/-/g, ''));
      const dateB = Number(a.createdAt.replace(/-/g, ''));
      return dateA - dateB;
    });

    const recommendationsUsers = filteredUsers;

    return {
      popularUsers,
      newUsers,
      recommendationsUsers,
    };
  }, [filteredUsers]);

  const sortedPopularUsers = useMemo(() => {
    if (!userCategories.popularUsers.length) return [];

    return [...userCategories.popularUsers].sort((a, b) => {
      const dateA = Number(a.createdAt.replace(/-/g, ''));
      const dateB = Number(b.createdAt.replace(/-/g, ''));
      return sortByNewest ? dateB - dateA : dateA - dateB;
    });
  }, [userCategories.popularUsers, sortByNewest]);

  const { popularUsers, newUsers, recommendationsUsers } = userCategories;

  const handleClickMore = (title: string) => {
    setMore(title);
  };

  const handleClickReset = () => {
    dispatch(clearFilters());
  };

  const handleClickResetSelected = (title: string) => {
    dispatch(clearSelectedFilter(title));
  };

  const handleToggleSort = () => {
    setSortByNewest((prev) => !prev);
  };

  const getSectionContent = () => {
    if (!more) {
      const popularForDisplay = sortedPopularUsers.slice(0, 3);
      return {
        showAllSections: true,
        sections: [
          {
            title: SectionsConstants[0],
            users: popularForDisplay,
            buttonMore: false,
          },
          {
            title: SectionsConstants[1],
            users: newUsers.slice(0, 3),
            buttonMore: false,
          },
          {
            title: SectionsConstants[2],
            users: recommendationsUsers.slice(0, 6),
            buttonMore: false,
          },
        ],
      };
    }

    switch (more) {
      case 'Популярное':
        return {
          showAllSections: false,
          sections: [
            {
              title: SectionsConstants[0],
              users: sortedPopularUsers,
              buttonMore: true,
            },
          ],
        };
      case 'Новое':
        return {
          showAllSections: false,
          sections: [
            {
              title: SectionsConstants[1],
              users: newUsers,
              buttonMore: true,
            },
          ],
        };
      case 'Рекомендуем':
        return {
          showAllSections: false,
          sections: [
            {
              title: SectionsConstants[2],
              users: recommendationsUsers,
              buttonMore: true,
            },
          ],
        };
      default:
        return {
          showAllSections: true,
          sections: [
            {
              title: SectionsConstants[0],
              users: popularUsers.slice(0, 3),
              buttonMore: false,
            },
            {
              title: SectionsConstants[1],
              users: newUsers.slice(0, 3),
              buttonMore: false,
            },
            {
              title: SectionsConstants[2],
              users: recommendationsUsers.slice(0, 6),
              buttonMore: false,
            },
          ],
        };
    }
  };

  return {
    loading,
    filteredUsers,
    sortedFilteredUsers,
    activeFilters,
    hasActiveFilters,
    sortByNewest,
    more,
    handleClickMore,
    handleClickReset,
    handleClickResetSelected,
    handleToggleSort,
    getSectionContent,
    sortedPopularUsers,
  };
};
