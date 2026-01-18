import { useState } from 'react';
import type { UseFiltersProps } from '../libs/types';

export function useFilters({
  initialActiveLearn = 'Всё',
  initialActiveAuthor = 'Не имеет значения',
  initialActiveCities = [''],
  initialActiveCategoryButton = [],
  initialActiveSkills = [],
}: UseFiltersProps = {}) {
  const [activeLearn, setActiveLearn] = useState<string>(initialActiveLearn);
  const [activeAuthor, setActiveAuthor] = useState<string>(initialActiveAuthor);
  const [activeCities, setActiveCities] = useState<string[]>(initialActiveCities);
  const [activeCategoryButton, setActiveCategoryButton] = useState<string[]>(
    initialActiveCategoryButton
  );
  const [activeSkills, setActiveSkills] = useState<string[]>(initialActiveSkills);
  const [showAllCities, setShowAllCities] = useState<boolean>(false);
  const [showAllSkills, setShowAllSkills] = useState<boolean>(false);

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

  return {
    activeLearn,
    setActiveLearn,
    activeAuthor,
    setActiveAuthor,
    activeCities,
    setActiveCities,
    activeCategoryButton,
    setActiveCategoryButton,
    activeSkills,
    setActiveSkills,
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
