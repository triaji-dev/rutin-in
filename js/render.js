import { COLOR_SETS } from './constants.js';
import {
  getHabits,
  getViewMode,
  getSelectMode,
  hasSelectedHabit,
} from './state.js';
import { elements } from './elements.js';
import { formatDate, getWeekDays, getOverviewDays } from './utils.js';
import { saveHabits } from './storage.js';

// Render all habit cards
export const renderHabits = () => {
  const habits = getHabits();
  const selectMode = getSelectMode();
  const currentViewMode = getViewMode();

  elements.cardContainer.innerHTML = '';

  habits.forEach(habit => {
    const card = document.createElement('article');

    // Build class names
    let className = 'task-card rounded-2xl p-4 shadow-lg';
    if (selectMode) {
      className += ' select-mode-card';
      if (hasSelectedHabit(habit.id)) {
        className += ' selected-card';
      }
    } else {
      className += ' cursor-grab';
    }

    card.className = className;
    card.dataset.habitId = habit.id;
    card.draggable = !selectMode;

    const theme = COLOR_SETS[habit.color] || COLOR_SETS.green;
    const isWeekly = currentViewMode === 'weekly';
    const dateInteractionClass = isWeekly
      ? 'cursor-pointer'
      : 'pointer-events-none';

    const weekDays = getWeekDays();

    const weeklyViewDays = weekDays
      .map(day => {
        const fullDate = formatDate(day);
        const isCompleted = habit.completedDates.has(fullDate);
        const completedStyle = isCompleted
          ? `style="background-color: ${theme.completed}; border-color: ${theme.completed}; color: #121212;"`
          : '';
        return `
                <div class="text-center">
                    <p class="text-xs text-zinc-400 mb-1">${day.toLocaleDateString(
                      'en-US',
                      { weekday: 'short' }
                    )}</p>
                    <div class="date-circle w-8 h-8 rounded-full border-2 border-zinc-600 flex items-center justify-center font-medium text-sm ${dateInteractionClass}" data-date="${fullDate}" ${completedStyle}>
                        ${day.getDate()}
                    </div>
                </div>`;
      })
      .join('');

    const overviewViewSquares = getOverviewDays()
      .map(day => {
        const fullDate = formatDate(day);
        const isCompleted = habit.completedDates.has(fullDate);
        const completedStyle = isCompleted
          ? `style="background-color: ${theme.completed};"`
          : '';
        return `<div class="grid-square w-3.5 h-3.5 rounded-sm" data-date="${fullDate}" ${completedStyle}></div>`;
      })
      .join('');

    card.innerHTML = `
            <header class="card-header flex justify-between items-center mb-4">
                <div class="flex items-center gap-3 w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-zinc-400 flex-shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    <span class="habit-name font-semibold truncate cursor-pointer">${
                      habit.name
                    }</span>
                    <input type="text" class="habit-input hidden w-full bg-zinc-700 rounded px-1 text-white" value="${
                      habit.name
                    }">
                </div>
                <button class="options-btn p-1 rounded-full hover:bg-zinc-700 flex-shrink-0">
                     <svg class="pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                </button>
            </header>
            <div class="card-body">
                <div class="weekly-view ${
                  isWeekly ? '' : 'hidden'
                } flex justify-between">${weeklyViewDays}</div>
                <div class="overview-view ${
                  isWeekly ? 'hidden' : ''
                } grid grid-flow-col grid-rows-7 gap-1 place-content-center">${overviewViewSquares}</div>
            </div>`;

    elements.cardContainer.appendChild(card);

    // Set the title color to match the theme
    card.querySelector('.habit-name').style.color = theme.completed;
  });

  saveHabits();
};

// Update view mode UI (weekly/overview labels)
export const updateViewModeUI = () => {
  const currentViewMode = getViewMode();

  if (currentViewMode === 'weekly') {
    elements.weeklyLabel.classList.add('text-white');
    elements.weeklyLabel.classList.remove('text-zinc-500');
    elements.overviewLabel.classList.add('text-zinc-500');
    elements.overviewLabel.classList.remove('text-white');
    elements.viewToggle.checked = false;
  } else {
    elements.weeklyLabel.classList.add('text-zinc-500');
    elements.weeklyLabel.classList.remove('text-white');
    elements.overviewLabel.classList.add('text-white');
    elements.overviewLabel.classList.remove('text-zinc-500');
    elements.viewToggle.checked = true;
  }
  renderHabits();
};
