import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { FilterOptions } from '@widgets/Filters/libs/FilterConstants';

interface FilterState {
  activeLearn: string;
  activeAuthor: string;
  activeCities: string[];
  activeSkills: string[];
  activeCategory: string[];
}

const initialState: FilterState = {
  activeLearn: FilterOptions.base[0],
  activeAuthor: FilterOptions.authors[0],
  activeCities: [], // Исправлено
  activeSkills: [], // Исправлено
  activeCategory: [], // Исправлено
};

const FiltersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActiveLearn: (state, action: PayloadAction<string>) => {
      const learn = action.payload;
      if (state.activeLearn !== learn) {
        state.activeLearn = learn;
      }
    },
    setActiveAuthor: (state, action: PayloadAction<string>) => {
      const author = action.payload;
      if (state.activeAuthor !== author) {
        state.activeAuthor = author;
      }
    },
    setActiveCities: (state, action: PayloadAction<string>) => {
      const city = action.payload;
      if (state.activeCities.includes(city)) {
        state.activeCities = state.activeCities.filter((c) => c !== city);
      } else {
        state.activeCities.push(city);
      }
    },
    setActiveSkills: (state, action: PayloadAction<string>) => {
      const skill = action.payload;
      if (state.activeSkills.includes(skill)) {
        state.activeSkills = state.activeSkills.filter((s) => s !== skill);
      } else {
        state.activeSkills.push(skill);
      }
    },
    setActiveCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      if (state.activeCategory.includes(category)) {
        state.activeCategory = state.activeCategory.filter((c) => c !== category);
      } else {
        state.activeCategory.push(category);
      }
    },
  },
});

export const {
  setActiveAuthor,
  setActiveLearn,
  setActiveSkills,
  setActiveCities,
  setActiveCategory,
} = FiltersSlice.actions;
const filtersReducer = FiltersSlice.reducer;
export default filtersReducer;
