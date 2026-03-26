export interface FilterState {
  activeLearn: string;
  activeAuthor: string;
  activeCities: string[];
  activeCategoryButton: string[];
  activeSkills: string[];
  showAllCities: boolean;
  showAllSkills: boolean;
}

export interface UseFiltersProps {
  initialActiveLearn?: string;
  initialActiveAuthor?: string;
  initialActiveCities?: string[];
  initialActiveCategoryButton?: string[];
  initialActiveSkills?: string[];
}

export interface IFilteredUsers {
  activeLearn: string;
  activeAuthor: string;
  activeCities: string[];
  activeSkills: string[];
}
