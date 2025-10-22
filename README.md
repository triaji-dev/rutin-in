# rutin.in - Habit Tracker

**Visualize Your Consistency**

A sleek, intuitive, and powerful habit tracker inspired by GitHub's contribution graph. Build lasting habits and track your progress with a visually motivating interface designed to keep you focused on what matters: showing up every day.

![rutin.in](https://img.shields.io/badge/Status-Active-brightgreen) ![Version](https://img.shields.io/badge/Version-1.1-blue) ![Tech](https://img.shields.io/badge/Tech-Vanilla_JS-yellow) ![Storage](https://img.shields.io/badge/Storage-LocalStorage-orange)

## ✨ Features

### 🎯 Core Functionality

- **Dual-View System**: Switch between Weekly and Grid (Overview) modes instantly
- **Interactive Tracking**: Click any day to toggle completion status
- **LocalStorage Persistence**: All data saved locally in your browser
- **Drag & Drop**: Reorder habits by dragging cards
- **Select Mode**: Bulk operations for managing multiple habits at once
- **Context Menu**: Right-click for quick actions
- **Inline Editing**: Click habit names to rename them
- **Real-time Updates**: Changes save automatically to localStorage

### 📊 View Modes

#### Weekly View

- **Interactive circles**: Click to mark days as complete
- **Visual feedback**: Completed days show in your chosen color
- **Day labels**: Clear weekday abbreviations for easy navigation

#### Grid Mode (Overview)

- **GitHub-style grid**: 18-week (126 days) contribution graph
- **Pattern visualization**: See your consistency patterns emerge
- **Motivation boost**: Visual representation of your commitment
- **Streak tracking**: Maintain momentum by not breaking the chain

### 🎨 Customization

- **10 Color Themes**: Green, Blue, Purple, Pink, Orange, Yellow, Teal, Red, Indigo, Gray
- **Glassmorphic Design**: Modern dark theme with backdrop blur effects
- **Responsive Layout**: Optimized for mobile and desktop
- **Smooth Animations**: Polished transitions and hover effects
- **Component System**: Reusable button and modal components
- **SVG Icons**: Clean, scalable vector icons via sprite system

### 🔧 Management Tools

- **Add Activities**: Create new habits with one click (assigns random color)
- **Edit Names**: Click habit names to rename them inline
- **Context Menu**: Right-click for Edit, Change Color, Select Mode, and Delete
- **Select Mode**: Multi-select habits for bulk operations
- **Bulk Actions**: Change color or delete multiple habits at once
- **Delete Confirmation**: Modal dialog prevents accidental deletions
- **Color Picker Modal**: Visual color selection interface
- **Keyboard Support**: Navigate and edit with keyboard

## 🚀 Quick Start

### Live Demo

Open `index.html` in your browser - no installation required! or Visit https://triaji-dev.github.io/rutin-in/

### Installation

1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. Start tracking your habits immediately

### First Use

1. **Create Habits**: Click "+ Add Activity" to create your first habit
2. **Rename**: Click the habit name to give it a meaningful name
3. **Start Tracking**: Click on any day in Weekly view to mark completion
4. **Explore Views**: Toggle to Grid mode to see your long-term progress
5. **Customize**: Right-click habits to change colors or access more options

## 💻 Technical Details

### Architecture

- **Frontend**: Vanilla JavaScript with ES6+ modules
- **Styling**: Hybrid approach - Tailwind CSS utilities + Custom component CSS
- **Storage**: Browser LocalStorage for persistence
- **Icons**: SVG sprite system for scalable icons
- **Deployment**: Static hosting (no backend required)
- **Modularity**: Organized into separate JavaScript modules

### Code Structure

```
rutin-in/
├── index.html              # Main HTML structure
├── styles.css              # Custom CSS + Component system
├── assets/
│   └── icons/
│       └── sprite.svg      # SVG icon sprite
├── js/
│   ├── app.js              # Main entry point
│   ├── constants.js        # Color themes configuration
│   ├── state.js            # State management (getters/setters)
│   ├── elements.js         # DOM element references
│   ├── utils.js            # Date utility functions
│   ├── storage.js          # LocalStorage save/load
│   ├── render.js           # UI rendering logic
│   ├── selectMode.js       # Select mode toggle
│   └── handlers.js         # Event handlers
├── source/
│   └── prompt.md           # Development documentation
├── README.md               # This file
└── COMPONENTS.md           # Component system documentation
```

### Module System

**ES6 Modules** with clear separation of concerns:

- **constants.js**: COLOR_SETS configuration
- **state.js**: Centralized state with getters/setters (habits, viewMode, selectMode, etc.)
- **elements.js**: DOM element references for easy access
- **utils.js**: Pure functions for date manipulation
- **storage.js**: LocalStorage persistence layer with default data
- **render.js**: Renders habits in Weekly/Grid views
- **selectMode.js**: Toggles select mode functionality
- **handlers.js**: All event handlers (20+ functions)
- **app.js**: Initializes app and wires event listeners

### Browser Support

- Chrome 60+ (ES6 modules support)
- Firefox 60+
- Safari 11+
- Edge 79+

**Requirements:** Modern browser with ES6 module support and LocalStorage

### Data Structure

```javascript
// Habit Object (in memory)
{
  id: 1234567890,                           // Timestamp-based ID
  name: 'Exercise',
  color: 'green',
  completedDates: Set(['2025-01-15', '2025-01-16']),
  createdAt: 1705320000000
}

// LocalStorage Format
{
  habits: [
    {
      id: 1234567890,
      name: 'Exercise',
      color: 'green',
      completedDates: ['2025-01-15', '2025-01-16'],  // Array (converted from Set)
      createdAt: 1705320000000
    }
  ]
}

// State Management
{
  habits: [],                 // Array of habit objects
  currentViewMode: 'weekly',  // 'weekly' | 'grid'
  draggedItem: null,          // Currently dragged habit
  habitIdToDelete: null,      // Habit pending deletion
  habitIdToColor: null,       // Habit for color change
  selectMode: false,          // Select mode active?
  selectedHabits: Set()       // Set of selected habit IDs
}
```

### Component System

Custom CSS component library built on top of Tailwind:

- **Button Components**: `.btn`, `.btn-primary`, `.btn-danger`, `.btn-success`, `.btn-secondary`, `.btn-ghost`
- **Modal Components**: `.modal`, `.modal-content`, `.modal-header`, `.modal-body`, `.modal-actions`
- **Bulk Actions**: `.bulk-action-btn`, `.bulk-actions-bar`
- **Context Menu**: `.context-menu`, `.context-menu-item`
- **Toggle Switch**: `.toggle-switch`, `.toggle-slider`

See [COMPONENTS.md](COMPONENTS.md) for full documentation.

### Key Technologies

- **Frontend**: HTML5, CSS3, JavaScript ES6+ Modules
- **Styling**: Tailwind CSS (CDN) + Custom Component CSS
- **Storage**: LocalStorage API
- **Icons**: SVG Sprite System
- **Font**: Google Fonts - Inter
- **Build**: None required - pure static files
- **Deployment**: Any static hosting (GitHub Pages, Netlify, Vercel, etc.)

## 🎮 Usage Guide

### Creating Habits

1. Click the "+ Add Activity" button
2. The new habit appears with a random color
3. Click the habit name to rename it
4. Start tracking by clicking on days

### Tracking Progress

- **Weekly View**: Click day circles to toggle completion
- **Grid View**: Visual representation of your consistency over 18 weeks
- **Color Coding**: Each habit has its own color theme
- **Auto-save**: Changes save automatically to localStorage
- **Date Handling**: Uses UTC midnight for consistent date tracking

### Managing Habits

- **Rename**: Click on the habit name (contenteditable)
- **Change Color**: Right-click → "Change Color" → Select from 10 colors
- **Delete**: Right-click → "Delete" → Confirm in modal
- **Reorder**: Drag and drop cards to rearrange (HTML5 Drag & Drop API)

### Bulk Operations

1. Right-click any habit → "Select Mode"
2. Click habits to select them (blue border indicates selection)
3. Use bulk action buttons:
   - **Change Color**: Apply color to all selected habits
   - **Delete**: Remove all selected habits
   - **Select All**: Select all habits at once
   - **Unselect All**: Clear selection
   - **Exit Select Mode**: Return to normal view

## 🔧 Development

### Project Structure

```
rutin-in/
├── index.html              # Main HTML with semantic structure
├── styles.css              # Custom CSS + Component system (500+ lines)
├── assets/
│   └── icons/
│       └── sprite.svg      # SVG icon definitions
├── js/                     # Modular JavaScript architecture
│   ├── app.js              # Entry point, event listener setup
│   ├── constants.js        # COLOR_SETS configuration
│   ├── state.js            # State management with getters/setters
│   ├── elements.js         # DOM element references
│   ├── utils.js            # Date utilities (formatDate, getWeekDays, etc.)
│   ├── storage.js          # LocalStorage persistence layer
│   ├── render.js           # UI rendering (renderHabits, updateViewModeUI)
│   ├── selectMode.js       # Select mode toggle logic
│   └── handlers.js         # 20+ event handler functions
├── source/
│   └── prompt.md           # Development prompts and history
├── README.md               # This documentation
└── COMPONENTS.md           # Component system guide
```

### Module Overview

**app.js** - Main Entry Point

- Imports all modules
- Initializes event listeners
- Calls loadHabits() and updateViewModeUI() on DOMContentLoaded

**constants.js** - Configuration

- COLOR_SETS: 10 color themes with hex values

**state.js** - State Management

- Centralized state object
- Getter/setter functions for each state property
- Prevents direct state mutation

**elements.js** - DOM References

- All `getElementById` calls in one place
- Easy to maintain and update

**utils.js** - Pure Functions

- formatDate: Converts Date to 'YYYY-MM-DD'
- getWeekDays: Returns array of 7 days for current week
- getOverviewDays: Returns array of 126 days for grid view

**storage.js** - Persistence

- saveHabits: Saves to localStorage (converts Set to Array)
- loadHabits: Loads from localStorage (converts Array to Set)
- Creates default "Membaca Buku" habit if empty

**render.js** - UI Rendering

- renderHabits: Main render function for both views
- updateViewModeUI: Updates view toggle labels
- Handles select mode styling

**selectMode.js** - Feature Module

- toggleSelectMode: Enters/exits select mode
- Shows/hides bulk actions bar

**handlers.js** - Event Handlers

- handleCardClick: Card interaction logic
- handleDragStart/End/Over/Drop: Drag & drop
- handleViewToggle: Switch views
- handleSelectAll/UnselectAll: Bulk selection
- handleBulkChangeColor/Delete: Bulk operations
- handleAddActivity: Create new habit
- handleContextMenuClick: Context menu actions
- handleColorSwatchClick: Color picker
- Plus modal, keyboard, and document handlers

### Local Development

1. Clone the repository
2. Open `index.html` in a modern browser
3. No build process or dependencies required
4. Data persists in browser's localStorage
5. Use browser DevTools for debugging

### Making Changes

**To add a new color:**

1. Edit `js/constants.js` - add to COLOR_SETS
2. Color automatically appears in color picker

**To modify UI:**

1. Edit `styles.css` for styling changes
2. Edit `index.html` for structure changes
3. Changes reflect immediately (refresh browser)

**To add functionality:**

1. Create handler function in `js/handlers.js`
2. Wire up event listener in `js/app.js`
3. Update state in `js/state.js` if needed
4. Call render in `js/render.js` to update UI

### Customization

**Colors**:

- Modify `COLOR_SETS` in `js/constants.js`
- Each color has a `completed` hex value

**Styling**:

- Edit `styles.css` for custom components
- Tailwind utilities in HTML for quick changes
- See `COMPONENTS.md` for component system

**Features**:

- Add handlers in `js/handlers.js`
- Update state in `js/state.js`
- Modify render logic in `js/render.js`

**Icons**:

- Add new icons to `assets/icons/sprite.svg`
- Use via `<use href="./assets/icons/sprite.svg#icon-name">`

## 📱 Mobile Experience

- **Touch-friendly**: Large tap targets for mobile interactions
- **Responsive Design**: Adapts to all screen sizes via Tailwind
- **Gesture Support**: Tap to interact, long-press for context menu
- **Offline Ready**: Works without internet (localStorage only)
- **PWA-ready**: Can be enhanced to Progressive Web App

## 🎯 Design Philosophy

### Minimalism

- Clean, uncluttered interface
- Focus on essential features
- Reduce cognitive load
- No unnecessary animations or distractions

### Visual Motivation

- GitHub-style contribution graph
- Immediate visual feedback
- Color-coded progress
- Gamification through consistency visualization

### Developer Experience

- Modular architecture for easy maintenance
- Clear separation of concerns
- Well-documented component system
- No build tools required
- Pure vanilla JavaScript

### Accessibility

- High contrast dark theme
- Clear visual hierarchy
- Keyboard navigation support
- Semantic HTML structure
- ARIA-friendly modal dialogs

## 🔮 Future Enhancements

### Planned Features

- [ ] **Data Export/Import**: Export habits to JSON/CSV
- [ ] **Statistics Dashboard**: Charts and insights
- [ ] **Custom Themes**: Light mode and color scheme options
- [ ] **Notifications**: Browser notifications for reminders
- [ ] **Streak Counter**: Display current and longest streaks
- [ ] **Notes**: Add notes to specific days

### Possible Enhancements

- [ ] **Cloud Sync**: Optional backend for multi-device sync
- [ ] **Social Features**: Share progress with friends
- [ ] **Categories**: Group habits by category
- [ ] **Time Tracking**: Track time spent on habits
- [ ] **Goals**: Set and track specific goals
- [ ] **PWA**: Full Progressive Web App with offline support
- [ ] **Undo/Redo**: Action history management

## 📄 License

MIT License - feel free to use, modify, and distribute.

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the modular architecture
4. Test thoroughly in multiple browsers
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Keep modules focused and single-purpose
- Update documentation (README.md, COMPONENTS.md)
- Test on Chrome, Firefox, and Safari
- Keep the bundle size small (no heavy dependencies)

## 📞 Support

- **Issues**: Open an issue on GitHub for bugs or feature requests

---

**Built using Vanilla JavaScript**

_No frameworks. No build tools. Just clean, modular JavaScript._
