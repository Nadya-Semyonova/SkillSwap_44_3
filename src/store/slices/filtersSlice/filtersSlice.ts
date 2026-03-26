import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { FilterOptions } from '@widgets/Filters/libs/FilterConstants';

const baseLearn = FilterOptions.base[0];
const baseAuthor = FilterOptions.authors[0];

interface FilterState {
  activeLearn: string;
  activeAuthor: string;
  activeCities: string[];
  activeSkills: string[];
  activeCategory: string[];
}

const initialState: FilterState = {
  activeLearn: baseLearn,
  activeAuthor: baseAuthor,
  activeCities: [],
  activeSkills: [],
  activeCategory: [],
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
    clearFilters: (state) => {
      state.activeLearn = baseLearn;
      state.activeAuthor = baseAuthor;
      state.activeCities = [];
      state.activeSkills = [];
      state.activeCategory = [];
    },
    clearSelectedFilter: (state, action: PayloadAction<string>) => {
      const filterValueToRemove = action.payload;

      if (state.activeLearn === filterValueToRemove) {
        state.activeLearn = baseLearn;
      }
      if (state.activeAuthor === filterValueToRemove) {
        state.activeAuthor = baseAuthor;
      }
      state.activeCities = state.activeCities.filter((city) => city !== filterValueToRemove);
      state.activeSkills = state.activeSkills.filter((skill) => skill !== filterValueToRemove);
      state.activeCategory = state.activeCategory.filter(
        (category) => category !== filterValueToRemove
      );
    },
  },
});

export const {
  setActiveAuthor,
  setActiveLearn,
  setActiveSkills,
  setActiveCities,
  setActiveCategory,
  clearFilters,
  clearSelectedFilter,
} = FiltersSlice.actions;
const filtersReducer = FiltersSlice.reducer;
export default filtersReducer;
