// Application state
export const state = {
  habits: [],
  currentViewMode: 'weekly',
  draggedItem: null,
  habitIdToDelete: null,
  habitIdToColor: null,
  selectMode: false,
  selectedHabits: new Set(),
};

// State getters
export const getHabits = () => state.habits;
export const setHabits = newHabits => (state.habits = newHabits);
export const addHabit = habit => state.habits.push(habit);
export const removeHabit = id =>
  (state.habits = state.habits.filter(h => h.id !== id));

export const getViewMode = () => state.currentViewMode;
export const setViewMode = mode => (state.currentViewMode = mode);

export const getSelectMode = () => state.selectMode;
export const setSelectMode = mode => (state.selectMode = mode);

export const getSelectedHabits = () => state.selectedHabits;
export const clearSelectedHabits = () => state.selectedHabits.clear();
export const addSelectedHabit = id => state.selectedHabits.add(id);
export const removeSelectedHabit = id => state.selectedHabits.delete(id);
export const hasSelectedHabit = id => state.selectedHabits.has(id);

export const setDraggedItem = item => (state.draggedItem = item);
export const getDraggedItem = () => state.draggedItem;

export const setHabitToDelete = id => (state.habitIdToDelete = id);
export const getHabitToDelete = () => state.habitIdToDelete;

export const setHabitToColor = id => (state.habitIdToColor = id);
export const getHabitToColor = () => state.habitIdToColor;
