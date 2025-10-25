import { getHabits, setHabits } from './state.js';
import { saveHabits } from './storage.js';
import { renderHabits } from './render.js';

/**
 * Download habits data as JSON file
 */
export const downloadData = () => {
  const habits = getHabits();

  // Convert habits to plain objects for JSON
  const exportData = {
    version: '1.1',
    exportedAt: new Date().toISOString(),
    habits: habits.map(habit => ({
      id: habit.id,
      name: habit.name,
      color: habit.color,
      completedDates: Array.from(habit.completedDates), // Convert Set to Array
      createdAt: habit.createdAt,
    })),
  };

  // Create JSON blob
  const jsonString = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });

  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  link.download = `rutin-in-backup-${timestamp}.json`;

  // Trigger download
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  console.log('✅ Data downloaded successfully');
};

/**
 * Handle download button click
 */
export const handleDownload = () => {
  const habits = getHabits();

  if (habits.length === 0) {
    alert('No habits to download. Create some habits first!');
    return;
  }

  downloadData();
};

/**
 * Upload and restore habits data from JSON file
 */
export const uploadData = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = e => {
      try {
        const jsonData = JSON.parse(e.target.result);

        // Validate data structure
        if (!jsonData.habits || !Array.isArray(jsonData.habits)) {
          throw new Error('Invalid data format: missing habits array');
        }

        // Convert imported data to proper format
        const importedHabits = jsonData.habits.map(habit => ({
          id: habit.id || Date.now() + Math.random(),
          name: habit.name || 'Untitled',
          color: habit.color || 'green',
          completedDates: new Set(habit.completedDates || []), // Convert Array to Set
          createdAt: habit.createdAt || Date.now(),
        }));

        // Update state and save
        setHabits(importedHabits);
        saveHabits();
        renderHabits();

        console.log('✅ Data uploaded successfully', importedHabits);
        resolve(importedHabits);
      } catch (error) {
        console.error('❌ Error parsing JSON:', error);
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
};

/**
 * Handle upload button click
 */
export const handleUploadClick = () => {
  const uploadInput = document.getElementById('upload-input');
  if (uploadInput) {
    uploadInput.click();
  }
};

/**
 * Handle file input change
 */
export const handleFileUpload = async event => {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  // Validate file type
  if (!file.name.endsWith('.json')) {
    alert('Please select a valid JSON file');
    return;
  }

  // Confirm before replacing data
  const currentHabits = getHabits();
  if (currentHabits.length > 0) {
    const confirmed = confirm(
      `⚠️ Warning: This will replace all your current habits (${
        currentHabits.length
      } habit${
        currentHabits.length > 1 ? 's' : ''
      }).\n\nDo you want to continue?`
    );

    if (!confirmed) {
      event.target.value = ''; // Reset file input
      return;
    }
  }

  try {
    const importedHabits = await uploadData(file);
    alert(
      `✅ Successfully imported ${importedHabits.length} habit${
        importedHabits.length > 1 ? 's' : ''
      }!`
    );
  } catch (error) {
    alert(`❌ Failed to upload data: ${error.message}`);
  }

  // Reset file input
  event.target.value = '';
};
