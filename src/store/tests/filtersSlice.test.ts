import { FilterOptions } from '@widgets/Filters/libs/FilterConstants';
import filtersReducer, {
  setActiveLearn,
  setActiveAuthor,
  setActiveCities,
  setActiveSkills,
  setActiveCategory,
  clearFilters,
  clearSelectedFilter,
} from '@/store/slices/filtersSlice/filtersSlice';

const baseLearn = FilterOptions.base[0];
const baseAuthor = FilterOptions.authors[0];

describe('filtersSlice', () => {
  const initialState = {
    activeLearn: baseLearn,
    activeAuthor: baseAuthor,
    activeCities: [],
    activeSkills: [],
    activeCategory: [],
  };

  test('должен вернуть начальное состояние', () => {
    const action = { type: 'unknown' };
    const state = filtersReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  describe('setActiveLearn', () => {
    test('должен установить фильтр activeLearn', () => {
      const action = setActiveLearn('New Learn');
      const state = filtersReducer(initialState, action);
      expect(state.activeLearn).toBe('New Learn');
    });

    test('не должен изменять activeLearn, если передано то же значение', () => {
      const action = setActiveLearn(baseLearn);
      const state = filtersReducer(initialState, action);
      expect(state.activeLearn).toBe(baseLearn);
    });
  });

  describe('setActiveAuthor', () => {
    test('должен установить фильтр activeAuthor', () => {
      const action = setActiveAuthor('New Author');
      const state = filtersReducer(initialState, action);
      expect(state.activeAuthor).toBe('New Author');
    });

    test('не должен изменять activeAuthor, если передано то же значение', () => {
      const action = setActiveAuthor(baseAuthor);
      const state = filtersReducer(initialState, action);
      expect(state.activeAuthor).toBe(baseAuthor);
    });
  });

  describe('setActiveCities', () => {
    test('должен добавить город в activeCities', () => {
      const action = setActiveCities('New York');
      const state = filtersReducer(initialState, action);
      expect(state.activeCities).toContain('New York');
    });

    test('должен удалить город, если он уже есть в activeCities', () => {
      const actionAdd = setActiveCities('New York');
      let state = filtersReducer(initialState, actionAdd);
      const actionRemove = setActiveCities('New York');
      state = filtersReducer(state, actionRemove);
      expect(state.activeCities).not.toContain('New York');
    });
  });

  describe('setActiveSkills', () => {
    test('должен добавить навык в activeSkills', () => {
      const action = setActiveSkills('JavaScript');
      const state = filtersReducer(initialState, action);
      expect(state.activeSkills).toContain('JavaScript');
    });

    test('должен удалить навык, если он уже есть в activeSkills', () => {
      const actionAdd = setActiveSkills('JavaScript');
      let state = filtersReducer(initialState, actionAdd);
      const actionRemove = setActiveSkills('JavaScript');
      state = filtersReducer(state, actionRemove);
      expect(state.activeSkills).not.toContain('JavaScript');
    });
  });

  describe('setActiveCategory', () => {
    test('должен добавить категорию в activeCategory', () => {
      const action = setActiveCategory('Web Development');
      const state = filtersReducer(initialState, action);
      expect(state.activeCategory).toContain('Web Development');
    });

    test('должен удалить категорию, если она уже есть в activeCategory', () => {
      const actionAdd = setActiveCategory('Web Development');
      let state = filtersReducer(initialState, actionAdd);
      const actionRemove = setActiveCategory('Web Development');
      state = filtersReducer(state, actionRemove);
      expect(state.activeCategory).not.toContain('Web Development');
    });
  });

  describe('clearFilters', () => {
    test('должен сбросить все фильтры на начальные значения', () => {
      const action = clearFilters();
      const state = filtersReducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('clearSelectedFilter', () => {
    test('должен сбросить выбранное значение фильтра', () => {
      const action = clearSelectedFilter('New York');
      const state = filtersReducer(
        {
          ...initialState,
          activeCities: ['New York', 'Los Angeles'],
        },
        action
      );
      expect(state.activeCities).not.toContain('New York');
    });

    test('должен сбросить фильтр activeLearn', () => {
      const action = clearSelectedFilter(baseLearn);
      const state = filtersReducer(initialState, action);
      expect(state.activeLearn).toBe(baseLearn);
    });

    test('должен сбросить фильтр activeAuthor', () => {
      const action = clearSelectedFilter(baseAuthor);
      const state = filtersReducer(initialState, action);
      expect(state.activeAuthor).toBe(baseAuthor);
    });
  });
});
