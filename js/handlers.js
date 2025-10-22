import { COLOR_SETS } from './constants.js';
import {
  getHabits,
  setHabits,
  addHabit,
  getSelectMode,
  hasSelectedHabit,
  addSelectedHabit,
  removeSelectedHabit,
  clearSelectedHabits,
  setDraggedItem,
  getDraggedItem,
  setHabitToDelete,
  getHabitToDelete,
  setHabitToColor,
  getHabitToColor,
  setViewMode,
} from './state.js';
import { elements } from './elements.js';
import { renderHabits, updateViewModeUI } from './render.js';
import { toggleSelectMode } from './selectMode.js';
import { saveHabits } from './storage.js';

// Card container click handler
export const handleCardClick = e => {
  const target = e.target;
  const card = target.closest('.task-card');
  if (!card) return;
  const habitId = card.dataset.habitId;
  const selectMode = getSelectMode();
  const habits = getHabits();

  // In select mode, clicking anywhere on card toggles selection (except options button)
  if (selectMode) {
    if (target.matches('.options-btn') || target.closest('.options-btn')) {
      return; // Allow options button to work normally
    }

    // Toggle selection
    if (hasSelectedHabit(habitId)) {
      removeSelectedHabit(habitId);
    } else {
      addSelectedHabit(habitId);
    }

    renderHabits();
    return;
  }

  if (target.matches('.date-circle')) {
    const date = target.dataset.date;
    const habit = habits.find(h => h.id === habitId);
    if (habit.completedDates.has(date)) {
      habit.completedDates.delete(date);
    } else {
      habit.completedDates.add(date);
    }
    renderHabits();
  } else if (target.matches('.habit-name')) {
    const input = target.nextElementSibling;
    const span = target;
    span.classList.add('hidden');
    input.classList.remove('hidden');
    input.style.color = '#E0E0E0';
    input.focus();
    input.select();
  } else if (target.matches('.options-btn')) {
    e.stopPropagation();
    elements.contextMenu.style.display = 'block';
    const rect = target.getBoundingClientRect();
    elements.contextMenu.style.top = `${rect.bottom + window.scrollY + 5}px`;
    elements.contextMenu.style.left = `${
      rect.right + window.scrollX - elements.contextMenu.offsetWidth
    }px`;
    elements.contextMenu.dataset.habitId = habitId;
  }
};

// Keyboard handler for habit input
export const handleCardKeydown = e => {
  if (e.key === 'Enter' && e.target.matches('.habit-input')) {
    e.target.blur();
  }
};

// Focus out handler for habit name editing
export const handleCardFocusout = e => {
  if (e.target.matches('.habit-input')) {
    const input = e.target;
    const habits = getHabits();
    const habit = habits.find(
      h => h.id === input.closest('.task-card').dataset.habitId
    );
    habit.name = input.value.trim() || 'Untitled';
    renderHabits();
  }
};

// Drag start handler
export const handleDragStart = e => {
  if (getSelectMode()) {
    e.preventDefault();
    return;
  }
  setDraggedItem(e.target);
  setTimeout(() => e.target.classList.add('dragging'), 0);
};

// Drag end handler
export const handleDragEnd = e => {
  e.target.classList.remove('dragging');
};

// Drag over handler
export const handleDragOver = e => {
  e.preventDefault();
  const draggedItem = getDraggedItem();
  const afterElement = [
    ...elements.cardContainer.querySelectorAll('.task-card:not(.dragging)'),
  ].reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = e.clientY - box.top - box.height / 2;
      return offset < 0 && offset > closest.offset
        ? { offset: offset, element: child }
        : closest;
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;

  if (afterElement)
    elements.cardContainer.insertBefore(draggedItem, afterElement);
  else elements.cardContainer.appendChild(draggedItem);
};

// Drop handler
export const handleDrop = () => {
  const newOrder = [
    ...elements.cardContainer.querySelectorAll('.task-card'),
  ].map(c => c.dataset.habitId);
  const habits = getHabits();
  habits.sort((a, b) => newOrder.indexOf(a.id) - newOrder.indexOf(b.id));
  saveHabits();
};

// View toggle handler
export const handleViewToggle = () => {
  setViewMode(elements.viewToggle.checked ? 'overview' : 'weekly');
  updateViewModeUI();
};

// Select all habits
export const handleSelectAll = () => {
  clearSelectedHabits();
  getHabits().forEach(h => addSelectedHabit(h.id));
  renderHabits();
};

// Unselect all habits
export const handleUnselectAll = () => {
  clearSelectedHabits();
  renderHabits();
};

// Bulk change color handler
export const handleBulkChangeColor = () => {
  const selectedHabits = getSelectMode() ? Array.from(getHabits()) : [];
  if (selectedHabits.length === 0) return;

  setHabitToColor('bulk');
  elements.colorSwatches.innerHTML = '';
  Object.entries(COLOR_SETS).forEach(([name, colors]) => {
    const swatch = document.createElement('button');
    swatch.className =
      'w-10 h-10 rounded-full border-2 border-zinc-600 hover:opacity-80 transition-opacity';
    swatch.style.backgroundColor = colors.completed;
    swatch.dataset.color = name;
    elements.colorSwatches.appendChild(swatch);
  });
  elements.colorModal.classList.remove('hidden');
};

// Bulk delete handler
export const handleBulkDelete = () => {
  const selectedCount = Array.from(
    document.querySelectorAll('.selected-card')
  ).length;
  if (selectedCount === 0) return;

  setHabitToDelete('bulk');
  elements.modalTitle.textContent = 'Delete Selected Activities?';
  elements.modalText.textContent = `Are you sure you want to delete ${selectedCount} selected activit${
    selectedCount > 1 ? 'ies' : 'y'
  }? This action cannot be undone.`;
  elements.modal.classList.remove('hidden');
};

// Add activity handler
export const handleAddActivity = () => {
  const habits = getHabits();
  const colorKeys = Object.keys(COLOR_SETS);
  const lastCardColor =
    habits.length > 0 ? habits[habits.length - 1].color : null;

  let availableColors = colorKeys.filter(color => color !== lastCardColor);
  if (availableColors.length === 0) {
    availableColors = colorKeys;
  }

  const randomColor =
    availableColors[Math.floor(Math.random() * availableColors.length)];

  addHabit({
    id: `habit-${Date.now()}`,
    name: 'New Activity',
    completedDates: new Set(),
    color: randomColor,
  });
  renderHabits();
};

// Cancel delete modal
export const handleCancelDelete = () => {
  elements.modal.classList.add('hidden');
};

// Confirm delete
export const handleConfirmDelete = () => {
  const habitId = getHabitToDelete();
  const habits = getHabits();

  if (habitId === 'bulk') {
    const selectedIds = Array.from(
      document.querySelectorAll('.selected-card')
    ).map(card => card.dataset.habitId);
    setHabits(habits.filter(h => !selectedIds.includes(h.id)));
    clearSelectedHabits();
    toggleSelectMode();
  } else if (habitId) {
    setHabits(habits.filter(h => h.id !== habitId));
  } else {
    setHabits([]);
  }

  renderHabits();
  elements.modal.classList.add('hidden');
  setHabitToDelete(null);
};

// Context menu click handler
export const handleContextMenuClick = e => {
  const habitId = elements.contextMenu.dataset.habitId;
  elements.contextMenu.style.display = 'none';
  const habits = getHabits();

  if (e.target.id === 'edit-btn') {
    const nameSpan = elements.cardContainer.querySelector(
      `[data-habit-id="${habitId}"] .habit-name`
    );
    nameSpan.click();
  } else if (e.target.id === 'select-mode-menu-btn') {
    if (!getSelectMode()) {
      toggleSelectMode();
    }
    addSelectedHabit(habitId);
    renderHabits();
  } else if (e.target.id === 'delete-btn') {
    setHabitToDelete(habitId);
    const habit = habits.find(h => h.id === habitId);
    elements.modalTitle.textContent = 'Delete Activity?';
    elements.modalText.textContent = `Are you sure you want to delete "${habit.name}"? This action cannot be undone.`;
    elements.modal.classList.remove('hidden');
  } else if (e.target.id === 'change-color-btn') {
    setHabitToColor(habitId);
    elements.colorSwatches.innerHTML = '';
    Object.entries(COLOR_SETS).forEach(([name, colors]) => {
      const swatch = document.createElement('button');
      swatch.className =
        'w-10 h-10 rounded-full border-2 border-zinc-600 hover:opacity-80 transition-opacity';
      swatch.style.backgroundColor = colors.completed;
      swatch.dataset.color = name;
      elements.colorSwatches.appendChild(swatch);
    });
    elements.colorModal.classList.remove('hidden');
  }
};

// Color swatch click handler
export const handleColorSwatchClick = e => {
  if (e.target.dataset.color) {
    const selectedColor = e.target.dataset.color;
    const habitId = getHabitToColor();
    const habits = getHabits();

    if (habitId === 'bulk') {
      const selectedIds = Array.from(
        document.querySelectorAll('.selected-card')
      ).map(card => card.dataset.habitId);
      habits.forEach(h => {
        if (selectedIds.includes(h.id)) {
          h.color = selectedColor;
        }
      });
    } else {
      const habit = habits.find(h => h.id === habitId);
      if (habit) habit.color = selectedColor;
    }

    renderHabits();
    elements.colorModal.classList.add('hidden');
    setHabitToColor(null);
  }
};

// Cancel color modal
export const handleCancelColor = () => {
  elements.colorModal.classList.add('hidden');
  setHabitToColor(null);
};

// Close context menu when clicking outside
export const handleDocumentClick = e => {
  if (
    !elements.contextMenu.contains(e.target) &&
    !e.target.matches('.options-btn')
  ) {
    elements.contextMenu.style.display = 'none';
  }
};
