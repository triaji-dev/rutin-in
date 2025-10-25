import { elements } from './elements.js';
import { loadHabits } from './storage.js';
import { updateViewModeUI } from './render.js';
import { toggleSelectMode } from './selectMode.js';
import {
  handleDownload,
  handleUploadClick,
  handleFileUpload,
} from './download.js';
import {
  handleCardClick,
  handleCardKeydown,
  handleCardFocusout,
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleDrop,
  handleViewToggle,
  handleSelectAll,
  handleUnselectAll,
  handleBulkChangeColor,
  handleBulkDelete,
  handleAddActivity,
  handleCancelDelete,
  handleConfirmDelete,
  handleContextMenuClick,
  handleColorSwatchClick,
  handleCancelColor,
  handleDocumentClick,
} from './handlers.js';

// Initialize event listeners
const initEventListeners = () => {
  // Card interactions
  elements.cardContainer.addEventListener('click', handleCardClick);
  elements.cardContainer.addEventListener('keydown', handleCardKeydown);
  elements.cardContainer.addEventListener('focusout', handleCardFocusout);

  // Drag and drop
  elements.cardContainer.addEventListener('dragstart', handleDragStart);
  elements.cardContainer.addEventListener('dragend', handleDragEnd);
  elements.cardContainer.addEventListener('dragover', handleDragOver);
  elements.cardContainer.addEventListener('drop', handleDrop);

  // View toggle
  elements.viewToggle.addEventListener('change', handleViewToggle);

  // Download button
  const downloadBtn = document.getElementById('download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', handleDownload);
  }

  // Upload button and file input
  const uploadBtn = document.getElementById('upload-btn');
  const uploadInput = document.getElementById('upload-input');

  if (uploadBtn) {
    uploadBtn.addEventListener('click', handleUploadClick);
  }

  if (uploadInput) {
    uploadInput.addEventListener('change', handleFileUpload);
  }

  // Select mode buttons
  elements.selectAllBtn.addEventListener('click', handleSelectAll);
  elements.unselectAllBtn.addEventListener('click', handleUnselectAll);
  elements.exitSelectModeBtn.addEventListener('click', toggleSelectMode);

  // Bulk actions
  elements.bulkChangeColorBtn.addEventListener('click', handleBulkChangeColor);
  elements.bulkDeleteBtn.addEventListener('click', handleBulkDelete);

  // Add activity
  elements.addActivityBtn.addEventListener('click', handleAddActivity);

  // Modal actions
  elements.cancelDeleteBtn.addEventListener('click', handleCancelDelete);
  elements.confirmDeleteBtn.addEventListener('click', handleConfirmDelete);

  // Context menu
  elements.contextMenu.addEventListener('click', handleContextMenuClick);

  // Color modal
  elements.colorSwatches.addEventListener('click', handleColorSwatchClick);
  elements.cancelColorBtn.addEventListener('click', handleCancelColor);

  // Document click (close context menu)
  document.addEventListener('click', handleDocumentClick);
};

// Initialize application
const init = () => {
  loadHabits();
  updateViewModeUI();
  initEventListeners();
};

// Start app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
