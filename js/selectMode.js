import {
  setSelectMode,
  getSelectMode,
  clearSelectedHabits,
} from './state.js';
import { elements } from './elements.js';
import { renderHabits } from './render.js';

// Toggle select mode on/off
export const toggleSelectMode = () => {
  const currentMode = getSelectMode();
  setSelectMode(!currentMode);

  if (!currentMode) {
    // Entering select mode
    elements.bulkActionsBar.classList.remove('hidden');
  } else {
    // Exiting select mode
    elements.bulkActionsBar.classList.add('hidden');
    clearSelectedHabits();
  }

  renderHabits();
};
