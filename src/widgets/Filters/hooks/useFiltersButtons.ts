import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from '@store/store';
import {
  setActiveLearn,
  setActiveAuthor,
  setActiveSkills,
  setActiveCities,
  setActiveCategory,
} from '@store/slices/filtersSlice/filtersSlice';

export function useFiltersButtons() {
  const dispatch = useDispatch();

  const activeLearn = useSelector((state) => state.filters.activeLearn);
  const activeAuthor = useSelector((state) => state.filters.activeAuthor);
  const activeCities = useSelector((state) => state.filters.activeCities);
  const activeCategoryButton = useSelector((state) => state.filters.activeCategory);
  const activeSkills = useSelector((state) => state.filters.activeSkills);

  const setLearn = useCallback(
    (learn: string) => {
      dispatch(setActiveLearn(learn));
    },
    [dispatch]
  );

  const setAuthor = useCallback(
    (author: string) => {
      dispatch(setActiveAuthor(author));
    },
    [dispatch]
  );

  const setCities = useCallback(
    (city: string) => {
      dispatch(setActiveCities(city));
    },
    [dispatch]
  );

  const setCategory = useCallback(
    (category: string) => {
      dispatch(setActiveCategory(category));
    },
    [dispatch]
  );

  const setActiveSkillsHandler = useCallback(
    (skill: string) => {
      dispatch(setActiveSkills(skill));
    },
    [dispatch]
  );

  const [showAllCities, setShowAllCities] = useState<boolean>(false);
  const [showAllSkills, setShowAllSkills] = useState<boolean>(false);

  const handleClickCity = useCallback(
    (city: string) => {
      setCities(city);
    },
    [setCities]
  );

  const handleClickArrayButton = useCallback(
    (categoryName: string) => {
      setCategory(categoryName);
    },
    [setCategory]
  );

  const handleClickSkill = useCallback(
    (skillName: string) => {
      setActiveSkillsHandler(skillName);
    },
    [setActiveSkillsHandler]
  );

  const toggleShowAllCities = useCallback(() => {
    setShowAllCities(!showAllCities);
  }, [showAllCities]);

  const toggleShowAllSkills = useCallback(() => {
    setShowAllSkills(!showAllSkills);
  }, [showAllSkills]);

  return {
    activeLearn,
    setLearn,
    activeAuthor,
    setAuthor,
    activeCities,
    setCities,
    activeCategoryButton,
    setCategory,
    activeSkills,
    setActiveSkills: setActiveSkillsHandler,
    showAllCities,
    setShowAllCities,
    showAllSkills,
    setShowAllSkills,
    handleClickCity,
    handleClickArrayButton,
    handleClickSkill,
    toggleShowAllCities,
    toggleShowAllSkills,
  };
}
