import { getHabits, setHabits } from './state.js';
import { formatDate } from './utils.js';

// Save habits to localStorage
export const saveHabits = () => {
  const habits = getHabits();
  localStorage.setItem(
    'habits',
    JSON.stringify(
      habits.map(h => ({
        ...h,
        completedDates: Array.from(h.completedDates),
      }))
    )
  );
};

// Load habits from localStorage
export const loadHabits = () => {
  const stored = localStorage.getItem('habits');
  if (stored) {
    const habits = JSON.parse(stored).map(h => ({
      ...h,
      completedDates: new Set(h.completedDates),
      color: h.color || 'green',
    }));
    setHabits(habits);
  } else {
    // Create default habit with properly formatted dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const defaultHabits = [
      {
        id: 'habit-1',
        name: 'Membaca Buku',
        completedDates: new Set([formatDate(today), formatDate(twoDaysAgo)]),
        color: 'green',
      },
    ];
    setHabits(defaultHabits);
  }
};
